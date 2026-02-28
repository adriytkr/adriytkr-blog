import type {Ref} from 'vue';
import type{ScaleLinear} from 'd3';

export type LanguageCode='en'|'pt';
export type Language={
  name:string;
  code:LanguageCode;
};

export type NavItem={name:string};

export type Article={
  slug:string;
  tags:string[];
};

export type Section={
  title:string;
  id:string;
};


export type MathFunction={
  func:(x:number)=>number;
  samples:number;
  domain:[number,number];
};

export type TheScale=ScaleLinear<number,number>;

export type Components={
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

export type Point={
  x:number;
  y:number;
};

export type Interval=[number,number];

export type DesmosProps={
  pointSeries?:Point[][];
  functions?:MathFunction[];
  domain:Interval;
  range:Interval;
  draggable?:boolean;
};
