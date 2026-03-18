import { Signal } from '@adriytkr/core';

import { ParametricCurve } from './ParametricCurve';
import type { Interval, IVector3, MathFunction, PolylineStyleOptions } from '../../types';

import { PolylineStyle } from '../../utils';

export interface FunctionCurveOptions{
  x:MathFunction;
  y:MathFunction;
  z:MathFunction;
  tDomain:Interval;
  samples:number;
}

export class FunctionCurve extends ParametricCurve{
  public x:MathFunction;
  public y:MathFunction;
  public z:MathFunction;
  public tMin$:Signal<number>;
  public tMax$:Signal<number>;
  public samples:number;

  public style:PolylineStyle;

  public constructor(options:FunctionCurveOptions,style:PolylineStyleOptions){
    super();
    this.x=options.x;
    this.y=options.y;
    this.z=options.z;
    this.tMin$=new Signal(options.tDomain[0]);
    this.tMax$=new Signal(options.tDomain[1]);
    this.samples=options.samples;

    this.style=PolylineStyle.copy(style);
  }

  public getPoint(t:number):IVector3{
    return{
      x:this.x(t),
      y:this.y(t),
      z:this.z(t),
    };
  }
}
