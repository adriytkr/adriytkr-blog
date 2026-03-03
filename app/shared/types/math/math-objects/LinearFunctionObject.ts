import {AbstractFunctionObject} from '~/shared/types/math/math-objects/AbstractFunctionObject';

export class LinearFunctionObject extends AbstractFunctionObject{
  private m_m:number;
  private m_b:number;
  constructor(id:number,m:number,b:number,domain:Interval,samples:number){
    super(id,domain,samples);
    this.m_m=m;
    this.m_b=b;
  }
  public setParameters(m:number,b:number){
    this.m_m=m;
    this.m_b=b;
    this.m_isDirty=true;
  }
  public override evaluate=(x:number):number=>
    this.m_b*x+this.m_b;
}
