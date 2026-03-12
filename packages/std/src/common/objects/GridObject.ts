import { Component } from '@adriytkr/engine';

export class GridObject extends Component{
  public constructor(
    public xMin:number,
    public xMax:number,
    public yMin:number,
    public yMax:number,
    public xStep:number,
    public yStep:number,
  ){
    super();
  }
}
