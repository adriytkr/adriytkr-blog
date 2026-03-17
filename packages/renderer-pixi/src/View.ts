import * as PIXI from 'pixi.js';

export abstract class View{
  public graphics=new PIXI.Graphics();

  public abstract init():void;
  public abstract redraw():void;
  public abstract destroy():void;
}
