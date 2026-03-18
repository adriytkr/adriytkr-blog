import { Signal } from '@adriytkr/core';

import { ParametricCurve } from './ParametricCurve';
import type { Interval, IVector3, MathFunction, PolylineStyleOptions } from '../../types';

import { PolylineStyle } from '../../utils';

export interface ExplicitCurveOptions{
  y:MathFunction;
  domain:Interval;
  samples:number;
}

export class ExplicitCurve extends ParametricCurve{
  public y:MathFunction;
  public xMin$:Signal<number>;
  public xMax$:Signal<number>;
  public samples:number;

  public style:PolylineStyle;

  public constructor(options:ExplicitCurveOptions,style:PolylineStyleOptions){
    super();

    this.y=options.y;
    this.xMin$=new Signal(options.domain[0]);
    this.xMax$=new Signal(options.domain[1]);
    this.samples=options.samples;

    this.style=PolylineStyle.copy(style);
  }

  public getPoint(x:number):IVector3{
    return{
      x,
      y:this.y(x),
      z:0,
    };
  }
}
