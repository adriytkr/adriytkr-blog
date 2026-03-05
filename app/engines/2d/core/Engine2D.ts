import type { RenderContext2D } from './core';
import { CameraObject } from './CameraObject';
import { DEFAULT_CAMERA } from './constants';

import * as d3 from 'd3';

import { BaseEngine } from '@engines/shared/core/BaseEngine';

export class Engine2D
  extends BaseEngine<d3.Selection<SVGGElement,unknown,null,undefined>,RenderContext2D,CameraObject>
{
  private m_svg:d3.Selection<SVGSVGElement,unknown,null,undefined>;
  private m_root:d3.Selection<SVGGElement,unknown,null,undefined>;

  private m_width=0;
  private m_height=0;

  private m_baseXScale:d3.ScaleLinear<number,number>;
  private m_baseYScale:d3.ScaleLinear<number,number>;
  private m_currentXScale!:d3.ScaleLinear<number,number>;
  private m_currentYScale!:d3.ScaleLinear<number,number>;

  public constructor(
    svgElement:SVGSVGElement,
    defaultCamera:CameraObject=DEFAULT_CAMERA,
  ){
    super(defaultCamera);
    this.m_svg=d3.select(svgElement);
    this.m_root=this.m_svg
      .append('g')
      .attr('class','root');

    this.m_width=svgElement.clientWidth
    this.m_height=svgElement.clientHeight;

    this.m_svg.attr('viewBox',`0 0 ${this.m_width} ${this.m_height}`);

    this.m_baseXScale=d3
      .scaleLinear()
      .domain(this.m_activeCamera.domain)
      .range([0,this.m_width]);
    this.m_baseYScale=d3
      .scaleLinear()
      .domain(this.m_activeCamera.range)
      .range([this.m_height,0]);
    this.m_currentXScale=this.m_baseXScale.copy();
    this.m_currentYScale=this.m_baseYScale.copy();
    this.initZoom();
  }

  public get root():d3.Selection<SVGGElement,unknown,null,undefined>{
    return this.m_root;
  }

  private initZoom(){
    const zoom=d3
      .zoom<SVGSVGElement,unknown>()
      .scaleExtent([0.5,10])
      .on('zoom',(event)=>{
        const {transform}=event;

        const newXScale=transform.rescaleX(this.m_baseXScale);
        const newYScale=transform.rescaleY(this.m_baseYScale);
        this.m_activeCamera.domain=newXScale.domain();
        this.m_activeCamera.range=newYScale.domain();

        this.requestUpdate();
      });
    this.m_svg.call(zoom);
  }

  protected override isCamera=(object:any): object is CameraObject=>
    object instanceof CameraObject;

  protected getRenderContext=():RenderContext2D=>({
    xScale:this.m_currentXScale,
    yScale:this.m_currentYScale,
    activeCamera:this.m_activeCamera,
  });

  private syncZoomToCamera(){
    this.m_currentXScale.domain(this.m_activeCamera.domain);
    this.m_currentYScale.domain(this.m_activeCamera.range);
  }

  protected updateScene(){
    this.syncZoomToCamera();
    const context=this.getRenderContext();
    const renderers=Map.groupBy(this.m_nodes,node=>node.renderer);

    renderers.forEach((nodes,renderer)=>{
      if(!renderer.isMounted)
        renderer.mount(this.m_root);
      renderer.render(nodes,context)
    });
  }

  protected override onDispose():void{}
}
