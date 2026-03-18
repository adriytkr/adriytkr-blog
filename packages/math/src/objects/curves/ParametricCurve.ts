import { GameObject } from '../../GameObject';
import type { IVector3 } from '../../types';

export interface ParametricCurveOptions{}

export abstract class ParametricCurve extends GameObject{
  public abstract getPoint(t:number):IVector3;
}
