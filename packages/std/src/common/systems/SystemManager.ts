import type { ISystem,World } from '@adriytkr/engine';

export class SystemManager{
  private m_systems:ISystem[]=[];

  public add(system:ISystem):void{
    this.m_systems.push(system);
  }

  public update(world:World,delta:number):void{
    for(const system of this.m_systems){
      system.update(world,delta);
    }
  }
}
