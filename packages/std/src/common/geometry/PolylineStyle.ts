import type { Point } from '../../types';

export interface PolylineConfig{
  points:Point[];
}

export interface PolylineStyle{
  stroke:string;
  strokeWidth:number;
}
