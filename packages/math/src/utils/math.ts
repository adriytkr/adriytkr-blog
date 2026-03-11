import type { Point } from '@adriytkr/std';

export function createRegularPolygonVertices(
  sides:number,
  radius:number,
  offset?:number,
){
  const vertices:Point[]=[];

  const step=2*Math.PI/sides;
  const offsetAngle=offset===undefined?((sides%2===0)?step/2:Math.PI/2):offset;

  for(let i=0;i<sides;i++){
    const angle=i*step+offsetAngle;

    vertices.push({
      x:radius*Math.cos(angle),
      y:radius*Math.sin(angle),
      z:0,
    });
  }

  return vertices;
}
