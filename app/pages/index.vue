<script setup lang="ts">
import { World,SystemManager } from '@adriytkr/engine';
import type { Entity } from '@adriytkr/engine';

import { Camera2D } from '@adriytkr/std/2d/index';

import {
  AnimationGroup,
  AnimationSystem,
  Hierarchy,
  PolylineGeometry,
  Renderable,
  Transform,
  TransformSystem,
  create2DCamera,
  rotateAnimationTrack,
  shiftAnimationTrack,
  RendererSystem,
  FunctionObject,
  FunctionGeometrySystem,
  ParametricFunctionObject,
  ParametricFunctionGeometrySystem,
  PolygonGeometry,
  PolygonObject,
  PolygonSystem,
  RegularPolygonObject,
  RegularPolygonSystem,
  VectorGeometrySystem,
  VectorObject,
  ArcGeometry,
  GridObject,
  GridGeometrySystem,
} from '@adriytkr/std';

import {
  createGrid,
  createStandardAxes,
} from '@adriytkr/math';

import { PixiRendererAdapter } from '@adriytkr/pixi-renderer-2d';

import * as PIXI from 'pixi.js';

const canvasRef=ref<HTMLCanvasElement|null>(null);

let world:World;
let systemManager:SystemManager;
let camera:{
  entity:Entity,
  camera2D:Camera2D,
};

onMounted(async()=>{
  if(!canvasRef.value)return;

  const canvas=canvasRef.value;
  canvas.width=canvas.clientWidth;
  canvas.height=canvas.clientHeight;

  world=new World();
  systemManager=new SystemManager();

  systemManager.add(new AnimationSystem());
  systemManager.add(new TransformSystem());

  systemManager.add(new PolygonSystem());
  systemManager.add(new RegularPolygonSystem());
  systemManager.add(new FunctionGeometrySystem());
  systemManager.add(new VectorGeometrySystem());
  systemManager.add(new GridGeometrySystem());
  systemManager.add(new ParametricFunctionGeometrySystem());

  const renderer=await PIXI.autoDetectRenderer({
    canvas:canvasRef.value,
    width:canvas.width,
    height:canvas.height,
    resolution: window.devicePixelRatio,
    antialias:true,
    autoDensity:true,
  });

  const pixiAdapter=new PixiRendererAdapter(renderer);
  systemManager.add(new RendererSystem(pixiAdapter));

  camera=create2DCamera(
    world,
    {
      position:{x:0,y:0,z:0},
      zoom:50,
      size:{
        width:canvas.width,
        height:canvas.height,
      },
    },
  );

  const func=world.createEntity();
  world.addComponent(func,new FunctionObject(
    x=>x**2,
    200,
    [-3,3],
  ));
  world.addComponent(func,new Transform());
  world.addComponent(func,new Hierarchy());

  const func2=world.createEntity();
  world.addComponent(func2,new ParametricFunctionObject(
    t=>t**3,
    t=>t*2,
    [-3,3],
    200,
  ));
  world.addComponent(func2,new Transform());
  world.addComponent(func2,new Hierarchy());

  const square=world.createEntity();
  world.addComponent(square,new Transform());
  world.addComponent(square,new Hierarchy());
  world.addComponent(square,new RegularPolygonObject(6,1));

  const vector=world.createEntity();
  world.addComponent(square,new Transform());
  world.addComponent(square,new Hierarchy());
  world.addComponent(square,new VectorObject({x:1,y:3,z:0}));

  const circle=world.createEntity();
  world.addComponent(circle,new Transform());
  world.addComponent(circle,new Hierarchy());
  world.addComponent(circle,new ArcGeometry({
    radius:2,
    startAngle:0,
    endAngle:Math.PI/2,
  }));

  const grid=world.createEntity();
  world.addComponent(circle,new Transform());
  world.addComponent(circle,new Hierarchy());
  world.addComponent(circle,new GridObject(10,10,1));
  // world.addComponent(square,new PolygonObject([
  //   {x:0,y:0,z:0},
  //   {x:1,y:0,z:0},
  //   {x:1,y:1,z:0},
  //   {x:0,y:1,z:0},
  // ]));
  // world.addComponent(square,new PolygonGeometry([
  //   {x:0,y:0,z:0},
  //   {x:1,y:0,z:0},
  //   {x:1,y:1,z:0},
  //   {x:0,y:1,z:0},
  // ]));

  let lastTime=performance.now();
  function loop(time:number){
    pixiAdapter.root.removeChildren();

    const delta=(time-lastTime)/1000;
    lastTime=time;
    systemManager.update(world,delta);

    renderer.render({
      container:pixiAdapter.root,
    });
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

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
  if(e.deltaY<0)camera.camera2D.zoom*=zoomFactor;
  else camera.camera2D.zoom/=zoomFactor;
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
  const dx=(e.clientX-lastMouse.x)/camera.camera2D.zoom;
  const dy=(e.clientY-lastMouse.y)/camera.camera2D.zoom;
  camera.camera2D.x-=dx;
  camera.camera2D.y+=dy;
  lastMouse={x:e.clientX,y:e.clientY};
}

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
