import type {
  MathFunction,
  Point,
  TheRange,
  TheScale,
} from '@/shared/types/d3';
import type {Ref} from 'vue';

export interface Props{
  pointSeries?:Point[][];
  functions?:MathFunction[];
  domain:TheRange;
  range:TheRange;
  draggable?:boolean;
};

export interface Components{
  svg?:d3.Selection<SVGSVGElement,unknown,null,undefined>;
  root?:d3.Selection<SVGGElement,unknown,null,undefined>;
  grid?:d3.Selection<SVGGElement,unknown,null,undefined>;
  axes?:d3.Selection<SVGGElement,unknown,null,undefined>;
  functions?:d3.Selection<SVGGElement,unknown,null,undefined>;
  points?:d3.Selection<SVGGElement,unknown,null,undefined>;
};

export interface Size{
  width?:number;
  height?:number;
  xScale?:TheScale;
  yScale?:TheScale;
};

export interface GraphCanvasOptions extends Props{
  containerRef:Ref<SVGSVGElement|null>;
};
