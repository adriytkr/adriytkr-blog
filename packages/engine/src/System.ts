import type { World } from './World';

export interface ISystem{
  update:(world:World,delta:number)=>void;
}
