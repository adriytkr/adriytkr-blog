import { Signal } from '@adriytkr/core';

export class Vector2{
  public x$=new Signal(0);
  public y$=new Signal(0);

  public constructor(x:number,y:number){
    this.x$.value=x;
    this.y$.value=y;
  }
}
