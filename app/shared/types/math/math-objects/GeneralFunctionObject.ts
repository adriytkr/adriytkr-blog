import {AbstractFunctionObject} from '~/shared/types/math/math-objects/AbstractFunctionObject';

export class GeneralFunctionObject extends AbstractFunctionObject{
  private m_f:MathFunction;
  constructor(id:number,f:MathFunction,domain:Interval,samples:number){
    super(id,domain,samples);
    this.m_f=f;
  }
  public setFunction(f:MathFunction){
    this.m_f=f;
    this.m_isDirty=true;
  }
  public override evaluate=(x:number)=>this.m_f(x);
}
