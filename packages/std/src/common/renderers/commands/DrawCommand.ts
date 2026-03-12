import type { Transform } from '../../components';

export interface DrawCommand<Topology extends string,Geometry,Style>{
  topology:Topology,
  geometry:Geometry,
  style:Style,
  transform:Transform,
};
