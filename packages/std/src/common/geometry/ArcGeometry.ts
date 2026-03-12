import type { Geometry } from "./Geometry";

export class ArcGeometry implements Geometry{
  public constructor(
    public radius:number,
    public startAngle:number,
    public endAngle:number,
  ){}
}
