import { BaseAnimation } from '~/engines/shared/core/BaseAnimation';
import type { AnimationOptions } from '~/engines/shared/core/types';
import type { SceneNode } from '~/engines/shared/core/SceneNode';
import { DEFAULT_ANIMATION_OPTIONS } from './constants';
import type { HasOpacity } from './types';

export class FadeInAnimation<T> extends BaseAnimation{
  private m_node:SceneNode<T,HasOpacity>;

  constructor(
    node:SceneNode<T,HasOpacity>,
    options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS,
  ){
    super(options);
    this.m_node=node;
  }

  override setup(){
    this.m_node.style.opacity=0;
  }

  override update(alpha:number){
    this.m_node.style.opacity=alpha;
  }

  override resolve():void{}
}
