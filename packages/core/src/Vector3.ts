import { Signal } from './Signal';

export class Vector3{
  public x:Signal<number>;
  public y:Signal<number>;
  public z:Signal<number>;

  public constructor(x:number=0,y:number=0,z:number=0){
    this.x=new Signal(x);
    this.y=new Signal(y);
    this.z=new Signal(z);
  }

  public set(x:number,y:number,z:number):void{
    this.x.value=x;
    this.y.value=y;
    this.z.value=z;
  }

  public add(dx:number,dy:number,dz:number):void{
    this.x.value+=dx;
    this.y.value+=dy;
    this.z.value+=dz;
  }

  public multiply(sx:number,sy:number,sz:number):void{
    this.x.value*=sx;
    this.y.value*=sy;
    this.z.value*=sz;
  }

  public clone():Vector3{
    return new Vector3(this.x.value,this.y.value,this.z.value);
  }

  public toArray():[number,number,number]{
    return [this.x.value,this.y.value,this.z.value];
  }
}
