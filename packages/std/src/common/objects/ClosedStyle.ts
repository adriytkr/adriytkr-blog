import { Component } from '@adriytkr/engine';

export class ClosedStyle extends Component{
  public constructor(
    public stroke:string,
    public strokeWidth:number,
    public fill:string,
  ){
    super();
  }
}

export const DEFAULT_CLOSED_STYLE:ClosedStyle=new ClosedStyle('red',1,'white');
