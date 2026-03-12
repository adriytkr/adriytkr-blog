import { Component } from '@adriytkr/engine';

export class FunctionStyle extends Component{
  public constructor(
    public stroke:string,
    public strokeWidth:number,
  ){
    super();
  }
}

export const DEFAULT_FUNCTION_STYLE:FunctionStyle=new FunctionStyle('red',2);
