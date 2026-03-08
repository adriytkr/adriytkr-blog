import type { World,ISystem } from '@adriytkr/engine';
import { Transform } from '../components/Transform';
import { Velocity } from '../components/Velocity';
import { Acceleration } from '../components/Acceleration';

export class PhysicsSystem implements ISystem{
  update(world:World,delta:number):void{
    const entitiesA=world.query(Velocity,Acceleration);

    for(const entity of entitiesA){
      const velocity=world.getComponent(entity,Velocity)!;
      const acceleration=world.getComponent(entity,Acceleration)!;

      velocity.x+=(acceleration.x)*delta;
      velocity.y+=(acceleration.y)*delta;
      velocity.z+=(acceleration.z)*delta;
    }

    const entitiesB=world.query(Transform,Velocity);

    for(const entity of entitiesB){
      const transform=world.getComponent(entity,Transform)!;
      const velocity=world.getComponent(entity,Velocity)!;

      transform.localPosition.x+=(velocity.x)*delta;
      transform.localPosition.y+=(velocity.y)*delta;
      transform.localPosition.z+=(velocity.z)*delta;
    }
  }
}
