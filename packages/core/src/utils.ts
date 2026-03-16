import { vec3, quat } from 'gl-matrix';

export function quatToEuler(q:quat):vec3{
  const x=q[0];
  const y=q[1];
  const z=q[2];
  const w=q[3];

  const sinr_cosp=2*(w*x+y*z);
  const cosr_cosp=1-2*(x**2+y**2);
  const roll=Math.atan2(sinr_cosp,cosr_cosp);

  const sinp=2*(w*y-z*x);
  let pitch;
  if(Math.abs(sinp)>=1)
    pitch=Math.sign(sinp)*Math.PI/2;
  else
    pitch=Math.asin(sinp);

  const siny_cosp=2*(w*z+x*y);
  const cosy_cosp=1-2*(y*y+z*z);
  const yaw=Math.atan2(siny_cosp,cosy_cosp);

  return vec3.fromValues(roll,pitch,yaw);
}
