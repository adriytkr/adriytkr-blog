import { SegmentObject, type MathObjectType } from '~/shared/types/math/math-objects/bases';

export class LineSegmentObject extends SegmentObject{
  public readonly type:MathObjectType='line';
  constructor(id:number,from:Point,to:Point){
    super(id,from,to);
  }
}
