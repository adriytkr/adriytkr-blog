import { World } from '@adriytkr/engine';
import { Renderable, Transform } from '@adriytkr/std';
import type { Point } from '@adriytkr/std';

import type { PolygonConfig,PolygonStyle } from './types';

export const DEFAULT_POLYGON_STYLE:PolygonStyle={
  stroke:'red',
  fill:'white',
};

export function createPolygon(
  world:World,
  config:PolygonConfig,
  style:PolygonStyle=DEFAULT_POLYGON_STYLE,
){
  const {position,vertices}=config;

  const polygon=world.createEntity();

  const transform=world.addComponent(polygon,new Transform());
  transform.localPosition={...position};

  const renderable=new Renderable();
  renderable.addDrawCommand({
    type:'polygon',
    vertices:vertices.map(vertex=>({
      x:position.x+vertex.x,
      y:position.y+vertex.y,
      z:position.z+vertex.z,
    })),
    style:{
      stroke:style.stroke,
      fill:style.fill,
    },
  });
  world.addComponent(polygon,renderable);

  return{
    entity:polygon,
    transform,
    renderable,
  };
}


