import * as PIXI from 'pixi.js';

export abstract class View{
  public graphics=new PIXI.Graphics();
  protected unsubscribers:(()=>void)[]=[];

  public abstract init():void;
  public abstract redraw():void;
  public destroy():void{
    this.unsubscribers.forEach(unsub=>unsub());
    this.unsubscribers.length=0;
    this.graphics.destroy({children:true,texture:true});
  }

  public mark(fn:()=>void):void{
    this.unsubscribers.push(fn);
  }
}
