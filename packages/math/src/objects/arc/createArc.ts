import { World } from '@adriytkr/engine';
import { Renderable, Transform } from '@adriytkr/std';

import type { ArcConfig,ArcStyle } from './types';

export const DEFAULT_ARC_STYLE:ArcStyle={
  stroke:'red',
  fill:'white',
};

export function createArc(
  world:World,
  config:ArcConfig,
  style:ArcStyle=DEFAULT_ARC_STYLE,
){
  const {position,radius,startAngle,endAngle}=config;

  const arc=world.createEntity();

  const transform=world.addComponent(arc,new Transform());
  transform.localPosition={...position};

  const renderable=new Renderable();
  renderable.addDrawCommand({
    type:'arc',
    radius,
    startAngle,
    endAngle,
    style:{
      stroke:style.stroke,
      fill:style.fill,
    },
  });
  world.addComponent(arc,renderable);

  return{
    entity:arc,
    transform,
    renderable,
  };
}

