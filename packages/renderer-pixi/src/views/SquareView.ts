import { View } from '../View';
import { Square } from '@adriytkr/math';

export class SquareView extends View{
  private m_model:Square;

  public constructor(model:Square){
    super();
    this.m_model=model;
  }

  public init():void{
    this.unsubscribers.push(this.m_model.side$.subscribe(this.redraw));
    this.unsubscribers.push(this.m_model.style.fill$.subscribe((c)=>this.graphics.tint=c));
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
}
