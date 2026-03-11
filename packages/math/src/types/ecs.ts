import type { Entity } from '@adriytkr/engine';
import type { Transform,Renderable } from '@adriytkr/std';

export interface WorldObject{
  entity:Entity;
  transform:Transform,
  renderable:Renderable,
}
