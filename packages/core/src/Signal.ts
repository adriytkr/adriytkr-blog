import type { Subscriber } from './types';

export class Signal<T>{
  private m_subscribers?:Set<Subscriber<T>>;
  private m_isNotifying=false;

  public constructor(protected m_value:T){}

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

  // Observer Pattern
  public subscribe(fn:Subscriber<T>):()=>void{
    if(this.m_subscribers===undefined)this.m_subscribers=new Set();
    this.m_subscribers.add(fn);

    return ()=>this.unsubscribe(fn);
  }

  public unsubscribe(fn:Subscriber<T>):void{
    this.m_subscribers?.delete(fn);
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
