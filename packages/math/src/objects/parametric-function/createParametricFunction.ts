import { World } from '@adriytkr/engine';
import { Renderable, Transform } from '@adriytkr/std';
import type { Point } from '@adriytkr/std';

import type { ParametricFunctionConfig,ParametricFunctionStyle } from './types';

export const DEFAULT_PARAMETRIC_FUNCTION_STYLE:ParametricFunctionStyle={
  color:'red',
};

export function createParametricFunction(
  world:World,
  config:ParametricFunctionConfig,
  style:ParametricFunctionStyle=DEFAULT_PARAMETRIC_FUNCTION_STYLE,
){
  const {position,x,y,tDomain,samples}=config;

  const polyline=world.createEntity();

  const transform=world.addComponent(polyline,new Transform());
  transform.localPosition={...position};

  const points:Point[]=[];
  const dt=(tDomain[1]-tDomain[0])/samples;
  for(let t=tDomain[0];t<=tDomain[1];t+=dt){
    points.push({x:x(t),y:y(t),z:0});
  }

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


