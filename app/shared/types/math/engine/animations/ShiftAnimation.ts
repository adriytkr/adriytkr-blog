import { BaseAnimation } from '~/shared/types/math/engine/animations/BaseAnimation';
import type { Shiftable } from '~/shared/types/math/math-objects/interfaces';

export class ShiftAnimation extends BaseAnimation{
  private lastAlpha=0;

  constructor(
    private object:Shiftable,
    private delta:Point,
    options:AnimationOptions,
  ){
    super(options);
  }

  public override setup(){
    this.lastAlpha=0;
  }

  public override update(alpha:number){
    const changeInAlpha=alpha-this.lastAlpha;
    const incrementalDelta:Point={
      x:this.delta.x*changeInAlpha,
      y:this.delta.y*changeInAlpha,
    };
    
    this.object.shift(incrementalDelta);
    this.lastAlpha=alpha;
  }

  public override resolve():void{}
}
