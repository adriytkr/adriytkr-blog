<script setup lang="ts">
import * as PIXI from 'pixi.js';

const canvasRef=ref<HTMLCanvasElement|null>(null);

type Subscriber<T>=(val:T)=>void;

class Signal<T>{
  private m_subscribers?:Set<Subscriber<T>>;
  private m_isNotifying=false;

  public constructor(protected m_value:T){}

  public subscribe(fn:Subscriber<T>):()=>void{
    if(this.m_subscribers===undefined)this.m_subscribers=new Set();
    this.m_subscribers.add(fn);

    return ()=>this.unsubscribe(fn);
  }

  public unsubscribe(fn:Subscriber<T>):void{
    this.m_subscribers?.delete(fn);
  }

  public get value():T{
    return this.m_value;
  }

  public set value(val:T){
    this.set(val);
  }

  protected set(value:T):void{
    if(this.m_value===value)return;

    this.m_value=value;
    this.notifySubscribers();
  }

  public notifySubscribers(){
    if(this.m_isNotifying)
      throw new Error("Circular Dependency Detected: A loop was found in the signal graph.");

    this.m_isNotifying=true;
    try{
      this.m_subscribers?.forEach(fn=>fn(this.value));
    }finally{
      this.m_isNotifying=false;
    }
  }
}

class Computed<T> extends Signal<T>{
  private m_formula:()=>T;
  private m_isDirty=true;

  constructor(
    formula:()=>T,
    dependencies:Signal<any>[],
  ){
    super(undefined as any);
    this.m_formula=formula;

    dependencies.forEach(dep=>{
      dep.subscribe(()=>{
        if(!this.m_isDirty){
          this.m_isDirty=true;
          this.notifySubscribers();
        }
      });
    });
  }

  public override get value():T{
    if(this.m_isDirty){
      this.m_value=this.m_formula();
      this.m_isDirty=false;
    }

    return this.m_value;
  }

  public override set value(val:T){
    throw Error('Cannot change value of computed');
  }
}

abstract class GameObject{
  public zIndex$=new Signal(0);
  public position=new Vector2(0,0);
}

class Vector2{
  public x$=new Signal(0);
  public y$=new Signal(0);

  public constructor(x:number,y:number){
    this.x$.value=x;
    this.y$.value=y;
  }
}

class Square extends GameObject{
  public side$=new Signal(0);
  public color$=new Signal('');

  public constructor(side:number,color:string){
    super();
    this.side$.value=side;
    this.color$.value=color;
  }
}

abstract class View{
  public graphics=new PIXI.Graphics();

  public abstract init():void;
  public abstract redraw():void;
  public abstract destroy():void;
}

class SquareView extends View{
  private m_model:Square;
  private unsubscribers:(()=>void)[]=[];

  public constructor(model:Square){
    super();
    this.m_model=model;
  }

  public init():void{
    this.unsubscribers.push(this.m_model.side$.subscribe(this.redraw));
    this.unsubscribers.push(this.m_model.color$.subscribe((c)=>this.graphics.tint=c));
    this.unsubscribers.push(this.m_model.position.x$.subscribe((newX)=>this.graphics.x=newX));
    this.unsubscribers.push(this.m_model.position.y$.subscribe((newY)=>this.graphics.y=newY));
  }

  public redraw():void{
    this.graphics.clear();
    this.graphics.rect(
      0,
      0,
      this.m_model.side$.value,
      this.m_model.side$.value,
    );
    this.graphics.fill();
  }

  public destroy():void{
    this.unsubscribers.forEach(unsub=>unsub());
    this.unsubscribers.length=0;
    this.graphics.destroy({children:true,texture:true});
  }
}

type Constructor<T>=new(...args:any[])=>T;

class Scene{
  private m_app:PIXI.Application;
  private m_registry = new Map<Constructor<GameObject>,Constructor<View>>();
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

let scene:Scene;
const square=new Square(100,'red');

onMounted(async()=>{
  if(canvasRef.value===null)return;

  canvasRef.value.width=canvasRef.value.clientWidth;
  canvasRef.value.height=canvasRef.value.clientHeight;

  const app=new PIXI.Application();

  await app.init({
    canvas:canvasRef.value,
    width:canvasRef.value.width,
    height:canvasRef.value.height,
    autoStart:false,
  });

  scene=new Scene(app);
  scene.register(Square,SquareView);

  scene.add(square);

  app.start();
  app.ticker.add((ticker)=>{
    const delta=ticker.deltaTime;

    square.position.x$.value+=10*delta;
    app.render();
  });
});

function remove():void{
  scene.remove(square);
}
</script>

<template>
  <h1>Hello, World!</h1>
  <canvas ref="canvasRef"></canvas>
  <button @click="remove">Remove</button>
</template>

<style scoped>
canvas{
  width:100%;
  height:500px;
  border:1px solid black;
  display:block;
}
</style>
