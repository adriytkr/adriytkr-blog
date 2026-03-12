import { Component } from '@adriytkr/engine';
import type { Point } from '../../../types';

export class VectorObject extends Component{
  public constructor(
    public to:Point,
  ){
    super();
  }
}
