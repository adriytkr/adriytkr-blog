import type { Point } from '@adriytkr/std';

export interface RegularPolygonConfigBase{
  position:Point,
  sides:number,
  offsetAngle?:number,
}

export interface RegularPolygonConfigWithSideLength extends RegularPolygonConfigBase{
  sideLength:number,
}

export interface RegularPolygonConfigWithRadius extends RegularPolygonConfigBase{
  radius:number;
}

export type RegularPolygonConfig=RegularPolygonConfigWithRadius|RegularPolygonConfigWithSideLength;

export interface RegularPolygonStyle{
  stroke:string;
  fill:string;
}
