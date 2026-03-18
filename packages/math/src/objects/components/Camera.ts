import { GameObject } from '../../GameObject';
import { Signal } from '@adriytkr/core';

export class Camera extends GameObject{
  public zoom$:Signal<number>;

  public constructor(zoom:number){
    super();
    this.zoom$=new Signal(zoom);
  }
}
