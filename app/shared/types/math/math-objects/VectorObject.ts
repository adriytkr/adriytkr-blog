import { SegmentObject, type MathObjectType } from '~/shared/types/math/math-objects/bases';

export class VectorObject extends SegmentObject implements Shiftable{
  public readonly type:MathObjectType='vector';
  constructor(id:number,from:Point,to:Point){
    super(id,from,to);
  }
  public shift(delta:Point){
    this.from={
      x:this.from.x+delta.x,
      y:this.from.y+delta.y,
    };
    this.to={
      x:this.to.x+delta.x,
      y:this.to.y+delta.y,
    };
  }
};
