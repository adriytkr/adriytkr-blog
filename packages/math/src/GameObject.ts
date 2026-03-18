import { Signal } from '@adriytkr/core';
import { Vector3 } from './utils/';

export abstract class GameObject{
  public zIndex$=new Signal(0);
  public position:Vector3;

  public constructor(x:number=0,y:number=0,z:number=0){
    this.position=new Vector3(x,y,z);
  }
}
