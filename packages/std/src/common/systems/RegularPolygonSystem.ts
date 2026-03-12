import type { ISystem, World } from '@adriytkr/engine';
import { RegularPolygonObject } from '../objects';
import { Transform } from '../components';
import type { Point } from '../../types';
import { PolygonGeometry } from '../geometry';

export class RegularPolygonSystem implements ISystem{
  public update(world:World,delta:number):void{
    for(const entity of world.query(Transform,RegularPolygonObject)){
      const geometry=world.getComponent(entity,RegularPolygonObject)!;
      const vertices:Point[]=[];

      const radius=geometry.sidelength/(2*Math.sin(Math.PI/geometry.sides));

      const step=2*Math.PI/geometry.sides;
      const offsetAngle=geometry.offsetAngle===undefined?((geometry.sides%2===0)?step/2:Math.PI/2):geometry.offsetAngle;

      for(let i=0;i<geometry.sides;i++){
        const angle=i*step+offsetAngle;

        vertices.push({
          x:radius*Math.cos(angle),
          y:radius*Math.sin(angle),
          z:0,
        });
      }

      world.addComponent(entity,new PolygonGeometry(vertices));
    }
  }
}
