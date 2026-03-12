import { Component } from '@adriytkr/engine';
import type { Geometry } from './Geometry';

import type { PolylineConfig,PolylineStyle } from './PolylineStyle';

export const DEFAULT_POLYLINE_STYLE:PolylineStyle={
  stroke:'red',
  strokeWidth:1,
}

export class PolylineGeometry extends Component implements Geometry{
  public constructor(
    public config:PolylineConfig,
    public style:PolylineStyle=DEFAULT_POLYLINE_STYLE
  ){
    super();
  }
}
 