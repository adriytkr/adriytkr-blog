import { Component } from '@adriytkr/engine';

export class FunctionObject extends Component{
  public constructor(
    public fn:(x:number)=>number,
    public samples:number,
    public domain:[number,number],
  ){
    super();
  }
}
