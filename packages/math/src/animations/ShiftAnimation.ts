import { BaseAnimation } from '../BaseAnimation';
import { GameObject } from '../GameObject';
import type { AnimationOptions, IVector3 } from '../types';

export class ShiftAnimation extends BaseAnimation{
  private m_target:GameObject;
  private m_delta:IVector3;

  private m_startPosition!:IVector3;

  public constructor(target:GameObject,delta:IVector3,options:AnimationOptions){
    super({
      duration:options.duration,
      easing:options.easing,
    });

    this.m_target=target;
    this.m_delta=delta;
  }

  public override setup():void{
    this.m_startPosition={
      x:this.m_target.position.x$.value,
      y:this.m_target.position.y$.value,
      z:this.m_target.position.z$.value,
    };
  }

  public update(alpha:number):void{
    this.m_target.position.x$.value=this.m_startPosition.x+this.m_delta.x*alpha;
    this.m_target.position.y$.value=this.m_startPosition.y+this.m_delta.y*alpha;
    this.m_target.position.z$.value=this.m_startPosition.z+this.m_delta.z*alpha;
  }
}
