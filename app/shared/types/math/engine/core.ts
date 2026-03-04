type d3Selection=d3.Selection<SVGGElement,unknown,null,undefined>
export type GraphComponents={
  root?:d3Selection;
  vectors?:d3Selection;
  functions?:d3Selection;
};

export interface RenderContext{
  xScale:d3.ScaleLinear<number,number>;
  yScale:d3.ScaleLinear<number,number>;
  activeCamera:CameraObject;
  getObjectStyle:GetObjectStyle;
};
