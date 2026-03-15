import type { ISystem, World } from '@adriytkr/engine';
import { Camera2D, GeometryBuffer, Transform } from '@adriytkr/std';

import * as PIXI from 'pixi.js';
import { PixiRenderable } from './PixiRenderable';

export class PixiRendererSystem implements ISystem{
  public constructor(private stage:PIXI.Container,private renderer:PIXI.Renderer){}

  public update(world:World,delta:number):void{
    const camera=world.query(Camera2D)[0]!;
    const cam=camera.getComponent(Camera2D)!;

    this.stage.scale.set(cam.zoom);
    this.stage.x=(this.renderer.width/2)-(cam.x*cam.zoom);
    this.stage.y=(this.renderer.height/2)-(cam.y*cam.zoom);

    world
      .query(GeometryBuffer)
      .forEach(entity=>{
        if(entity.getComponent(PixiRenderable)!==undefined)return;

        const graphics=new PIXI.Graphics();
        this.stage.addChild(graphics);

        entity.addOrRetrieveComponent(new PixiRenderable(graphics));
      });

    world
      .query(GeometryBuffer)
      .forEach(entity=>{
        const graphics=entity.getComponent(PixiRenderable)!;
        const geometryBuffer=entity.getComponent(GeometryBuffer)!;
        const transform=entity.getComponent(Transform)!;

        graphics.root.position.set(transform.worldPosition.x,transform.worldPosition.y);
        // graphics.root.rotation=transform.worldRotation;
        graphics.root.scale.set(transform.worldScale.x,transform.worldScale.y);

        // Sync Geometry & Style: Only redraw if the actual shape changed
        // const stroke = entity.get(StrokeStyle);
        // const fill = entity.get(FillStyle);

        graphics.root.clear(); // Clear internal GPU buffer for THIS object only
        graphics.root.setStrokeStyle({
          color:'red',
          width:0.1,
        });

        // if (stroke) graphics.lineStyle(stroke.width, stroke.color, stroke.opacity);
        // if (fill) graphics.beginFill(fill.color, fill.opacity);

        for(const cmd of geometryBuffer.buffer){
          if(cmd.type==='polyline'){
            graphics.root.moveTo(cmd.points[0]!.x,-1*cmd.points[0]!.y);

            for(let i=1;i<cmd.points.length;i++){
              graphics.root.lineTo(cmd.points[i]!.x,-1*cmd.points[i]!.y);
            }
          }
        }

        graphics.root.stroke();

        // if(fill)graphics.endFill();
    });
  }

  // private drawToPixi(container: PIXI.Container, primitives: ShapePrimitive[]) {
  //   // Clear old graphics and redraw based on the primitive array
  //   let graphics = container.getChildAt(0) as PIXI.Graphics; 
  //   graphics.clear();
  //   primitives.forEach(p => {
  //     if (p.type === 'line') graphics.moveTo(p.start.x, p.start.y).lineTo(p.end.x, p.end.y);
  //     if (p.type === 'triangle') graphics.drawPolygon(p.points.flat());
  //   });
  // }
}

