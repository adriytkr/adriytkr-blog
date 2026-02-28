import type {ScaleLinear} from 'd3';

export type MathFunction={
  func:(x:number)=>number;
  samples:number;
  domain:Interval;
};

export type TheScale=ScaleLinear<number,number>;

type d3Selection=d3.Selection<SVGSVGElement,unknown,null,undefined>
export type Components={
  svg?:d3Selection;
  root?:d3Selection;
  grid?:d3Selection;
  axes?:d3Selection;
  functions?:d3Selection;
  points?:d3Selection;
};

export interface Size{
  width?:number;
  height?:number;
  xScale?:TheScale;
  yScale?:TheScale;
};

export type DesmosProps={
  pointSeries?:Point[][];
  functions?:MathFunction[];
  domain:Interval;
  range:Interval;
  draggable?:boolean;
};

export interface GraphCanvasOptions extends DesmosProps{
  containerRef:Ref<SVGSVGElement|null>;
};
