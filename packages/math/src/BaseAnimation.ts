export abstract class BaseAnimation{
  public elapsed:number=0;
  public duration:number;

  public constructor(duration:number){
    this.duration=duration;
  }

  public setup():void{}
  public abstract update(alpha:number):void;
  public resolve():void{}
}
