import { Camera2D, Transform } from '@adriytkr/std';
import type { ArcDrawCommand, IRendererAdapter, PolylineDrawCommand } from '@adriytkr/std';

import type {
  CommandBuffer,
  DrawCommand,
  PolygonDrawCommand,
} from '@adriytkr/std';

import * as PIXI from 'pixi.js';

import type { PixiTopology,PixiDrawCommand } from './config';

export type CommandHandler=(buffer:DrawCommand<any,any,any>,camera:Camera2D)=>void;

export class PixiRendererAdapter implements IRendererAdapter<PixiDrawCommand>{
  public root:PIXI.Container=new PIXI.Container();
  private handlers=new Map<PixiTopology,CommandHandler>();

  public constructor(private renderer:PIXI.Renderer){
    this.handlers.set('polyline',this.drawPolyline);
    this.handlers.set('polygon',this.drawPolygon);
    this.handlers.set('arc',this.drawArc);
  }

  public execute(buffer:CommandBuffer<PixiDrawCommand>,camera:Camera2D):void{
    for(const command of buffer.commands){
      const handler=this.handlers.get(command.topology);
      if(!handler)continue;
      handler.call(this,command,camera);
    }
  }

  private drawPolyline(
    buffer:PolylineDrawCommand,
    camera:Camera2D,
  ):void{
    const {geometry,style,transform}=buffer;
    if(geometry.points.length===0)return;

    const graphics=new PIXI.Graphics();

    graphics.setStrokeStyle({
      width:style.strokeWidth,
      color:style.stroke,
    });

    const first=this.applyTransform(geometry.points[0]!,transform,camera);
    graphics.moveTo(first.x,first.y);

    for(let i=1;i<geometry.points.length;i++){
      const p=this.applyTransform(geometry.points[i]!,transform,camera);
      graphics.lineTo(p.x,p.y);
    }

    graphics.stroke();

    this.root.addChild(graphics);
  }

  private drawPolygon(
    buffer:PolygonDrawCommand,
    camera:Camera2D,
  ):void{
    if(buffer.geometry.vertices.length===0)return;

    const graphics=new PIXI.Graphics();

    graphics.setStrokeStyle({
      width:buffer.style.strokeWidth,
      color:buffer.style.stroke,
    });
    graphics.setFillStyle({
      color:buffer.style.fill,
    });

    const first=this.applyTransform(buffer.geometry.vertices[0]!,buffer.transform,camera);
    graphics.moveTo(first.x,first.y);

    for(let i=1;i<buffer.geometry.vertices.length;i++){
      const p=this.applyTransform(buffer.geometry.vertices[i]!,buffer.transform,camera);
      graphics.lineTo(p.x,p.y);
    }

    graphics.closePath();
    graphics.fill();
    graphics.stroke();

    this.root.addChild(graphics);
  }

  private drawArc(
    buffer:ArcDrawCommand,
    camera:Camera2D,
  ):void{
    const graphics=new PIXI.Graphics();

    graphics.setStrokeStyle({
      width:buffer.style.strokeWidth,
      color:buffer.style.stroke,
    });
    graphics.setFillStyle({
      color:buffer.style.fill,
    });

    const center=this.applyTransform(buffer.transform.localPosition,buffer.transform,camera);
    const worldScale=Math.max(buffer.transform.worldScale.x,buffer.transform.worldScale.y);
    const screenRadius=buffer.geometry.radius*worldScale*camera.zoom;

    graphics.moveTo(center.x,center.y);
    graphics.arc(
      center.x,
      center.y,
      screenRadius,
      buffer.geometry.startAngle,
      buffer.geometry.endAngle,
    );

    graphics.fill();
    graphics.stroke();
    this.root.addChild(graphics);
  }

  private applyTransform(
    point:{x:number;y:number},
    transform:Transform,
    camera:Camera2D,
  ){
    let x=point.x*transform.worldScale.x;
    let y=point.y*transform.worldScale.y;

    const theta=2*Math.atan2(transform.worldRotation.z,transform.worldRotation.w);
    const cosR=Math.cos(theta);
    const sinR=Math.sin(theta);

    const xRot=x*cosR-y*sinR;
    const yRot=x*sinR+y*cosR;

    x=xRot+transform.worldPosition.x;
    y=yRot+transform.worldPosition.y;

    const screenX=(x-camera.x)*camera.zoom+camera.width/2;
    const screenY=(camera.y-y)*camera.zoom+camera.height/2;

    return {x:screenX,y:screenY,z:0};
  }
}
