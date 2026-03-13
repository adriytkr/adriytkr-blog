import type { Point } from '../../../types';
import type { DrawCommand } from './DrawCommand';

export type ArcTopology='arc';

export type ArcGeometry={
  radius:number;
  startAngle:number;
  endAngle:number;
};

export type ArcStyle={
  stroke:string;
  strokeWidth:number;
  fill:string;
};

export type ArcDrawCommand=DrawCommand<ArcTopology,ArcGeometry,ArcStyle>;

