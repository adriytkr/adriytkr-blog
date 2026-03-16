import { Hierarchy } from './Hierarchy';
import { Transform } from './Transform';
import { Node } from './Node';
import { quatToEuler } from './utils';
import { mat4, quat, vec3 } from 'gl-matrix';

export class InternalNode{
  public node!:Node;

  private m_hierarchy=new Hierarchy(this);
  private m_transform:Transform=new Transform(this);

  public get transform(){
    return this.m_transform;
  }

  public get hierarchy(){
    return this.m_hierarchy;
  }

  public markDirty():void{
    this.m_transform.markDirty();

    for(const child of this.m_hierarchy.children)
      child.markDirty();
  }

  // Hierarchy
  public add(child:InternalNode):void{
    this.m_hierarchy.addChild(child);
    child.markDirty();
  }

  public remove(child:InternalNode):void{
    mat4.copy(child.localMatrix,child.worldMatrix);

    this.m_hierarchy.removeChild(child);
    child.markDirty();
  }

  public set parent(node:InternalNode|null){
    this.m_hierarchy.parent=node;
  }

  public get children():InternalNode[]{
    return this.m_hierarchy.children;
  }

  // Matrices
  public get localMatrix(){
    return this.m_transform.localMatrix;
  }

  public get worldMatrix(){
    return this.m_transform.worldMatrix;
  }

  // Position
  public get worldPosition():vec3{
    return this.m_transform.worldPosition;
  }

  public get position(){
    return this.m_transform.position;
  }

  // Scale
  public get worldScale():vec3{
    return this.m_transform.worldScale;
  }

  public get scale(){
    return this.m_transform.scale;
  }

  // Rotation
  public get worldRotation():quat{
    return this.m_transform.worldRotation;
  }

  public get rotation(){
    return this.m_transform.rotation;
  }

  // Clone
  public clone(deep=true):InternalNode{
    const copy=new InternalNode();

    const worldMatrix=this.m_transform.worldMatrix;

    const position=vec3.create();
    mat4.getTranslation(position,worldMatrix);

    const rotationQuartenion=quat.create();
    mat4.getRotation(rotationQuartenion,worldMatrix);

    const scale=vec3.create();
    mat4.getScaling(scale,worldMatrix);

    copy.position.x.value=position[0];
    copy.position.y.value=position[1];
    copy.position.z.value=position[2];

    const rotationEuler=quatToEuler(rotationQuartenion);
    copy.rotation.x.value=rotationEuler[0];
    copy.rotation.y.value=rotationEuler[1];
    copy.rotation.z.value=rotationEuler[2];

    copy.scale.x.value=scale[0];
    copy.scale.y.value=scale[1];
    copy.scale.z.value=scale[2];

    copy.markDirty();

    if(deep){
      for(const child of this.m_hierarchy.children){
        const childCopy=child.clone(true);
        copy.add(childCopy);
      }
    }

    return copy;
  }
}
