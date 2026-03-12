import type { Point } from '../../../types';
import type { DrawCommand } from './DrawCommand';

export type PolygonTopology='polygon';

export type PolygonGeometry={
  vertices:Point[];
};

export type PolygonStyle={
  stroke:string;
  strokeWidth:number;
  fill:string;
};

export type PolygonDrawCommand=DrawCommand<PolygonTopology,PolygonGeometry,PolygonStyle>;
