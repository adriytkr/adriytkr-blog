import type { ISystem, World } from '@adriytkr/engine';
import { ArcGeometry, PolygonGeometry, PolylineGeometry } from '../geometry';
import { Transform } from '../components';
import type { IRendererAdapter } from '../renderers/IRendererAdapter';
import { Camera2D } from '../../2d';

export class RendererSystem implements ISystem{
  private renderer:IRendererAdapter;

  public constructor(renderer:IRendererAdapter){
    this.renderer=renderer;
  }

  public update(world:World,delta:number):void{
    const cameraEntity=world.query(Camera2D)[0]!;

    if(cameraEntity===undefined)
      throw Error('No camera?!');

    const camera=world.getComponent(cameraEntity,Camera2D)!;

    for(const entity of world.query(Transform,PolylineGeometry)){
      const transform=world.getComponent(entity,Transform)!;
      const geometry=world.getComponent(entity,PolylineGeometry)!;
      this.renderer.draw(geometry,transform,camera);
    }

    for(const entity of world.query(Transform,PolygonGeometry)){
      const transform=world.getComponent(entity,Transform)!;
      const geometry=world.getComponent(entity,PolygonGeometry)!;
      this.renderer.draw(geometry,transform,camera);
    }

    for(const entity of world.query(Transform,ArcGeometry)){
      const transform=world.getComponent(entity,Transform)!;
      const geometry=world.getComponent(entity,ArcGeometry)!;
      this.renderer.draw(geometry,transform,camera);
    }
  }
}
