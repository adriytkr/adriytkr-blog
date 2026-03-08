import type { World,ISystem } from '@adriytkr/engine';
import { MathCanvas, MathPoint, MathPosition, Renderable } from '../components';

import * as PIXI from 'pixi.js';

export class PointRenderSystem implements ISystem{
  public update(world:World,delta:number):void{
    const entities=world.query(MathPosition,MathPoint,Renderable);

    for(const entity of entities){
      const mathPosition=world.getComponent(entity,MathPosition)!;
      const point=world.getComponent(entity,MathPoint)!;
      const renderable=world.getComponent(entity,Renderable)!;
      const canvas=world.getComponent(mathPosition.canvasEntity,MathCanvas)!;

      const g=renderable.container as PIXI.Graphics;

      const screenX=canvas.origin.x+(mathPosition.x*canvas.unitSize);
      const screenY=canvas.origin.y-(mathPosition.y*canvas.unitSize);

      g.clear();
      g.beginFill(0xff0000);
      g.lineStyle(2,0xff0000);
      g.drawCircle(screenX,screenY,point.radius);
      g.endFill();
    }
  }
}

