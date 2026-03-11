import type { AnimationTrack, Transform } from '../components';
import type { Point } from '../../types';
import { DEFAULT_EASING_TYPE_ANIMATION } from './easing';

export function shiftAnimationTrack(
  duration:number,
  transform:Transform,
  delta:Point,
  easing:(x:number)=>number=DEFAULT_EASING_TYPE_ANIMATION,
):AnimationTrack{
  const startX=transform.localPosition.x;
  const startY=transform.localPosition.y;

  return {
    elapsed:0,
    duration,
    onUpdate(alpha:number){
      const t=easing(alpha);

      transform.localPosition.x=startX+delta.x*t;
      transform.localPosition.y=startY+delta.y*t;
    }
  };
}
