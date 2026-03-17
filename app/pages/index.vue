<script setup lang="ts">
import * as PIXI from 'pixi.js';

import { Square,Animator, ShiftAnimation } from '@adriytkr/math';
import { Scene,SquareView } from '@adriytkr/renderer-pixi';

const canvasRef=ref<HTMLCanvasElement|null>(null);

let scene:Scene;
const animator=new Animator();
const square=new Square(100,'red');

onMounted(async()=>{
  if(canvasRef.value===null)return;

  canvasRef.value.width=canvasRef.value.clientWidth;
  canvasRef.value.height=canvasRef.value.clientHeight;

  const app=new PIXI.Application();

  await app.init({
    canvas:canvasRef.value,
    width:canvasRef.value.width,
    height:canvasRef.value.height,
    autoStart:false,
  });

  scene=new Scene(app);
  scene.register(Square,SquareView);

  scene.add(square);

  app.start();
  app.ticker.add((ticker)=>{
    const delta=ticker.elapsedMS;

    // square.position.x$.value+=10*delta;
    animator.update(delta);
    app.render();
  });
});

function animate():void{
  animator.add(new ShiftAnimation(square,{x:50,y:50},3000));
}

function remove():void{
  scene.remove(square);
}
</script>

<template>
  <h1>Hello, World!</h1>
  <canvas ref="canvasRef"></canvas>
  <button @click="animate">Animate</button>
  <button @click="remove">Remove</button>
</template>

<style scoped>
canvas{
  width:100%;
  height:500px;
  border:1px solid black;
  display:block;
}
</style>
