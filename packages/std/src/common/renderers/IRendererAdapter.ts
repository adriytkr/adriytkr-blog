import type { Camera2D } from "../../2d";
import type { Transform } from "../components";
import type { Geometry } from "../geometry";

export interface IRendererAdapter{
  draw(geometry:Geometry,transform:Transform,camera:Camera2D):void;
}
