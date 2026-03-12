import type { ISystem, World } from '@adriytkr/engine';
import { PolygonObject } from '../objects';
import { Transform } from '../components';
import { PolygonGeometry } from '../geometry';

export class PolygonSystem implements ISystem{
  public update(world:World,delta:number){
    for(const entity of world.query(Transform,PolygonObject)){
      const polygon=world.getComponent(entity,PolygonObject)!;

      world.addComponent(entity,new PolygonGeometry(polygon.vertices));
    }
  }
}
