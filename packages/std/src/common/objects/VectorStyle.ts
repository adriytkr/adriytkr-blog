import { Component } from '@adriytkr/engine';

export class VectorStyle extends Component{
  public constructor(
    public lineStroke:string,
    public lineStrokeWidth:number,
    public tipStroke:string,
    public tipStrokeWidth:number,
    public tipFill:string,
  ){
    super();
  }
}

export const DEFAULT_VECTOR_STYLE=new VectorStyle('blue',2,'blue',1,'blue');
