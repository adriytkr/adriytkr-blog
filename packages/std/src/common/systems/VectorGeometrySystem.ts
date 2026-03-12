import type { ISystem, World } from '@adriytkr/engine';
import { Transform } from '../components';
import { PolygonGeometry, PolylineGeometry } from '../geometry';
import { VectorObject } from '../objects';

export class VectorGeometrySystem implements ISystem{
  public update(world:World,delta:number):void{
    for(const entity of world.query(Transform,VectorObject)){
      const vector=world.getComponent(entity,VectorObject)!;
      world.addComponent(entity,new PolylineGeometry({
        points:[{x:0,y:0,z:0},vector.to],
      }));

      const size=0.3;
      const dx=vector.to.x;
      const dy=vector.to.y;
      const length=Math.sqrt(dx**2+dy**2);
      const ux=dx/length;
      const uy=dy/length;
      const px=-uy*size;
      const py=ux*size;
      const base1={x:vector.to.x-ux*size+px,y:vector.to.y-uy*size+py,z:0};
      const base2={x:vector.to.x-ux*size-px,y:vector.to.y-uy*size-py,z:0};
      world.addComponent(entity,new PolygonGeometry({vertices:[vector.to,base1,base2]}));
    }
  }
}
