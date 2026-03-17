import { InternalNode } from './InternalNode';

export class Hierarchy{
  private m_node:InternalNode;

  private m_parent:InternalNode|null=null;
  private m_children:InternalNode[]=[];

  public constructor(node:InternalNode){
    this.m_node=node;
  }

  public get parent():InternalNode|null{
    return this.m_parent;
  }

  public set parent(node:InternalNode|null){
    this.m_parent=node;
  ;}

  public get children():InternalNode[]{
    return this.m_children;
  }

  public get childCount():number{
    return this.children.length;
  }

  public getChildAt(index:number):InternalNode|undefined{
    return this.children[index];
  }

  public addChild(child:InternalNode):void{
    console.log('hi: '+child.parent);
    if(child.parent!==null&&child.parent!==undefined)
      throw Error('Node already has a parent');

    this.m_children.push(child);
    child.parent=this.m_node;
  }

  public removeChild(child:InternalNode):void{
    const index=this.m_children.indexOf(child);
    if(index===-1)
      throw Error('Target node is not a child');

    this.m_children.splice(index,1);
    child.parent=null;
  }

  public detach():void{
    if(this.parent===null)return;
    this.parent.remove(this.m_node);
  }
}
