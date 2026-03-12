import { Component } from '@adriytkr/engine';
import type { Point } from '../../types';
import type { Geometry } from './Geometry';

export class PolygonGeometry extends Component implements Geometry{
  public constructor(public vertices:Point[]){
    super();
  }
}
