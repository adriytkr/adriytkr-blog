import { Component } from '@adriytkr/engine';
import type { Entity } from '@adriytkr/engine';

export class MathPosition extends Component{
  public constructor(
    public x:number,
    public y:number,
    public canvasEntity:Entity,
  ){
    super();
  }
}
