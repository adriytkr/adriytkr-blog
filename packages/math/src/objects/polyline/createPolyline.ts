import { World } from '@adriytkr/engine';
import { Renderable, Transform } from '@adriytkr/std';
import type { Point } from '@adriytkr/std';

import type { PolylineConfig,PolylineStyle } from './types';

export const DEFAULT_POLYLINE_STYLE:PolylineStyle={
  color:'red',
};

export function createPolyline(
  world:World,
  config:PolylineConfig,
  style:PolylineStyle=DEFAULT_POLYLINE_STYLE,
){
  const {position,points}=config;

  const polyline=world.createEntity();

  const transform=world.addComponent(polyline,new Transform());
  transform.localPosition={...position};

  const renderable=new Renderable();
  renderable.addDrawCommand({
    type:'polyline',
    points,
    style:{
      color:style.color,
    },
  });
  world.addComponent(polyline,renderable);

  return{
    entity:polyline,
    transform,
    renderable,
  };
}

