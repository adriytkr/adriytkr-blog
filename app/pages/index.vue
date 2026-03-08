<script setup lang="ts">
import { World } from '@adriytkr/engine';
import {
  Hierarchy,
  Transform,
  HierarchySystem,
  TransformSystem,
  AnimationSystem,
  AnimationGroup,
  Alpha,
  SystemManager,
  MathCanvas,
  MathPosition,
  Camera2D,
  MathPoint,
  PointRenderSystem,
  Renderable,
  PixiRendererSystem,
  ActiveCameraTag,
} from '@adriytkr/std';

import * as PIXI from 'pixi.js';

const canvasRef=ref<HTMLCanvasElement|null>(null);
const world=new World();
const systemManager=new SystemManager();

let lastTime=0;
let frameId:number|null=null;
let renderer:PIXI.Renderer|null=null;

function gameLoop(currentTime:number){
  const delta=(currentTime-lastTime)/1000;
  lastTime=currentTime;

  systemManager.update(world,delta);

  frameId=requestAnimationFrame(gameLoop);
}

onMounted(async()=>{
  if(!canvasRef.value)return;

  renderer=await PIXI.autoDetectRenderer({
    view:canvasRef.value,
    width:500,
    height:500,
    resolution:window.devicePixelRatio||1,
    autoDensity:true,
    backgroundColor:0xeeeeee,
  }) as PIXI.Renderer;

  // systemManager.add(new HierarchySystem());
  // systemManager.add(new TransformSystem());
  // systemManager.add(new AnimationSystem());
  systemManager.add(new PointRenderSystem());
  systemManager.add(new PixiRendererSystem(renderer));

  const canvas=world.createEntity();
  world.addComponent(canvas,new MathCanvas(50,{x:0,y:0}));

  const point=world.createEntity();
  world.addComponent(point,new MathPosition(0,0,canvas));
  world.addComponent(point,new MathPoint(10));
  world.addComponent(point,new Transform());
  world.addComponent(point,new Renderable(new PIXI.Graphics()));

  const camera=world.createEntity();
  world.addComponent(camera,new Camera2D(0,0));
  world.addComponent(camera,new ActiveCameraTag());

  frameId=requestAnimationFrame(gameLoop);
});

onUnmounted(()=>{
  if(frameId)cancelAnimationFrame(frameId);
});
</script>

<template>
  <h1>Hello, World!</h1>
  <canvas ref="canvasRef"></canvas>
</template>

<style scoped>
canvas{
  width:500px;
  height:500px;
  border:1px solid black;
}
</style>
