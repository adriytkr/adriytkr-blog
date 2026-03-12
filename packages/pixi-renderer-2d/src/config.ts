import type {
  PolylineTopology,
  PolygonTopology,
  PolylineDrawCommand,
  PolygonDrawCommand,
  PolylineGeometry,
  PolygonGeometry,
} from '@adriytkr/std';

export type PixiTopology=PolylineTopology|PolygonTopology;
export type PixiGeometry=PolylineGeometry|PolygonGeometry;
export type PixiDrawCommand=PolylineDrawCommand|PolygonDrawCommand;
