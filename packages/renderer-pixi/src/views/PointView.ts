import { View } from '../View';
import { IVector3 } from '@adriytkr/math';

export class PointView extends View{
  private m_model:IVector3;
  private unsubscribers:(()=>void)[]=[];

  public constructor(model:IVector3){
    super();
    this.m_model=model;
  }

  public init():void{
    this.unsubscribers.push(this.m_model.style.fill$.subscribe((c)=>this.graphics.tint=c));
    this.unsubscribers.push(this.m_model.position.x$.subscribe((newX)=>this.graphics.x=newX));
    this.unsubscribers.push(this.m_model.position.y$.subscribe((newY)=>this.graphics.y=newY));
  }

  public redraw():void{
    this.graphics.clear();
    this.graphics.setFillStyle({
      color:this.m_model.style.fill$.value,
    });

    this.graphics.setStrokeStyle({
      color:this.m_model.style.stroke$.value,
      width:this.m_model.style.strokeWidth$.value,
    });

    this.graphics.circle(
      0,
      0,
      2,
    );
    this.graphics.fill();
  }

  public destroy():void{
    this.unsubscribers.forEach(unsub=>unsub());
    this.unsubscribers.length=0;
    this.graphics.destroy({children:true,texture:true});
  }
}

