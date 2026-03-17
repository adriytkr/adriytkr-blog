import { BaseAnimation } from '../BaseAnimation';
import { GameObject } from '../GameObject';
import type { Point } from '../types';

export class ShiftAnimation extends BaseAnimation{
  private m_target:GameObject;
  private m_delta:Point;

  private m_startPosition!:Point;

  public constructor(target:GameObject,delta:Point,duration:number){
    super(duration);
    this.m_target=target;
    this.m_delta=delta;
  }

  public override setup():void{
    this.m_startPosition={
      x:this.m_target.position.x$.value,
      y:this.m_target.position.y$.value,
    };
  }

  public update(alpha:number):void{
    this.m_target.position.x$.value=this.m_startPosition.x+this.m_delta.x*alpha;
    this.m_target.position.y$.value=this.m_startPosition.y+this.m_delta.y*alpha;
  }
}
