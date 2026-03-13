import type {
  PolylineTopology,
  PolygonTopology,
  ArcTopology,
  PolylineDrawCommand,
  PolygonDrawCommand,
  ArcDrawCommand,
  PolylineGeometry,
  PolygonGeometry,
  ArcGeometry,
} from '@adriytkr/std';

export type PixiTopology=PolylineTopology|PolygonTopology|ArcTopology;

export type PixiGeometry=PolylineGeometry|PolygonGeometry|ArcGeometry;

export type PixiDrawCommand=PolylineDrawCommand|PolygonDrawCommand|ArcDrawCommand;
