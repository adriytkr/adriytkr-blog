import { BaseAnimation } from '~/shared/types/math/engine/animations/BaseAnimation';
import type { MathObject } from '~/shared/types/math/math-objects/bases';
import type { GetObjectStyle } from '~/shared/types/math/engine/api';

export class FadeOutAnimation extends BaseAnimation{
  private style:ObjectStyle;

  constructor(
    object: MathObject,
    getStyle:GetObjectStyle,
    options:AnimationOptions,
  ){
    super(options);
    this.style=getStyle(object);
  }

  override setup(){
    this.style.opacity=0;
  }

  override update(alpha:number){
    this.style.opacity=1-alpha;
  }

  override resolve():void{}
}

