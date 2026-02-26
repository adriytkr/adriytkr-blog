import type{ScaleLinear} from 'd3';

export type Point={
  x:number;
  y:number;
};

export type PointsWrapper={
  points:Point[];
  color:string;
};

export type FunctionWrapper={
  func:(x:number)=>number;
  samples:number;
  domain:[number,number];
  color?:string;
};

export type TheRange=[number,number];
export type TheScale=ScaleLinear<number,number>;
