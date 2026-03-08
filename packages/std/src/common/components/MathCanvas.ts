import { Component } from '@adriytkr/engine';

export class MathCanvas extends Component{
  public constructor(
    public unitSize:number,
    public origin:{x:number,y:number},
  ){
    super();
  }
}
