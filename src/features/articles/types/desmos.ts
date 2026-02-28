import type {MathFunction,TheScale} from './d3';
import type {Point,Interval} from '@/features/articles/types/math';
import type {Ref} from 'vue';

export interface DesmosProps{
  pointSeries?:Point[][];
  functions?:MathFunction[];
  domain:Interval;
  range:Interval;
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

export interface GraphCanvasOptions extends DesmosProps{
  containerRef:Ref<SVGSVGElement|null>;
};
