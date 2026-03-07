import { World,Component,Entity } from '@adriytkr/engine';

import * as d3 from 'd3';

export class D3Renderable<T extends d3.BaseType> extends Component{
  public constructor(
    public baseTagName:string,
    public draw:(
      el:d3.Selection<T,any,any,any>,
      world:World,
      entity:Entity,
      xScale:d3.ScaleLinear<number,number>,
      yScale:d3.ScaleLinear<number,number>,
    )=>void,
  ){
    super();
  }
}
