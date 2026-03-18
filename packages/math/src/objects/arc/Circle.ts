import { Arc } from './Arc';
import type { ClosedStyleOptions } from '../../types';

export interface CircleOptions{
  radius:number;
}

export class Circle extends Arc{
  public constructor(options:CircleOptions,style:ClosedStyleOptions){
    super(
      {
        radius:options.radius,
        startAngle:0,
        endAngle:Math.PI*2,
      },
      style,
    );
  }
}
