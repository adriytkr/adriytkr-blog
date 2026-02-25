export type Point={
  x:number;
  y:number;
};

export type PointSeries={
  data:Point[];
  color:string;
};

export type FunctionSeries={
  func:(x:number)=>number;
  samples:number;
  domain:[number,number];
  color?:string;
};

export type TheRange=[number,number,number];
