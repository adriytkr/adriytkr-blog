import type { Point } from '../../types';

export interface PolygonConfig{
  vertices:Point[],
}

export interface PolygonStyle{
  stroke:string;
  strokeWidth:number;
  fill:string;
}
