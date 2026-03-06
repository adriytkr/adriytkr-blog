<script setup lang="ts">
import { World,Component } from '@adriytkr/engine/index';
import type { Entity,ISystem } from '@adriytkr/engine/index';

import * as d3 from 'd3';

class Position extends Component{
  public constructor(
    public x:number,
    public y:number,
  ){
    super();
  }
}

class Velocity extends Component{
  public constructor(
    public x:number,
    public y:number,
  ){
    super();
  }
}

class Camera extends Component{
  public xScale = d3.scaleLinear();
  public yScale = d3.scaleLinear();

  constructor(
    public zoom: number = 1,
    public width: number = 800,
    public height: number = 600
  ) {
    super();
    this.updateScales(0, 0);
  }

  public updateScales(camX: number, camY: number) {
    const halfW = (this.width / 2) / this.zoom;
    const halfH = (this.height / 2) / this.zoom;

    this.xScale.domain([camX - halfW, camX + halfW]).range([0, this.width]);
    this.yScale.domain([camY + halfH, camY - halfH]).range([0, this.height]); 
  }
} 

class D3Renderable<T extends d3.BaseType> extends Component{
  public constructor(
    public baseTagName:string,
    public draw:(
      el:d3.Selection<T,any,any,any>,
      world:World,
      entity:Entity,
      xScale:d3.ScaleLinear<number,number>,
      yScale:d3.ScaleLinear<number,number>,
    )=>void,
  ){
    super();
  }
}

class PhysicsSystem implements ISystem{
  public constructor(public gravity:number){}

  update(world:World,delta:number):void{
    const entities=world.query(Position,Velocity);

    for(const entity of entities){
      const position=world.getComponent(entity,Position)!;
      const velocity=world.getComponent(entity,Velocity)!;

      velocity.y+=this.gravity*delta;
      position.x+=velocity.x*delta;
      position.y+=velocity.y*delta;
    }
  }
}

class D3Renderer implements ISystem{
  private m_canvas:d3.Selection<SVGElement,any,any,any>;

  public constructor(selection:SVGElement){
    this.m_canvas=d3.select(selection);
  }

  update(world:World,delta:number){
    const entities=world.query(D3Renderable);
    const camEntity=world.query(Camera,Position)[0];
    if(!camEntity){
      console.log('No camera');
      return;
    }

    const cam=world.getComponent(camEntity,Camera)!;
    const camPos=world.getComponent(camEntity,Position)!;

    cam.updateScales(camPos.x,camPos.y);

    this.m_canvas
      .selectAll<any,Entity>('.entity')
      .data(entities,entity=>entity)
      .join(
        enter=>enter
          .append(entity=>{
            const renderable=world.getComponent(entity,D3Renderable)!;
            return document.createElementNS('http://www.w3.org/2000/svg',renderable.baseTagName);
          })
          .attr('class','entity'),
        update=>update,
        exit=>exit.remove(),
      )
      .each(function(entity){
        const el=d3.select(this);
        const renderable=world.getComponent(entity,D3Renderable)!;
        
        renderable.draw(el,world,entity,cam.xScale,cam.yScale);
      });
  }
}

const world=new World();
const physics=new PhysicsSystem(10);
let renderer:D3Renderer;

const player=world.createEntity();
world.addComponent(player,new Position(0,0));
world.addComponent(player,new D3Renderable<SVGCircleElement>(
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
));
world.addComponent(player,new Velocity(20,0));

const camera=world.createEntity();
world.addComponent(camera,new Camera(5,500,500));
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

const canvasRef=ref<SVGElement|null>(null);
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
