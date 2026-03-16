import { Signal } from './Signal';

export class Vector2{
  public x:Signal<number>;
  public y:Signal<number>;

  public constructor(x:number,y:number){
    this.x=new Signal(x);
    this.y=new Signal(y);
  }
}
