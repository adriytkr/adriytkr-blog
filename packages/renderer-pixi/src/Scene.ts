import * as PIXI from 'pixi.js';

import type { Constructor } from './types';
import { View } from './View';
import { GameObject } from '@adriytkr/math';

export class Scene{
  private m_app:PIXI.Application;
  private m_registry=new Map<Constructor<GameObject>,Constructor<View>>();
  private m_activePairs=new Map<GameObject,View>(); 

  public constructor(app:PIXI.Application){
    this.m_app=app;
  }

  public register<G extends GameObject,V extends View>(
    gameClass:Constructor<G>,
    viewClass:Constructor<V>,
  ):void{
    this.m_registry.set(gameClass,viewClass);
  }

  private getViewConstructor(gameClass:any):Constructor<View>|null{
    if(this.m_registry.has(gameClass))
      return this.m_registry.get(gameClass)!;

    const parentClass=Object.getPrototypeOf(gameClass);
    if(parentClass&&parentClass!==Object)
      return this.getViewConstructor(parentClass);

    return null;
  }

  public add(gameObject:GameObject){
    if(this.m_activePairs.has(gameObject)){
      console.warn('Object already exists on the scene');
      return;
    }

    const ViewClass=this.getViewConstructor(gameObject.constructor);

    if(ViewClass===null)
      throw Error(`No View registered for ${gameObject.constructor.name} or its parent`);

    const view=new ViewClass(gameObject);
    view.init();
    view.redraw();
    this.m_activePairs.set(gameObject,view);
    this.m_app.stage.addChild(view.graphics);
  }

  public remove(gameObject:GameObject):void{
    const view=this.m_activePairs.get(gameObject);

    if(view!==undefined){
      view.destroy();
      this.m_activePairs.delete(gameObject);
    }
  }
}
