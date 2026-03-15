export type Point={
  x:number,
  y:number,
  z:number,
};

export type PolylineTopology={
  type:'polyline',
  points:Point[],
};

export type ArcTopology={
  type:'arc',
  center:Point,
  radius:number,
  startAngle:number,
  endAngle:number,
};

export type GeometryType=PolylineTopology|ArcTopology;
