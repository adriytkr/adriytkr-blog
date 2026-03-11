import type { Point } from '@adriytkr/std';
import type { MathFunction,Interval } from '../../types/math';

export interface ParametricFunctionConfig{
  position:Point;
  x:MathFunction;
  y:MathFunction;
  tDomain:Interval,
  samples:number,
}

export interface ParametricFunctionStyle{
  color:string;
}
