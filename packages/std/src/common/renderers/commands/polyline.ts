import type { Point } from '../../../types';
import type { DrawCommand } from './DrawCommand';

export type PolylineTopology='polyline';

export type PolylineGeometry={
  points:Point[];
};

export type PolylineStyle={
  stroke:string;
  strokeWidth:number;
};

export type PolylineDrawCommand=DrawCommand<PolylineTopology,PolylineGeometry,PolylineStyle>;
