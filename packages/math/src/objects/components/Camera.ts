import { GameObject } from '../../GameObject';
import { Signal } from '@adriytkr/core';

export interface CameraOptions{
  zoom:number;
}

export class Camera extends GameObject{
  public zoom$:Signal<number>;

  public constructor(options:CameraOptions){
    super();
    this.zoom$=new Signal(options.zoom);
  }
}
