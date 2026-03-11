import type { Point } from '@adriytkr/std';

export interface RectangleConfig{
  position:Point,
  width:number,
  height:number,
}

export interface RectangleStyle{
  stroke:string;
  fill:string;
}
