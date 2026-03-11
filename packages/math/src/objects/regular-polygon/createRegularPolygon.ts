import { World } from '@adriytkr/engine';
import { Renderable, Transform } from '@adriytkr/std/common/components/index';

import { createRegularPolygonVertices } from '../../utils/math';
import type { RegularPolygonConfig,RegularPolygonStyle } from './types';

export const DEFAULT_REGULAR_POLYGON_STYLE:RegularPolygonStyle={
  stroke:'red',
  fill:'white',
};

export function createRegularPolygon(
  world:World,
  config:RegularPolygonConfig,
  style:RegularPolygonStyle=DEFAULT_REGULAR_POLYGON_STYLE,
){
  const {position,sides,offsetAngle}=config;

  const square=world.createEntity();

  const transform=world.addComponent(square,new Transform());
  transform.localPosition={...position};

  let radius:number;
  if('radius' in config){
    radius=config.radius;
  }else{
    radius=config.sidelength/(2*Math.sin(Math.PI/sides));
  }

  const renderable=new Renderable();
  renderable.addDrawCommand({
    type:'polygon',
    vertices:createRegularPolygonVertices(sides,radius,offsetAngle),
    style:{
      stroke:style.stroke,
      fill:style.fill,
    },
  });
  world.addComponent(square,renderable);

  return{
    entity:square,
    transform,
    renderable,
  };
}

