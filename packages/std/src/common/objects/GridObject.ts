import { Component } from '@adriytkr/engine';

export class GridObject extends Component{
  public constructor(
    public rows:number,
    public cols:number,
    public spacing:number,
  ){
    super();
  }
}
