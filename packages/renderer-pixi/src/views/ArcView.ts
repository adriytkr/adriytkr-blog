import type { Arc } from '@adriytkr/math';
import { View } from '../View';

export class ArcView extends View{
  private m_model:Arc;

  public constructor(model:Arc){
    super();
    this.m_model=model;
  }

  public override init():void{
    this.mark(this.m_model.position.x$.subscribe(x=>this.graphics.x=x));
    this.mark(this.m_model.position.y$.subscribe(y=>this.graphics.y=y));
  }

  public override redraw():void{
    const g=this.graphics;
    const m=this.m_model;

    g.clear();

    g.x=m.position.x$.value;
    g.y=m.position.y$.value;

    g.setStrokeStyle({
      color:m.style.stroke$.value,
      width:m.style.strokeWidth$.value,
    });

    g.setFillStyle({
      color:m.style.fill$.value,
    });

    g.moveTo(0,0);
    g.arc(
      0,
      0,
      m.radius$.value,
      m.startAngle$.value,
      m.endAngle$.value*(m.clockwise$.value?1:-1),
      !m.clockwise$.value,
    );
    g.fill();

    g.arc(
      0,
      0,
      m.radius$.value,
      m.startAngle$.value,
      m.endAngle$.value*(m.clockwise$.value?1:-1),
      !m.clockwise$.value,
    );
    g.stroke();
  }
}
