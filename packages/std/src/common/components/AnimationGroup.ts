import { Component } from '@adriytkr/engine';
import type { updateAnimation } from '../animations/types';

export type AnimationTrack={
  duration:number;
  elapsed:number;
  onUpdate:updateAnimation,
};

export class AnimationGroup extends Component{
  public tracks:AnimationTrack[]=[];

  public constructor(){
    super();
  }

  public addTrack(track:AnimationTrack):void{
    this.tracks.push(track);
  }
}
