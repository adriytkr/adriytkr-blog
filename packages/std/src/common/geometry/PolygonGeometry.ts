import { Component } from '@adriytkr/engine';
import type { Geometry } from './Geometry';
import type { PolygonConfig,PolygonStyle } from './PolygonStyle';

export const DEFAULT_POLYGON_STYLE:PolygonStyle={
  stroke:'red',
  strokeWidth:1,
  fill:'white',
};

export class PolygonGeometry extends Component implements Geometry{
  public constructor(
    public config:PolygonConfig,
    public style:PolygonStyle=DEFAULT_POLYGON_STYLE,
  ){
    super();
  }
}
