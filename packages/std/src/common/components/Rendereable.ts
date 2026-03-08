import { Component } from '@adriytkr/engine';

import * as PIXI from 'pixi.js';

export class Renderable extends Component{
  public constructor(
    public container:PIXI.Container,
  ){
    super();
  }
}
