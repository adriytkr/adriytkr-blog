import { Signal } from '@adriytkr/core';

import { GameObject } from '../../GameObject';

import { ClosedStyle } from '../../utils';
import type { ClosedStyleOptions } from '../../types';

export interface ArcOptions{
  radius:number;
  startAngle:number;
  endAngle:number;
  clockwise?:boolean;
}

export class Arc extends GameObject{
  public radius$:Signal<number>;
  public startAngle$:Signal<number>;
  public endAngle$:Signal<number>;
  public clockwise$:Signal<boolean>;

  public style:ClosedStyle;

  public constructor(options:ArcOptions,style:ClosedStyleOptions){
    super();

    this.radius$=new Signal(options.radius);
    this.startAngle$=new Signal(options.startAngle);
    this.endAngle$=new Signal(options.endAngle);
    this.clockwise$=new Signal(options.clockwise??false);

    this.style=ClosedStyle.copy(style);
  }
}
