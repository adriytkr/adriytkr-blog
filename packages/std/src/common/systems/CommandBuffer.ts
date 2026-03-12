import type { Point } from '../../types';
import type { Transform } from '../components';

export interface DrawCommand<T extends string,G,S>{
  topology:T,
  geometry:G,
  style:S,
  transform:Transform,
};

export type PolylineTopology='polyline';
export type PolylineGeometry={
  points:Point[];
};
export type PolylineStyle={
  stroke:string;
  strokeWidth:number;
};
export type PolylineDrawCommand=DrawCommand<PolylineTopology,PolylineGeometry,PolylineStyle>;

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

export type PixiTopology=PolylineTopology|PolygonTopology;

export type PixiDrawCommand=PolylineDrawCommand|PolygonDrawCommand;

export class CommandBuffer<T extends DrawCommand<string,any,any>>{
  public commands:T[]=[];
  
  public push(cmd:T):void{
    this.commands.push(cmd);
  }

  public clear():void{
    this.commands.length=0;
  }
}
