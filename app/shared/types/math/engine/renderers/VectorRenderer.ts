import { BaseRenderer } from '~/shared/types/math/engine/renderers/BaseRenderer';
import type { RenderContext } from '~/shared/types/math/engine/core';
import type { VectorObject } from '~/shared/types/math/math-objects/VectorObject';

export class VectorRenderer extends BaseRenderer<VectorObject>{
  public constructor(
    parentSlection:d3.Selection<SVGGElement,unknown,null,undefined>,
  ){
    super(parentSlection,'vectors-layer');
  }

  public override render(
    vectors:VectorObject[],
    context:RenderContext,
  ){
    const {xScale,yScale,getObjectStyle}=context;

    this.group
      .selectAll<SVGLineElement,VectorObject>('line.vector')
      .data(vectors,v=>v.id)
      .join(
        enter=>
          enter
            .append('line')
            .attr('data-id',v=>v.id)
            .attr('class','vector')
            .attr('stroke','black')
            .attr('stroke-width',3)
            .attr('marker-end','url(#arrow)'),
        update=>update,
        exit=>exit.remove(),
      )
      .style('opacity',v=>getObjectStyle(v).opacity)
      .attr('x1',v=>xScale(v.from.x))
      .attr('y1',v=>yScale(v.from.y))
      .attr('x2',v=>xScale(v.to.x))
      .attr('y2',v=>yScale(v.to.y));
  }
}
