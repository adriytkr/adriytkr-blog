import { Signal } from '@adriytkr/core';

export class Vector3{
  public x$=new Signal(0);
  public y$=new Signal(0);
  public z$=new Signal(0);

  public constructor(x:number,y:number,z:number){
    this.x$.value=x;
    this.y$.value=y;
    this.z$.value=z;
  }
}
