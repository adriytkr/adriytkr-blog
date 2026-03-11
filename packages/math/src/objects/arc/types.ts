import type { Point } from '../../../../std/src/types';

export interface ArcConfig{
  position:Point,
  radius:number;
  startAngle:number;
  endAngle:number;
}

export interface ArcStyle{
  stroke:string,
  fill:string,
}
