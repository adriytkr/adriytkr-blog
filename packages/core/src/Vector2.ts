import { Signal } from './Signal';

export class Vector2{
  public x:Signal<number>;
  public y:Signal<number>;

  public constructor(x:number=0,y:number=0){
    this.x=new Signal(x);
    this.y=new Signal(y);
  }
  
  public set(x:number,y:number):void{
    this.x.value=x;
    this.y.value=y;
  }

  public add(dx:number,dy:number):void{
    this.x.value+=dx;
    this.y.value+=dy;
  }

  public multiply(sx:number,sy:number):void{
    this.x.value*=sx;
    this.y.value*=sy;
  }

  public clone():Vector2{
    return new Vector2(this.x.value,this.y.value);
  }

  public toArray():[number,number]{
    return [this.x.value,this.y.value];
  }
}
