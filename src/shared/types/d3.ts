import type{ScaleLinear} from 'd3';

export type Point={
  x:number;
  y:number;
};

export type MathFunction={
  func:(x:number)=>number;
  samples:number;
  domain:[number,number];
};

export type TheRange=[number,number];
export type TheScale=ScaleLinear<number,number>;
