import { GameObject } from '../../GameObject';
import type { ClosedStyleOptions } from '../../types';
import { ClosedStyle } from '../../utils';
import { Signal } from '@adriytkr/core';
import { Rectangle } from './Rectangle';

export interface SquareOptions{
  side:number;
}

export class Square extends Rectangle{
  public side$:Signal<number>;

  public constructor(
    x:number,
    y:number,
    options:SquareOptions,
    style:ClosedStyleOptions,
  ){
    super(x,y,{width:options.side,height:options.side},style);
    this.side$=new Signal(options.side);
  }
}
