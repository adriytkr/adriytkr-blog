import { Component } from '@adriytkr/engine';

import * as PIXI from 'pixi.js';

export class PixiRenderable extends Component{
  public constructor(
    public root:PIXI.Graphics,
  ){
    super();
  }
}
