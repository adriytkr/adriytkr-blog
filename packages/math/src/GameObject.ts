import { Signal } from '@adriytkr/core';
import { Vector2 } from './utils/';

export abstract class GameObject{
  public zIndex$=new Signal(0);
  public position=new Vector2(0,0);
}
