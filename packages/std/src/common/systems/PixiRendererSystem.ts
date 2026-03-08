import type { ISystem,World } from '@adriytkr/engine';
import { ActiveCameraTag, Camera2D,Renderable,Transform} from '../components';

import * as PIXI from 'pixi.js';

export class PixiRendererSystem implements ISystem{
  private root=new PIXI.Container();

  public constructor(private renderer:PIXI.Renderer){}

  public update(world:World,delta:number):void{
    const cameraEntity=world.query(Camera2D,ActiveCameraTag)[0]!;
    const camera=world.getComponent(cameraEntity,Camera2D)!;

    const entities=world.query(Transform,Renderable);

    for(const entity of entities){
      const transform=world.getComponent(entity,Transform)!;
      const renderable=world.getComponent(entity,Renderable)!;

      if(renderable.container.parent!==this.root)
        this.root.addChild(renderable.container);

      const centerX=this.renderer.width/2;
      const centerY=this.renderer.height/2;

      renderable.container.x=transform.localPosition.x-camera.x+centerX;
      renderable.container.y=transform.localPosition.y-camera.y+centerY;
    }

    this.renderer.render(this.root);
  }
}
