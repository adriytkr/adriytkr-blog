import type { ISystem, World } from '@adriytkr/engine';
import { Transform } from '../components';
import { FunctionObject } from '../objects';
import { PolylineGeometry } from '../geometry';
import type { Point } from '../../types';

export class FunctionGeometrySystem implements ISystem{
  public update(world:World,delta:number):void{
    for(const entity of world.query(Transform,FunctionObject)){
      const transform=world.getComponent(entity,Transform)!;
      const func=world.getComponent(entity,FunctionObject)!;

      const points:Point[]=[];
      const dx=(func.domain[1]-func.domain[0])/func.samples;
      for(let x=func.domain[0];x<=func.domain[1];x+=dx){
        points.push({x,y:func.fn(x),z:0});
      }

      world.addComponent(entity,new PolylineGeometry(points));
    }
  }
}
