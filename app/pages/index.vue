<script setup lang="ts">
import { SystemManager, World } from '@adriytkr/engine';
import type { EntityObject } from '@adriytkr/engine';

import { Camera2D } from '@adriytkr/std/2d/index';

import {
  AnimationSystem,
  TransformSystem,
  GeometryBuffer,
  Hierarchy,
  Transform,
  VectorData,
} from '@adriytkr/std';

import { PixiRendererSystem } from '@adriytkr/pixi-renderer-2d';

import * as PIXI from 'pixi.js';

const canvasRef=ref<HTMLCanvasElement|null>(null);

let camera:EntityObject;

// on mount
onMounted(async()=>{
  if(!canvasRef.value)return;

  const canvas=canvasRef.value;
  canvas.width=canvas.clientWidth;
  canvas.height=canvas.clientHeight;

  const world=new World();
  const systemManager=new SystemManager();

  systemManager.add(new AnimationSystem());
  systemManager.add(new TransformSystem());

  const renderer=await PIXI.autoDetectRenderer({
    canvas,
    width:canvas.width,
    height:canvas.height,
  });
  const stage=new PIXI.Container();
  systemManager.add(new PixiRendererSystem(stage,renderer));

  // camera
  camera=world.createEntity();
  camera.addOrRetrieveComponent(
    new Camera2D({
      x:0,
      y:0,
      zoom:50,
      width:canvas.width,
      height:canvas.height,
    }),
  );

  // vector
  const vector=world.createEntity();
  vector.addOrRetrieveComponent(
    new VectorData({
      to:{x:1,y:1,z:1},
    }),
  );
  vector.addOrRetrieveComponent(new Hierarchy());
  vector.addOrRetrieveComponent(new Transform());
  vector.addOrRetrieveComponent(
    new GeometryBuffer({
      buffer:[
        {
          type:'polyline',
          points:[
            {x:0,y:0,z:0},
            {x:1,y:1,z:0},
            {x:2,y:-3,z:0},
          ],
        },
        {
          type:'arc',
        },
      ],
    }),
  );

  // loop
  let lastTime=performance.now();
  function loop(time:number){
    const delta=(time-lastTime)/1000;
    lastTime=time;
    systemManager.update(world,delta);
    renderer.render(stage);
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  // events
  canvas.addEventListener('wheel',handleMouseScroll);
  canvas.addEventListener('mousedown',handleMouseDown);
  canvas.addEventListener('mouseup',handleMouseUp);
  canvas.addEventListener('mousemove',handleMouseMove);
});

let isDragging=false;
let lastMouse={x:0,y:0};

function handleMouseScroll(e:WheelEvent){
  e.preventDefault();
  const zoomFactor=1.1;

  const cameraComponent=camera.getComponent(Camera2D);
  if(cameraComponent===undefined)return;

  if(e.deltaY<0)cameraComponent.zoom*=zoomFactor;
  else cameraComponent.zoom/=zoomFactor;
}

function handleMouseDown(e:MouseEvent){
  isDragging=true;
  lastMouse={x:e.clientX,y:e.clientY};
}

function handleMouseUp(){
  isDragging=false
}

function handleMouseMove(e:MouseEvent){
  if(!isDragging)return;

  const cameraComponent=camera.getComponent(Camera2D);
  if(cameraComponent===undefined)return;

  const dx=(e.clientX-lastMouse.x)/cameraComponent.zoom;
  const dy=(e.clientY-lastMouse.y)/cameraComponent.zoom;
  cameraComponent.x-=dx;
  cameraComponent.y-=dy;
  lastMouse={x:e.clientX,y:e.clientY};
}

// dispose
onUnmounted(()=>{
  if(!canvasRef.value)return;

  const canvas=canvasRef.value;

  canvas.removeEventListener('wheel',handleMouseScroll);
  canvas.removeEventListener('mousedown',handleMouseDown);
  canvas.removeEventListener('mouseup',handleMouseUp);
  canvas.removeEventListener('mousemove',handleMouseMove);
});
</script>

<template>
  <h1>Hello, World!</h1>
  <canvas ref="canvasRef"></canvas>
</template>

<style scoped>
canvas{
  width:100%;
  height:500px;
  border:1px solid black;
  display:block;
}
</style>
