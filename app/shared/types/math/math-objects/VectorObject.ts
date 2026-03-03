import { SegmentObject, type MathObjectType } from '~/shared/types/math/math-objects/bases';

export class VectorObject extends SegmentObject{
  public readonly type:MathObjectType='vector';
  constructor(id:number,from:Point,to:Point){
    super(id,from,to);
  }
};
