import { Component } from '@adriytkr/engine';

export interface CameraOptions{
  x:number;
  y:number;
  zoom:number;
  width:number;
  height:number;
}

export class Camera2D extends Component{
  public x:number;
  public y:number;
  public zoom:number;
  public width:number;
  public height:number;

  public constructor(options:CameraOptions){
    super();
    this.x=options.x;
    this.y=options.y;
    this.zoom=options.zoom;
    this.width=options.width;
    this.height=options.height;
  }
}
