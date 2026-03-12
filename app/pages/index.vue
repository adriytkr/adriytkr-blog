<script setup lang="ts">
import { World,SystemManager } from '@adriytkr/engine';
import type { Entity } from '@adriytkr/engine';

import { Camera2D } from '@adriytkr/std/2d/index';

import {
  TransformSystem,
  create2DCamera,
  RendererSystem,
  Transform,
  Hierarchy,
  Renderable,
  FunctionGeometrySystem,
  FunctionObject,
  ParametricFunctionObject,
  ParametricFunctionGeometrySystem,
  PolygonObject,
  RegularPolygonObject,
  PolygonSystem,
  RegularPolygonSystem,
  VectorGeometrySystem,
  VectorObject,
  GridGeometrySystem,
  GridObject,
  DirtyTag,
} from '@adriytkr/std';

import { PixiRendererAdapter } from '@adriytkr/pixi-renderer-2d';
import type { PixiDrawCommand } from '@adriytkr/pixi-renderer-2d';
import { CommandBuffer } from '@adriytkr/std';

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

  systemManager.add(new TransformSystem());
  systemManager.add(new FunctionGeometrySystem());
  systemManager.add(new ParametricFunctionGeometrySystem());
  systemManager.add(new PolygonSystem());
  systemManager.add(new RegularPolygonSystem());
  systemManager.add(new VectorGeometrySystem());
  systemManager.add(new GridGeometrySystem());

  const renderer=await PIXI.autoDetectRenderer({
    canvas:canvasRef.value,
    width:canvas.width,
    height:canvas.height,
    resolution:window.devicePixelRatio,
    antialias:true,
    autoDensity:true,
  });

  const pixiAdapter=new PixiRendererAdapter(renderer);
  const commandBuffer=new CommandBuffer<PixiDrawCommand>();
  systemManager.add(new RendererSystem<PixiDrawCommand>(pixiAdapter,commandBuffer));

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
  world.addComponent(func,new Transform());
  world.addComponent(func,new Hierarchy());
  world.addComponent(func,new FunctionObject(
    x=>x**2,
    200,
    [-3,3],
  ));
  world.addComponent(func,new Renderable());
  world.addComponent(func,new DirtyTag());

  const para=world.createEntity();
  world.addComponent(para,new Transform());
  world.addComponent(para,new Hierarchy());
  world.addComponent(para,new ParametricFunctionObject(
    t=>t+5,
    t=>(t+5)**2,
    [-3,3],
    200,
  ));
  world.addComponent(para,new Renderable());
  world.addComponent(para,new DirtyTag());

  const polygon=world.createEntity();
  world.addComponent(polygon,new Transform());
  world.addComponent(polygon,new Hierarchy());
  world.addComponent(polygon,new PolygonObject([
    {x:0,y:0,z:0},
    {x:1,y:1,z:0},
    {x:2,y:1,z:0},
    {x:2,y:0,z:0},
  ]));
  world.addComponent(polygon,new Renderable());
  world.addComponent(polygon,new DirtyTag());

  const pentagon=world.createEntity();
  world.addComponent(pentagon,new Transform());
  world.addComponent(pentagon,new Hierarchy());
  world.addComponent(pentagon,new RegularPolygonObject(
    5,
    2,
  ));
  world.addComponent(pentagon,new Renderable());
  world.addComponent(pentagon,new DirtyTag());

  const vector=world.createEntity();
  world.addComponent(vector,new Transform());
  world.addComponent(vector,new Hierarchy());
  world.addComponent(vector,new VectorObject({x:4,y:2,z:0}));
  world.addComponent(vector,new Renderable());
  world.addComponent(vector,new DirtyTag());

  const grid=world.createEntity();
  world.addComponent(grid,new Transform());
  world.addComponent(grid,new Hierarchy());
  world.addComponent(grid,new GridObject(-3,3,-3,3,1,1));
  world.addComponent(grid,new Renderable());
  world.addComponent(grid,new DirtyTag());

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
