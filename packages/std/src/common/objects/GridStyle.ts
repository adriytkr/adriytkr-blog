import { Component } from '@adriytkr/engine';

export class GridStyle extends Component{
  public constructor(
    public stroke:string,
    public strokeWidth:number,
  ){
    super();
  }
}

export const DEFAULT_GRID_STYLE=new GridStyle('red',1);
