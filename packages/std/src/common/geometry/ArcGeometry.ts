import type { Geometry } from './Geometry';

import type { ArcConfig,ArcStyle } from './ArcStyle';

export const DEFAULT_ARC_STYLE:ArcStyle={
  stroke:'red',
  strokeWidth:1,
  fill:'white',
};

export class ArcGeometry implements Geometry{
  public constructor(
    public config:ArcConfig,
    public style:ArcStyle=DEFAULT_ARC_STYLE,
  ){}
}
