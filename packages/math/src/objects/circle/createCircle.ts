import type { World, } from '@adriytkr/engine';
import { Renderable, Transform } from '@adriytkr/std';

import type { CircleConfig,CircleStyle } from './types';

const DEFAULT_CIRCLE_STYLE:CircleStyle={
  fill:'white',
  stroke:'red',
};

export function createCircle(
  world:World,
  config:CircleConfig,
  style:CircleStyle=DEFAULT_CIRCLE_STYLE,
){
  const {position,radius}=config;

  const circle=world.createEntity();

  const transform=world.addComponent(circle,new Transform());
  transform.localPosition=position;

  const renderable=world.addComponent(circle,new Renderable());
  renderable.addDrawCommand({
    type:'arc',
    radius,
    startAngle:0,
    endAngle:2*Math.PI,
    style:{
      fill:style.fill,
      stroke:style.stroke,
    },
  });
  world.addComponent(circle,renderable);

  return{
    entity:circle,
  };
}
