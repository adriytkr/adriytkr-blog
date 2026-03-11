import type { AnimationTrack, Transform } from '../components';
import { DEFAULT_EASING_TYPE_ANIMATION } from './easing';

function quatFromZRotation(angle:number){
  return{
    x:0,
    y:0,
    z: Math.sin(angle/2),
    w:Math.cos(angle/2),
  };
}

function slerp(a:any,b:any,t:number){
  let cos=
    a.x*b.x+
    a.y*b.y+
    a.z*b.z+
    a.w*b.w;

  if(cos<0){
    b={
      x:-b.x,
      y:-b.y,
      z:-b.z,
      w:-b.w
    };
    cos=-cos;
  }

  const k0=1-t;
  const k1=t;

  return{
    x:k0*a.x+k1*b.x,
    y:k0*a.y+k1*b.y,
    z:k0*a.z+k1*b.z,
    w:k0*a.w+k1*b.w,
  };
}

function quatMultiply(a:any, b:any){
  return {
    x:a.w*b.x+a.x*b.w+a.y*b.z-a.z*b.y,
    y:a.w*b.y-a.x*b.z+a.y*b.w+a.z*b.x,
    z:a.w*b.z+a.x*b.y-a.y*b.x+a.z*b.w,
    w:a.w*b.w-a.x*b.x-a.y*b.y-a.z*b.z,
  };
}

export function rotateAnimationTrack(
  duration:number,
  transform:Transform,
  rotation:number,
  easing:(x:number)=>number=DEFAULT_EASING_TYPE_ANIMATION,
):AnimationTrack{
  const start={...transform.localRotation};

  const delta=quatFromZRotation(rotation);
  const target=quatMultiply(start, delta);

  return {
    elapsed:0,
    duration,
    onUpdate(alpha:number){
      const t=easing(alpha);
      const q=slerp(start,target,t);

      transform.localRotation.x=q.x;
      transform.localRotation.y=q.y;
      transform.localRotation.z=q.z;
      transform.localRotation.w=q.w;
    }
  };
}
