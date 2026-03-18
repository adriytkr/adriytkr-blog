import { Signal } from '@adriytkr/core';
import type { PolylineStyleOptions } from '../../types/styles';

export class PolylineStyle{
  public stroke$:Signal<string>;
  public strokeWidth$:Signal<number>;
  public opacity$:Signal<number>;

  public constructor(options:PolylineStyleOptions){
    this.stroke$=new Signal(options.stroke);
    this.strokeWidth$=new Signal(options.strokeWidth);
    this.opacity$=new Signal(options.opacity);
  }

  public static copy(style:PolylineStyleOptions):PolylineStyle{
    return new PolylineStyle({
      stroke:style.stroke,
      strokeWidth:style.strokeWidth,
      opacity:style.opacity,
    });
  }
}

