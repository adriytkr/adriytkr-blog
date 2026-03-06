import type { Entity } from './Entity';

export class SparseSet<T>{
  private m_sparse:number[]=[];
  private m_dense:number[]=[];
  private m_data:T[]=[];
  private m_count:number=0;

  public add(entity:Entity,component:T):void{
    if(this.has(entity)){
      const r=this.m_sparse[entity];
      if(r===undefined)return;
      this.m_data[r]=component;
      return;
    }

    this.m_sparse[entity]=this.m_count;
    this.m_dense[this.m_count]=entity;
    this.m_data[this.m_count]=component;
    this.m_count++;
  }

  public remove(entity:Entity):void{
    if(!this.has(entity))return;

    const indexToRemove=this.m_sparse[entity];
    const lastIndex=this.m_count-1;
    const lastEntityId=this.m_dense[lastIndex];

    if(indexToRemove===undefined)return;
    if(lastEntityId===undefined)return;

    const R=this.m_data[lastIndex];
    if(R===undefined)return;

    this.m_dense[indexToRemove]=lastEntityId;
    this.m_data[indexToRemove]=R;

    this.m_sparse[lastEntityId]=indexToRemove;
    this.m_count--;
    this.m_dense.pop();
    this.m_data.pop();
    delete this.m_sparse[entity];
  }

  public has(entity:Entity):boolean{
    const index=this.m_sparse[entity];
    return index!==undefined&&index<this.m_count&&this.m_dense[index]===entity;
  }

  public get(entity:Entity):T|undefined{
    if(!this.has(entity))return undefined;
    const r=this.m_sparse[entity]
    if(r===undefined)return;
    return this.m_data[r];
  }

  public getAllData():T[]{
    return this.m_data;
  }

  public get count():number{
    return this.m_count;
  }

  public getDenseArray():Entity[]{
    return this.m_dense;
  }
}
