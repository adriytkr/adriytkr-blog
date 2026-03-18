import { Signal } from '@adriytkr/core';

import { ParametricCurve } from './ParametricCurve';
import type { Interval, IVector3, MathFunction, PolylineStyleOptions } from '../../types';

import { PolylineStyle } from '../../utils';

export interface LinearFunctionOptions{
  slope:number;
  yIntercept:number;
  domain:Interval;
}

export class LinearFunction extends ParametricCurve{
  public y:MathFunction;
  public slope$:Signal<number>;
  public yIntercept$:Signal<number>;
  public xMin$:Signal<number>;
  public xMax$:Signal<number>;
  public samples:number;

  public style:PolylineStyle;

  public constructor(options:LinearFunctionOptions,style:PolylineStyleOptions){
    super();

    this.slope$=new Signal(options.slope);
    this.yIntercept$=new Signal(options.yIntercept);
    this.y=x=>this.slope$.value*x+this.yIntercept$.value;

    this.samples=2;
    this.xMin$=new Signal(options.domain[0]);
    this.xMax$=new Signal(options.domain[1]);

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

