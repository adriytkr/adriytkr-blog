import { InternalNode } from './InternalNode';
import { Vector3 } from './Vector3';
import { mat4, vec3, quat, mat3 } from 'gl-matrix';

export class Transform{
  private m_node:InternalNode;

  public position=new Vector3();
  private m_position=vec3.create();

  public rotation=new Vector3();
  private m_rotation=vec3.create();

  public scale=new Vector3(1,1,1);
  private m_scale=vec3.fromValues(1,1,1);

  private m_localMatrixDirty=true;
  private m_localMatrix=mat4.create();

  private m_worldMatrixDirty=true;
  private m_worldMatrix=mat4.create();

  public constructor(node:InternalNode){
    this.m_node=node;

    this.watchSignal(this.position,this.m_position);
    this.watchSignal(this.rotation,this.m_rotation);
    this.watchSignal(this.scale,this.m_scale);
  }

  private watchSignal(vector:Vector3,cache:vec3):void{
    vector.x.subscribe(()=>{
      cache[0]=vector.x.value;
      this.m_node.markDirty();
    });

    vector.y.subscribe(()=>{
      cache[1]=vector.y.value;
      this.m_node.markDirty();
    });

    vector.z.subscribe(()=>{
      cache[2]=vector.z.value;
      this.m_node.markDirty();
    });
  }

  // Matrices
  public markDirty():void{
    this.m_localMatrixDirty=true;
    this.m_worldMatrixDirty=true;
  }

  public get localMatrix(){
    this.updateLocalMatrix();
    return this.m_localMatrix;
  }

  public get worldMatrix(){
    if(!this.m_worldMatrixDirty)return this.m_worldMatrix;

    this.updateLocalMatrix();

    if(this.m_node.parent){
      mat4.multiply(
        this.m_worldMatrix,
        this.m_node.parent.worldMatrix,
        this.m_localMatrix,
      );
    }else{
      mat4.copy(this.m_worldMatrix,this.m_localMatrix);
    }

    this.m_worldMatrixDirty=false;
    return this.m_worldMatrix;
  }

  private updateLocalMatrix():void{
    if(!this.m_localMatrixDirty)return;

    const position=this.m_position;
    const scale=this.m_scale;
    const rotation=this.m_rotation;

    const q=quat.create();
    quat.fromEuler(
      q,
      rotation[0],
      rotation[1],
      rotation[2],
    );

    mat4.fromRotationTranslationScale(this.m_localMatrix,q,position,scale);
    this.m_localMatrixDirty=false;
  }
  
  // Position
  public get worldPosition():vec3{
    const m=this.worldMatrix;
    return vec3.fromValues(m[12],m[13],m[14]);
  }

  public translate(d:number):void;
  public translate(dx:number,dy:number,dz:number):void;

  public translate(dx:number,dy?:number,dz?:number):void{
    if(dy===undefined||dz===undefined){
      this.position.add(dx,dx,dx);
    }else{
      this.position.add(dx,dy,dz);
    }
  }

  public translateX(delta:number):void{
    this.position.x.value+=delta;
  }

  public translateY(delta:number):void{
    this.position.y.value+=delta;
  }

  public translateZ(delta:number):void{
    this.position.z.value+=delta;
  }

  // Scale
  public get worldScale():vec3{
    const m=this.worldMatrix;
    const sx=vec3.length([m[0],m[1],m[2]]);
    const sy=vec3.length([m[4],m[5],m[6]]);
    const sz=vec3.length([m[8],m[9],m[10]]);
    return vec3.fromValues(sx,sy,sz);
  }

  public scaleBy(s:number):void;
  public scaleBy(sx:number,sy:number,sz:number):void;

  public scaleBy(sx:number,sy?:number,sz?:number):void{
    if(sy===undefined||sz===undefined){
      this.scale.multiply(sx,sx,sx);
    }else{
      this.scale.multiply(sx,sy,sz);
    }
  }

  public scaleX(factor:number):void{
    this.scale.x.value*=factor;
  }

  public scaleY(factor:number):void{
    this.scale.y.value*=factor;
  }

  public scaleZ(factor:number):void{
    this.scale.z.value*=factor;
  }

  // Rotation
  public get worldRotation():quat{
    const m=this.worldMatrix;
    const scale=this.worldScale;

    const rotMat3=mat3.fromValues(
      m[0]/scale[0],m[1]/scale[0],m[2]/scale[0],
      m[4]/scale[1],m[5]/scale[1],m[6]/scale[1],
      m[8]/scale[2],m[9]/scale[2],m[10]/scale[2],
    );

    const q=quat.create();
    quat.fromMat3(q,rotMat3);
    quat.normalize(q,q);
    return q;
  }

  public rotate(rad:number):void;
  public rotate(rx:number,ry:number,rz:number):void;

  public rotate(rx:number,ry?:number,rz?:number):void{
    if(ry===undefined||rz===undefined){
      this.rotation.multiply(rx,rx,rx);
    }else{
      this.rotation.multiply(rx,ry,rz);
    }
  }

  public rotateX(rad:number):void{
    this.rotation.x.value+=rad;
  }

  public rotateY(rad:number):void{
    this.rotation.y.value+=rad;
  }

  public rotateZ(rad:number):void{
    this.rotation.z.value+=rad;
  }
}
