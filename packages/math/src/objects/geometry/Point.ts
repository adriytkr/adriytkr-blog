import { GameObject } from '../../GameObject';
import { ClosedStyle } from '../../utils';

export class Point extends GameObject{
  public style:ClosedStyle;

  public constructor(color:string){
    super();
    this.style=new ClosedStyle(color,1,color);
  }
}
