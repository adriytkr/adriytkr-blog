import type { MathObject, SegmentObject } from '~/shared/types/math/math-objects/bases';

export interface ObjectStyle{
  opacity:number;
};

export interface AnimationOptions{
  duration:number;
};

export type Animation={
  duration:number;
  startTime: number;
  update:(alpha:number)=>void;
  resolve:()=>void;
};

export interface AnimationOptions{
  duration:number;
};

export type LazyAnimation=()=>Animation;
export type GeneralAnimation=(object:MathObject,options?:AnimationOptions)=>LazyAnimation;
export type ShiftableAnimation=(object:Shiftable,delta:Point,options?:AnimationOptions)=>LazyAnimation;
export type SegmentAnimation=(segment:SegmentObject,options?:AnimationOptions)=>LazyAnimation;

export interface Animations{
  fadeIn:GeneralAnimation;
  fadeOut:GeneralAnimation;
  shift:ShiftableAnimation;
};

export interface GraphAPI{
  add:(object:MathObject)=>void;
  remove:(object:MathObject)=>void;
  clear:()=>void;
  play:(...animations:LazyAnimation[])=>Promise<void[]>,
  animate:Animations,
};
