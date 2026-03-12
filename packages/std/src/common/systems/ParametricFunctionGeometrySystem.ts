import type { ISystem, World } from '@adriytkr/engine';
import { Transform } from '../components';
import { FunctionObject, ParametricFunctionObject } from '../objects';
import { PolylineGeometry } from '../geometry';
import type { Point } from '../../types';

export class ParametricFunctionGeometrySystem implements ISystem{
  public update(world:World,delta:number):void{
    for(const entity of world.query(Transform,ParametricFunctionObject)){
      const transform=world.getComponent(entity,Transform)!;
      const func=world.getComponent(entity,ParametricFunctionObject)!;

      const points:Point[]=[];
      const dt=(func.tDomain[1]-func.tDomain[0])/func.samples;
      for(let t=func.tDomain[0];t<=func.tDomain[1];t+=dt){
        points.push({x:func.x(t),y:func.y(t),z:0});
      }

      world.addComponent(entity,new PolylineGeometry(points));
    }
  }
}

