import { World,ISystem,Entity } from '@adriytkr/engine';
import { Camera2D,Position } from '@adriytkr/std';
import { D3Renderable } from './D3Renderable';

import * as d3 from 'd3';

export class D3Renderer implements ISystem{
  private m_canvas:d3.Selection<SVGElement,any,any,any>;

  public constructor(selection:SVGElement){
    this.m_canvas=d3.select(selection);
  }

  update(world:World,delta:number){
    const entities=world.query(D3Renderable);
    const camEntity=world.query(Camera2D,Position)[0];
    if(!camEntity){
      console.log('No camera');
      return;
    }

    const cam=world.getComponent(camEntity,Camera2D)!;
    const camPos=world.getComponent(camEntity,Position)!;

    cam.updateScales(camPos.x,camPos.y);

    this.m_canvas
      .selectAll<any,Entity>('.entity')
      .data(entities,entity=>entity)
      .join(
        enter=>enter
          .append(entity=>{
            const renderable=world.getComponent(entity,D3Renderable)!;
            return document.createElementNS('http://www.w3.org/2000/svg',renderable.baseTagName);
          })
          .attr('class','entity'),
        update=>update,
        exit=>exit.remove(),
      )
      .each(function(entity){
        const el=d3.select(this);
        const renderable=world.getComponent(entity,D3Renderable)!;
        
        renderable.draw(el,world,entity,cam.xScale,cam.yScale);
      });
  }
}
