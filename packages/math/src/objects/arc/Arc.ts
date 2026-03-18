import { Signal } from '@adriytkr/core';

import { GameObject } from '../../GameObject';

import { ClosedStyle } from '../../utils';
import type { ClosedStyleOptions } from '../../types';

export interface ArcOptions extends ClosedStyleOptions{
  radius:number;
  startAngle:number;
  endAngle:number;
}

export class Arc extends GameObject{
  public radius$:Signal<number>;
  public startAngle$:Signal<number>;
  public endAngle$:Signal<number>;

  public style:ClosedStyle;

  public constructor(x:number,y:number,options:ArcOptions){
    super(x,y);

    this.style=new ClosedStyle({
      stroke:options.stroke,
      strokeWidth:options.strokeWidth,
      fill:options.fill,
      opacity:options.opacity,
    });

    this.radius$=new Signal(options.radius);
    this.startAngle$=new Signal(options.startAngle);
    this.endAngle$=new Signal(options.endAngle);
  }
}
