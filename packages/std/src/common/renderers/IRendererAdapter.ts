import type { Camera2D } from '../../2d';
import type { DrawCommand } from './commands';
import type { CommandBuffer } from './commands/CommandBuffer';

export interface IRendererAdapter<T extends DrawCommand<string,any,any>>{
  execute(buffer:CommandBuffer<T>,camera:Camera2D):void;
}
