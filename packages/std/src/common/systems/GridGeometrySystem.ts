import type { ISystem, World } from '@adriytkr/engine';
import { Transform } from '../components';
import { GridObject } from '../objects';
import { PolylineGeometry } from '../geometry';
import type { Point } from '../../types';

export class GridGeometrySystem implements ISystem{
  public update(world:World,delta:number):void{
    for(const entity of world.query(Transform,GridObject)){
      const grid=world.getComponent(entity,GridObject)!;
      const transform=world.getComponent(entity,Transform)!;

      for(let x=-gridSize; x<=gridSize; x+=step){
        renderable.addDrawCommand({
          type:'polyline',
          points:[
            {x,y:-gridSize,z:0},
            {x,y:gridSize,z:0},
          ],
          style:{
            color:style.color,
          },
        });
      }

      for(let y=-gridSize;y<=gridSize;y+=step){
        renderable.addDrawCommand({
          type:'polyline',
          points:[
            {x:-gridSize,y,z:0},
            {x:gridSize,y,z:0},
          ],
          style:{
            color:style.color,
          },
        });
      }

      renderable.opacity=0.5;
      world.addComponent(grid,renderable);
    }
  }
}

