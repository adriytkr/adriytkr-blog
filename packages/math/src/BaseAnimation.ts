import type { AnimationOptions, EasingFunction } from './types';

export abstract class BaseAnimation{
  public elapsed:number=0;
  public duration:number;
  public easing:EasingFunction;

  public onStart?:()=>void;
  public onComplete?:()=>void;

  public constructor(options:AnimationOptions){
    this.duration=options.duration;
    this.easing=options.easing;
  }

  public get hasStarted():boolean{
    return this.elapsed>0;
  }

  public get hasEnded():boolean{
    return this.elapsed/this.duration>=1;
  }

  public tick():void{
    const progress=this.elapsed/this.duration;
    const linearAlpha=Math.min(1,progress);
    const easedAlpha=this.easing(linearAlpha);

    this.update(easedAlpha);
  }

  public setup():void{}
  public abstract update(alpha:number):void;
  public resolve():void{}
}
