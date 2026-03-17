import { GameObject } from '../GameObject';
import { PolygonStyle } from '../utils/';
import { Signal } from '@adriytkr/core';

export class Square extends GameObject{
  public side$:Signal<number>;
  public style:PolygonStyle;

  public constructor(side:number,color:string){
    super();
    this.side$=new Signal(side);
    this.style=new PolygonStyle(color,1,color);
  }
}
