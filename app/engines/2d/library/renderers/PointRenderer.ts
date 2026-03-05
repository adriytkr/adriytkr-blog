import type { RenderContext2D } from '@engines/2d/core/core';
import type { PointObject } from '@math-objects';
import { BaseRenderer2D } from '@engines/2d/core/BaseRenderer2D';
import type { SceneNode2D } from '@engines/2d/core/SceneNode2D';

export class PointRenderer extends BaseRenderer2D<PointObject,any>{
  public override get layerName(){
    return 'point';
  }

  public override render(
    points:SceneNode2D<PointObject,any>[],
    context:RenderContext2D,
  ){
    if(!this.m_group)return;

    const {xScale,yScale}=context;

    this.m_group
      .selectAll<SVGCircleElement,SceneNode2D<PointObject,any>>('circle.point')
      .data(points,p=>p.id)
      .join(
        enter=>
          enter
            .append('circle')
            .attr('data-id',p=>p.id)
            .attr('class','point')
            .attr('fill','black'),
        update=>update,
        exit=>exit.remove(),
      )
      .attr('r',p=>p.data.size)
      .attr('cx',p=>xScale(p.data.at.x))
      .attr('cy',p=>yScale(p.data.at.y))
      .style('opacity',p=>p.style.opacity);
  }
}
