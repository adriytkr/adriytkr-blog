import { Component } from '@adriytkr/engine';
import type { GeometryType } from '../../types';

export interface GeometryBufferOptions{
  buffer:GeometryType[];
};

export class GeometryBuffer extends Component{
  public buffer:GeometryType[];

  public constructor(options:GeometryBufferOptions){
    super();
    this.buffer=options.buffer;
  }
}
