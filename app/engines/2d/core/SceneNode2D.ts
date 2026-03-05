import { SceneNode } from '@engines/shared/core/SceneNode';
import type { RenderContext2D } from './core';

export class SceneNode2D<TData,TStyle>
  extends SceneNode<TData,TStyle,d3.Selection<SVGGElement,any,any,any>,RenderContext2D>
{}
