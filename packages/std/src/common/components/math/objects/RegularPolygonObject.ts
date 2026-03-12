import { Component } from '@adriytkr/engine';

export class RegularPolygonObject extends Component{
  public constructor(
    public sides:number,
    public sidelength:number,
    public offsetAngle?:number,
  ){
    super();
  }
}
