import { Signal } from '@adriytkr/core';

import { ParametricCurve } from './ParametricCurve';
import type { Interval, IVector3, MathFunction, PolylineStyleOptions } from '../../types';

import { PolylineStyle } from '../../utils';

export interface ParabolaOptions{
  a:number;
  b:number;
  c:number;
  domain:Interval;
  samples:number;
}

export class ParabolaFunction extends ParametricCurve{
  public y:MathFunction;
  public a$:Signal<number>;
  public b$:Signal<number>;
  public c$:Signal<number>;
  public xMin$:Signal<number>;
  public xMax$:Signal<number>;
  public samples:number;

  public style:PolylineStyle;

  public constructor(options:ParabolaOptions,style:PolylineStyleOptions){
    super();

    this.a$=new Signal(options.a);
    this.b$=new Signal(options.b);
    this.c$=new Signal(options.c);
    this.y=x=>this.a$.value*x**2+this.b$.value*x+this.c$.value;

    this.samples=options.samples;
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


