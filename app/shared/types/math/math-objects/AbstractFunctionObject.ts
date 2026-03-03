import { MathObject, type MathObjectType } from '~/shared/types/math/math-objects/bases';

export abstract class AbstractFunctionObject extends MathObject{
  public readonly type:MathObjectType='function';
  public domain:Interval;
  public samples:number;

  protected m_points:Point[]=[];
  protected m_isDirty=true;

  constructor(
    id:number,
    domain:Interval,
    samples:number,
  ) {
    super(id);
    this.domain=domain;
    this.samples=samples;
    this.updatePoints();
  }
  public get points():Point[]{
    if(this.m_isDirty){
      this.updatePoints();
      this.m_isDirty=false;
    }

    return this.m_points;
  }
  public updatePoints(){
    const [x0,x1]=this.domain;
    const step=(x1-x0)/this.samples;
    const newPoints=[];
    for(let i=0;i<=this.samples;i++){
      const x=x0+i*step;
      newPoints.push({x,y:this.evaluate(x)});
    }
    this.m_points=newPoints;
  }
  public abstract evaluate:MathFunction;
}
