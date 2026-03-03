import type { MathObject, SegmentObject } from '~/shared/types/math/math-objects/bases';

export interface AnimationOptions{
  duration:number;
};

export type GeneralAnimation=(object:MathObject,options?:AnimationOptions)=>LazyAnimation;
export type SegmentAnimation=(object:SegmentObject,options?:AnimationOptions)=>LazyAnimation;
export type LazyAnimation=()=>Promise<void>;

export type Animations={
  fadeIn:GeneralAnimation;
  growVector:SegmentAnimation;
  fadeOut:GeneralAnimation;
  ungrowVector:SegmentAnimation;
  moveTo:(object:MathObject,target:Point,options?:AnimationOptions)=>LazyAnimation;
  shift:(object:MathObject,delta:Point,options?:AnimationOptions)=>LazyAnimation;
  applyMatrix:(object:MathObject,matrix:Matrix2x2,options?:AnimationOptions)=>LazyAnimation;
  parameterChange:(
    name:string,
    startValue:number,
    endValue:number,
    theFunc:(t:number)=>void,
    options?:AnimationOptions,
  )=>LazyAnimation;
};

export interface GraphAPI{
  add:(object:MathObject)=>void;
  remove:(object:MathObject)=>void;
  clear:()=>void;
  play:(...animations:LazyAnimation[])=>Promise<void>;
  addAxes:()=>void;
  requestUpdate:()=>void;
  animate:Animations,
};
