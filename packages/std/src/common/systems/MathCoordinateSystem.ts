import { Transform,MathPosition,MathCanvas } from '@adriytkr/engine/components';
import type { ISystem } from '@adriytkr/engine';

export class MathCoordinateSystem implements ISystem{
  public update(world:World,delta:number):void{
    const entities=world.query(MathPosition,Transform);

    for(const entity of entities){
      const mathPosition=world.getComponent(entity,MathPosition)!;
      const transform=world.getComponent(entity,Transform)!;

      const canvas=world.getComponent(mathPosition.canvasEntity,MathCanvas)!;

      transform.x=canvas.origin.x+(mathPosition.x*canvas.unitSize);
      transform.y=canvas.origin.y+(mathPosition.y*canvas.unitSize);
    }
  }
}
