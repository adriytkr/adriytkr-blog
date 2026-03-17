import { InternalNode } from './InternalNode';

export class Node{
  private m_internal:InternalNode;

  public constructor(){
    this.m_internal=new InternalNode();
    this.m_internal.node=this;
  }

  // Hierarchy
  public add(child:Node):void{
    this.m_internal.add(child.m_internal);
  }

  public remove(child:Node):void{
    this.m_internal.remove(child.m_internal);
  }

  public detach():void{
    this.m_internal.hierarchy.detach();
  }

  public get parent(){
    return this.m_internal.parent;
  }

  public get children(){
    return this.m_internal.children.map(child=>child.node);
  }

  public get childCount():number{
    return this.m_internal.hierarchy.childCount;
  }

  public getChildAt(index:number):Node|undefined{
    return this.m_internal.hierarchy.getChildAt(index)?.node;
  }

  // Matrices
  public get localMatrix(){
    return this.m_internal.localMatrix;
  }

  public get worldMatrix(){
    return this.m_internal.worldMatrix;
  }

  // Position
  public get worldPosition(){
    return this.m_internal.transform.worldPosition;
  }

  public get position(){
    return this.m_internal.position;
  }

  public translate(d:number):void;
  public translate(dx:number,dy:number,dz:number):void;

  public translate(dx:number,dy?:number,dz?:number):void{
    this.m_internal.transform.translate(dx,dy??dx,dz??dx);
  }

  public translateX(delta:number):void{
    this.m_internal.transform.translateX(delta);
  }

  public translateY(delta:number):void{
    this.m_internal.transform.translateY(delta);
  }

  public translateZ(delta:number):void{
    this.m_internal.transform.translateZ(delta);
  }

  // Scale
  public get worldScale(){
    return this.m_internal.transform.worldScale;
  }

  public get scale(){
    return this.m_internal.scale;
  }

  public scaleBy(s:number):void;
  public scaleBy(sx:number,sy:number,sz:number):void;

  public scaleBy(sx:number,sy?:number,sz?:number):void{
    this.m_internal.transform.scaleBy(sx,sy??sx,sz??sx);
  }

  public scaleX(factor:number):void{
    this.m_internal.transform.scaleX(factor);
  }

  public scaleY(factor:number):void{
    this.m_internal.transform.scaleY(factor);
  }

  public scaleZ(factor:number):void{
    this.m_internal.transform.scaleZ(factor);
  }

  // Rotation
  public get worldRotation(){
    return this.m_internal.transform.worldRotation;
  }

  public get rotation(){
    return this.m_internal.rotation;
  }

  public rotate(rad:number):void;
  public rotate(rx:number,ry:number,rz:number):void;

  public rotate(rx:number,ry?:number,rz?:number):void{
    this.m_internal.transform.rotate(rx,ry??rx,rz??rx);
  }

  public rotateX(rad:number):void{
    return this.m_internal.transform.rotateX(rad);
  }

  public rotateY(rad:number):void{
    return this.m_internal.transform.rotateY(rad);
  }

  public rotateZ(rad:number):void{
    return this.m_internal.transform.rotateZ(rad);
  }

  // Clone
  public clone(deep=true):Node{
    const copy=new Node();
    const internalCopy=this.m_internal.clone(deep);
    copy.m_internal=internalCopy;

    internalCopy.node=copy;
    return copy;
  }
}
