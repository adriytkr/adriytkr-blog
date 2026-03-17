import { BaseAnimation } from './BaseAnimation';

export class Animator{
  private m_animations:BaseAnimation[]=[];

  public add(animation:BaseAnimation):void{
    this.m_animations.push(animation);
  }

  public update(delta:number):void{
    for(let i=this.m_animations.length-1;i>=0;i--){
      const animation=this.m_animations[i]!;

      animation.elapsed+=delta;
      const progress=animation.elapsed/animation.duration;
      const alpha=Math.min(1,progress);
      animation.update(alpha);

      if(alpha===1)this.m_animations.splice(i,1);
    }
  }
}
