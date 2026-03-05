import type { BaseRenderer } from './BaseRenderer';

export class SceneNode<TData,TStyle,TSurface,TContext>{
  public id:number;
  public data:TData;
  public style:TStyle;
  public renderer:BaseRenderer<TData,TStyle,TSurface,TContext>;

  public constructor(
    id:number,
    data:TData,
    style:TStyle,
    renderer:BaseRenderer<TData,TStyle,TSurface,TContext>,
  ){
    this.id=id;
    this.data=data;
    this.style=style;
    this.renderer=renderer;
  }
}
