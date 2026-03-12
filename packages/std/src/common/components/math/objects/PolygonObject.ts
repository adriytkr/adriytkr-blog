import { Component } from '@adriytkr/engine';
import type { Point } from '../../../types';

export class PolygonObject extends Component{
  public constructor(public vertices:Point[]){
    super();
  }
}
