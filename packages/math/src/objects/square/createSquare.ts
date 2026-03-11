import type { World, } from '@adriytkr/engine';
import { Renderable, Transform } from '@adriytkr/std';

import type { SquareConfig,SquareStyle } from './types';
import { createRegularPolygon } from '../regular-polygon';

const DEFAULT_SQUARE_STYLE:SquareStyle={
  fill:'white',
  stroke:'red',
};

export function createSquare(
  world:World,
  config:SquareConfig,
  style:SquareStyle=DEFAULT_SQUARE_STYLE,
){
  const {position,sidelength}=config;
  
  return createRegularPolygon(
    world,
    {
      position,
      sidelength,
      sides:4,
    },
    {
      fill:style.fill,
      stroke:style.stroke,
    },
  );
}
