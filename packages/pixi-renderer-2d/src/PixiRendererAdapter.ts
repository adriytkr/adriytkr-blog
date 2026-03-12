import { ArcGeometry, Camera2D, PolygonGeometry, PolylineGeometry, Transform } from '@adriytkr/std';
import type { Geometry, IRendererAdapter } from '@adriytkr/std';

import * as PIXI from 'pixi.js';

export class PixiRendererAdapter implements IRendererAdapter{
  public root:PIXI.Container=new PIXI.Container();

  public constructor(private renderer:PIXI.Renderer){}

  public draw(geometry:Geometry,transform:Transform,camera:Camera2D):void{
    if(geometry instanceof PolylineGeometry){
      if(geometry.points.length===0)return;
      this.drawPolyline(geometry,transform,camera);
    }else if(geometry instanceof PolygonGeometry){
      if(geometry.vertices.length===0)return;
      this.drawPolygon(geometry,transform,camera);
    }else if(geometry instanceof ArcGeometry){
      this.drawArc(geometry,transform,camera);
    }else{
      throw Error('unsupported geometry');
    }
  }

  private drawPolyline(
    geometry:PolylineGeometry,
    transform:Transform,
    camera:Camera2D,
  ):void{
    const graphics=new PIXI.Graphics();

    graphics.setStrokeStyle({
      width:1,
      color:0xff0000,
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
    geometry:PolygonGeometry,
    transform:Transform,
    camera:Camera2D,
  ):void{
    const graphics=new PIXI.Graphics();

    graphics.setStrokeStyle({
      width:1,
      color:'red',
    });
    graphics.setFillStyle({
      color:'white',
    });

    const first=this.applyTransform(geometry.vertices[0]!,transform,camera);
    graphics.moveTo(first.x,first.y);

    for(let i=1;i<geometry.vertices.length;i++){
      const p=this.applyTransform(geometry.vertices[i]!,transform,camera);
      graphics.lineTo(p.x,p.y);
    }

    graphics.closePath();
    graphics.fill();
    graphics.stroke();

    this.root.addChild(graphics);
  }

  private drawArc(
    geometry:ArcGeometry,
    transform:Transform,
    camera:Camera2D,
  ):void{
    const graphics=new PIXI.Graphics();

    graphics.setStrokeStyle({
      width:1,
      color:'red',
    });
    graphics.setFillStyle({
      color:'white',
    });

    const center=this.applyTransform(transform.localPosition,transform,camera);
    const worldScale=Math.max(transform.worldScale.x,transform.worldScale.y);
    const screenRadius=geometry.radius*worldScale*camera.zoom;

    graphics.moveTo(center.x,center.y);
    graphics.arc(center.x,center.y,screenRadius,geometry.startAngle,geometry.endAngle);

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
