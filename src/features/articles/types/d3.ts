import type{ScaleLinear} from 'd3';

export type MathFunction={
  func:(x:number)=>number;
  samples:number;
  domain:[number,number];
};

export type TheScale=ScaleLinear<number,number>;
