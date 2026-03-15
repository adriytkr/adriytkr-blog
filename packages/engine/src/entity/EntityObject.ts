import type { ComponentType } from "../component";
import type { World } from "../world";
import type { Entity } from "./Entity";

export class EntityObject{
  public constructor(
    public entity:Entity,
    private world:World
  ){}

  public getComponent<T extends Component>(type:ComponentType<T>):T|undefined{
    return this.world!.getComponent(this.entity!,type)!;
  }

  public addOrRetrieveComponent<T extends Component>(component:T){
    return this.world!.addOrRetrieveComponent(this.entity!,component);
  }

  public removeComponent<T extends Component>(type:ComponentType<T>){
    return this.world!.removeComponent(this.entity!,type);
  }
}

