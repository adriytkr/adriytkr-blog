import type { RenderContext } from '~/shared/types/math/engine/core';
import type { MathObject } from '~/shared/types/math/math-objects/bases';

export abstract class BaseRenderer<T extends MathObject>{
  protected group:d3.Selection<SVGGElement,unknown,null,undefined>;

  public constructor(
    parentSlection:d3.Selection<SVGGElement,unknown,null,undefined>,
    className:string,
  ){
    this.group=parentSlection
      .append('g')
      .attr('class',className);
  }

  public abstract render(
    objects:T[],
    context:RenderContext,
  ):void;

  public clear(){
    this.group
      .selectAll('*')
      .remove();
  }
}
