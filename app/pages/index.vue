<script setup lang="ts">
import { World,SystemManager } from '@adriytkr/engine';
import type { Entity } from '@adriytkr/engine';

import { Camera2D } from '@adriytkr/std/2d/index';

import {
  AnimationGroup,
  AnimationSystem,
  Hierarchy,
  Renderable,
  Transform,
  TransformSystem,
  create2DCamera,
  rotateAnimationTrack,
  shiftAnimationTrack,
} from '@adriytkr/std';

import {
  createArc,
  createGrid,
  createStandardAxes,
  createVector,
  createSquare,
  createCircle,
  createParametricFunction,
} from '@adriytkr/math';

import type { WorldObject } from '@adriytkr/math';

import { PixiRendererSystem } from '@adriytkr/pixi-renderer-2d';

import * as PIXI from 'pixi.js';

const canvasRef=ref<HTMLCanvasElement|null>(null);

let world:World;
let systemManager:SystemManager;
let camera:{
  entity:Entity,
  camera2D:Camera2D,
};

let square:WorldObject;
let vector:WorldObject;

onMounted(async()=>{
  if(!canvasRef.value)return;

  const canvas=canvasRef.value;
  canvas.width=canvas.clientWidth;
  canvas.height=canvas.clientHeight;

  world=new World();
  systemManager=new SystemManager();

  systemManager.add(new AnimationSystem());
  systemManager.add(new TransformSystem());

  const renderer=await PIXI.autoDetectRenderer({
    canvas:canvasRef.value,
    width:canvas.width,
    height:canvas.height,
    resolution: window.devicePixelRatio,
    antialias:true,
    autoDensity:true,
  });

  systemManager.add(new PixiRendererSystem(renderer));

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

  const axes=createStandardAxes(world,{});
  const grid=createGrid(world,{});

  const arc=createArc(
    world,
    {
      position:{x:0,y:0,z:0},
      radius:2,
      startAngle:0,
      endAngle:Math.PI/3,
    },
  );
  
  square=createSquare(
    world,
    {
      position:{x:0.5,y:0.5,z:0},
      sidelength:1,
    },
  );

  vector=createVector(
    world,
    {
      from:{x:0,y:0,z:0},
      to:{x:2,y:1,z:0},
    },
    {
      color:'blue',
    },
  );

  const circle=createCircle(
    world,
    {
      position:{x:0,y:0,z:0},
      radius:7,
    },
    {
      fill:'transparent',
      stroke:'red',
    },
  );

  const curve=createParametricFunction(
    world,
    {
      position:{x:0,y:0,z:0},
      samples:100,
      x:t=>3*Math.sin(2*t+Math.PI/3),
      y:t=>5*Math.sin(2*t),
      tDomain:[-Math.PI,Math.PI],
    }
  );

  world.addComponent(square.entity,new Hierarchy());
  world.addComponent(vector.entity,new Hierarchy(square.entity));

  let lastTime=performance.now();
  function loop(time:number){
    const delta=(time-lastTime)/1000;
    lastTime=time;
    systemManager.update(world,delta);
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  canvas.addEventListener('wheel',handleMouseScroll);
  canvas.addEventListener('mousedown',handleMouseDown);
  canvas.addEventListener('mouseup',handleMouseUp);
  canvas.addEventListener('mousemove',handleMouseMove);
});

let animationGroup=new AnimationGroup();
function shift(){
  world.addComponent(square.entity,animationGroup);
  animationGroup.addTrack(shiftAnimationTrack(1,square.transform,{x:1,y:1,z:0}));
}

function rotate(){
  world.addComponent(square.entity,animationGroup);
  animationGroup.addTrack(rotateAnimationTrack(1,square.transform,Math.PI/3));
}

function shiftAndRotate(){
  shift();
  rotate();
}

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
  <button @click="shift">Shift</button>
  <button @click="rotate">Rotate</button>
  <button @click="shiftAndRotate">Shift and Rotate</button>
</template>

<style scoped>
canvas{
  width:100%;
  height:500px;
  border:1px solid black;
  display:block;
}
</style>
