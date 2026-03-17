import { Signal } from './Signal';

export class Derive<T> extends Signal<T>{
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
        if(this.m_isDirty)return;

        this.m_isDirty=true;
        this.notifySubscribers();
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
