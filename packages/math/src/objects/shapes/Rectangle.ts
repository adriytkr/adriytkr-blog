import { GameObject } from '../../GameObject';
import type { ClosedStyleOptions } from '../../types';
import { ClosedStyle } from '../../utils';
import { Signal } from '@adriytkr/core';

export interface RectangleOptions{
  width:number;
  height:number;
}

export class Rectangle extends GameObject{
  public width$:Signal<number>;
  public height$:Signal<number>;
  public style:ClosedStyle;

  public constructor(
    x:number,
    y:number,
    options:RectangleOptions,
    style:ClosedStyleOptions,
  ){
    super(x,y);
    this.width$=new Signal(options.width);
    this.height$=new Signal(options.width);

    this.style=ClosedStyle.copy(style);
  }
}
