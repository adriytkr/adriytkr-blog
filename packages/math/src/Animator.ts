import { BaseAnimation } from './BaseAnimation';

export class Animator{
  private m_animations:BaseAnimation[]=[];

  public add(animation:BaseAnimation):void{
    this.m_animations.push(animation);
  }

  public update(delta:number):void{
    for(let i=this.m_animations.length-1;i>=0;i--){
      const animation=this.m_animations[i]!;

      if(!animation.hasStarted){
        animation.setup();
        if(animation.onStart)animation.onStart();
      }

      animation.elapsed+=delta;
      animation.tick();

      if(animation.hasEnded){
        this.m_animations.splice(i,1);
        if(animation.onComplete)animation.onComplete();
      }
    }
  }

  public play(){}
}
