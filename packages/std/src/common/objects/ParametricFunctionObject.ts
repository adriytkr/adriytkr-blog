import { Component } from '@adriytkr/engine';

export class ParametricFunctionObject extends Component{
  public constructor(
    public x:MathFunction,
    public y:MathFunction,
    public tDomain:Interval,
    public samples:number,
  ){
    super();
  }
}
