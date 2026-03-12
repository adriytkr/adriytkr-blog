import { Component } from '@adriytkr/engine';
import type { Point } from '../../types';
import { Geometry } from './Geometry';

export class PolylineGeometry extends Component implements Geometry{
  public constructor(public points:Point[]){
    super();
  }
}
 