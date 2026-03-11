import type { World } from '../world/World';

export interface ISystem{
  update:(world:World,delta:number)=>void;
}
