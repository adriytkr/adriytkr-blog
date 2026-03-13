import { Component } from '@adriytkr/engine';

export class ArcObject extends Component{
  public constructor(
    public radius:number,
    public startAngle:number,
    public endAngle:number,
  ){
    super();
  }
}
