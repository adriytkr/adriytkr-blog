import { World } from '@adriytkr/engine';
import type { Point } from '@adriytkr/std/types';
import { Renderable, Transform } from '@adriytkr/std/common/components/index';

import type { RectangleConfig,RectangleStyle } from './types';

export const DEFAULT_RECTANGLE_STYLE:RectangleStyle={
  stroke:'red',
  fill:'white',
};

export function createRectangle(
  world:World,
  config:RectangleConfig,
  style:RectangleStyle=DEFAULT_RECTANGLE_STYLE,
){
  const {position,width,height}=config;

  const square=world.createEntity();

  const transform=world.addComponent(square,new Transform());
  transform.localPosition={...position};

  const renderable=new Renderable();
  renderable.addDrawCommand({
    type:'polygon',
    vertices:[
      {x:position.x,y:position.y,z:0},
      {x:position.x,y:position.y+height,z:0},
      {x:position.x+width,y:position.y+height,z:0},
      {x:position.x+width,y:position.y,z:0},
    ],
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

