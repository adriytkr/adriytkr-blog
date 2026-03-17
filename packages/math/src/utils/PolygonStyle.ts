import { Signal } from '@adriytkr/core';

export class PolygonStyle{
  public stroke$:Signal<string>;
  public strokeWidth$:Signal<number>;
  public fill$:Signal<string>;

  public constructor(
    stroke:string,
    strokeWidth:number,
    fill:string,
  ){
    this.stroke$=new Signal(stroke);
    this.strokeWidth$=new Signal(strokeWidth);
    this.fill$=new Signal(fill);
  }
}
