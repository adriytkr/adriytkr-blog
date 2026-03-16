import { Signal } from './Signal';

export class Vector4{
  public x:Signal<number>;
  public y:Signal<number>;
  public z:Signal<number>;
  public w:Signal<number>;

  public constructor(x:number=0,y:number=0,z:number=0,w:number=0){
    this.x=new Signal(x);
    this.y=new Signal(y);
    this.z=new Signal(z);
    this.w=new Signal(w);
  }

  public set(x:number,y:number,z:number,w:number):void{
    this.x.value=x;
    this.y.value=y;
    this.z.value=z;
    this.w.value=w;
  }

  public add(dx:number,dy:number,dz:number,dw:number):void{
    this.x.value+=dx;
    this.y.value+=dy;
    this.z.value+=dz;
    this.w.value+=dw;
  }

  public multiply(sx:number,sy:number,sz:number,sw:number):void{
    this.x.value*=sx;
    this.y.value*=sy;
    this.z.value*=sz;
    this.w.value*=sw;
  }

  public clone():Vector4{
    return new Vector4(this.x.value,this.y.value,this.z.value,this.w.value);
  }

  public toArray():[number,number,number,number]{
    return [this.x.value,this.y.value,this.z.value,this.w.value];
  }
}
