export type EasingFunction=(t:number)=>number;

export interface AnimationOptions{
  duration:number;
  easing:EasingFunction;
}
