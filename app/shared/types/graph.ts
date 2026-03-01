import type {ScaleLinear} from 'd3';

export type MathFunction={
  func:(x:number)=>number;
  samples:number;
  domain:Interval;
};

export type TheScale=ScaleLinear<number,number>;

type d3Selection=d3.Selection<SVGGElement,unknown,null,undefined>
export type GraphComponents={
  root?:d3Selection;
  grid?:d3Selection;
  axes?:d3Selection;
  functions?:d3Selection;
  points?:d3Selection;
  xAxis?:d3Selection;
  yAxis?:d3Selection;
};

export type GraphProps={
  points?:Point[][];
  functions?:MathFunction[];
  domain:Interval;
  range:Interval;
  draggable?:boolean;
};
