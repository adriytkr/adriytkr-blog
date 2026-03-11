import type { AnimationOptions } from './types';

export abstract class BaseAnimation<TContext>{
  public startTime:number=0;
  public duration:number;

  constructor(options:AnimationOptions){
    this.duration=options.duration;
  }

  abstract setup():void;
  abstract update(alpha:number,context:TContext):void;
  abstract resolve():void;
}
