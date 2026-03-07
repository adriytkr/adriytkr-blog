<script setup lang="ts">
import { World } from '@adriytkr/engine';
import { PhysicsSystem,Camera2D,Position,Velocity } from '@adriytkr/std';
import { D3Renderable,D3Renderer } from '@adriytkr/renderer-d3';

const canvasRef=ref<SVGElement|null>(null);

const world=new World();
const physics=new PhysicsSystem(10);
let renderer:D3Renderer;

const player=world.createEntity();
world.addComponent(player,new Position(0,0));
const x=new D3Renderable<SVGCircleElement>(
  'circle',
  (el,world,entity,xScale,yScale)=>{
    const position=world.getComponent(entity,Position)!;

    el
      .attr('cx',xScale(position.x))
      .attr('cy',yScale(position.y))
      .attr('r',30)
      .attr('fill','red')
      .attr('stroke','black')
      .attr('stroke-width',4);
  },
)
world.addComponent(player,x);
world.addComponent(player,new Velocity(20,0));

const camera=world.createEntity();
world.addComponent(camera,new Camera2D(5,500,500));
world.addComponent(camera,new Position(20,0));

let lastTime=0;
let frameId:number|null=null;

function gameLoop(currentTime:number){
  const delta=(currentTime-lastTime)/1000;
  lastTime=currentTime;

  physics.update(world,delta);
  renderer.update(world,delta);

  frameId=requestAnimationFrame(gameLoop);
}

onMounted(()=>{
  if(!canvasRef.value)return;

  renderer=new D3Renderer(canvasRef.value);
  frameId=requestAnimationFrame(gameLoop);
});

onUnmounted(()=>{
  if(frameId)cancelAnimationFrame(frameId);
});

function stop(){
  if(frameId===null)return;
  cancelAnimationFrame(frameId);
}
</script>

<template>
  <h1>Hello, World</h1>
  <svg ref="canvasRef"></svg>
  <button @click="stop">Stop</button>
</template>

<style scoped>
svg{
  width:500px;
  height:500px;
  border:1px solid black;
}
</style>
