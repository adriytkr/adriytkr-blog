import type { DrawCommand } from './DrawCommand';

export class CommandBuffer<T extends DrawCommand<string,any,any>>{
  public commands:T[]=[];
  
  public push(cmd:T):void{
    this.commands.push(cmd);
  }

  public clear():void{
    this.commands.length=0;
  }
}
