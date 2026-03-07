import type { World,ISystem } from '@adriytkr/engine';

export class PhysicsSystem implements ISystem{
  public constructor(public gravity:number){}

  update(world:World,delta:number):void{
    const entities=world.query(Position,Velocity);

    for(const entity of entities){
      const position=world.getComponent(entity,Position)!;
      const velocity=world.getComponent(entity,Velocity)!;

      velocity.y+=this.gravity*delta;
      position.x+=velocity.x*delta;
      position.y+=velocity.y*delta;
    }
  }
}
