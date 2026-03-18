import { Signal } from '@adriytkr/core';
import type { ClosedStyleOptions } from '../../types';

export class ClosedStyle{
  public stroke$:Signal<string>;
  public strokeWidth$:Signal<number>;
  public fill$:Signal<string>;
  public opacity$:Signal<number>;

  public constructor(options:ClosedStyleOptions){
    this.stroke$=new Signal(options.stroke);
    this.strokeWidth$=new Signal(options.strokeWidth);
    this.fill$=new Signal(options.fill);
    this.opacity$=new Signal(options.opacity);
  }

  public static copy(style:ClosedStyleOptions):ClosedStyle{
    return new ClosedStyle({
      stroke:style.stroke,
      strokeWidth:style.strokeWidth,
      fill:style.fill,
      opacity:style.opacity,
    });
  }
}
