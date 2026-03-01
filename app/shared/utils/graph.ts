export const generatePoints=(func:MathFunction):Point[]=>{
  const [minX,maxX]=func.domain;
  const xStep=(maxX-minX)/func.samples;
  const points:Point[]=Array.from(
    {length:func.samples+1},
    (_,i)=>{
      const x=minX+i*xStep;
      return{x,y:func.func(x)};
    },
  )

  return points;
};

export const isNumberInInterval=(n:number,interval:Interval):boolean=>
  interval[0]<=n&&n<=interval[1];
