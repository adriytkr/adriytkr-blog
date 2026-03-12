import type { ISystem, World } from '@adriytkr/engine';
import { Renderable, Transform } from '../components';
import type { IRendererAdapter } from '../renderers/IRendererAdapter';
import { Camera2D } from '../../2d';
import { CommandBuffer } from '../renderers/commands/CommandBuffer';
import type { DrawCommand } from '../renderers';

export type RenderEntityCommand={
  transform:Transform;
  buffer:CommandBuffer<any>;
};

export class RendererSystem<T extends DrawCommand<string,any,any>> implements ISystem{
  public constructor(
    private renderer:IRendererAdapter<any>,
    private buffer:CommandBuffer<T>,
  ){}

  public update(world:World,delta:number):void{
    const cameraEntity=world.query(Camera2D)[0]!;
    this.buffer.clear();

    if(cameraEntity===undefined)
      throw Error('No camera?!');

    const camera=world.getComponent(cameraEntity,Camera2D)!;

    for(const entity of world.query(Renderable,Transform)){
      const transform=world.getComponent(entity,Transform)!;
      const renderable=world.getComponent(entity,Renderable)!;

      for(const primitive of renderable.primitives){
        this.buffer.push({
          ...primitive,
          transform,
        });
      }
    }

    if(this.buffer.commands.length===0)return;
    this.renderer.execute(this.buffer,camera);
  }
}
