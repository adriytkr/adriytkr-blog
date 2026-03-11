import type { Point } from '@adriytkr/std';

export interface PolygonConfig{
  position:Point,
  vertices:Point[],
}

export interface PolygonStyle{
  stroke:string;
  fill:string;
}
