import { Component } from '@adriytkr/engine';

import * as d3 from 'd3';

export class Camera2D extends Component{
  public xScale = d3.scaleLinear();
  public yScale = d3.scaleLinear();

  constructor(
    public zoom: number = 1,
    public width: number = 800,
    public height: number = 600
  ) {
    super();
    this.updateScales(0, 0);
  }

  public updateScales(camX: number, camY: number) {
    const halfW = (this.width / 2) / this.zoom;
    const halfH = (this.height / 2) / this.zoom;

    this.xScale.domain([camX - halfW, camX + halfW]).range([0, this.width]);
    this.yScale.domain([camY + halfH, camY - halfH]).range([0, this.height]); 
  }
} 
