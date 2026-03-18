import { Arc } from './Arc';
import type { ClosedStyleOptions } from '../../types';

export interface CircleOptions extends ClosedStyleOptions{
  radius:number;
}

export class Circle extends Arc{
  public constructor(x:number,y:number,options:CircleOptions){
    super(x,y,{
      radius:options.radius,
      startAngle:0,
      endAngle:2*Math.PI,
      stroke:options.stroke,
      strokeWidth:options.strokeWidth,
      fill:options.fill,
      opacity:options.opacity,
    });
  }
}
