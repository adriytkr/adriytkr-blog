import type { MathFunction,Interval } from './types';

export interface FuncConfig{
  fn:MathFunction,
  domain:Interval,
  samples:number,
}

export interface FuncStyle{
  color:string,
}
