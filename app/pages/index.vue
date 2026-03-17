<script setup lang="ts">
const canvasRef=ref<HTMLCanvasElement|null>(null);

type Subscriber=()=>void;

class GameObject{
  private m_subscribers:Subscriber[]=[];

  public subscribe(fn:Subscriber){
    this.m_subscribers.push(fn);
  }
  
  public notify(){
    this.m_subscribers.forEach(fn=>fn());
  }
}

class Point extends GameObject{
  private m_x:number;
  private m_y:number;

  public constructor(x:number=0,y:number=0){
    super();
    this.m_x=x;
    this.m_y=y;
  }

  public get x():number{
    return this.m_x;
  }

  public set x(val:number){
    this.m_x=val;
    this.notify();
  }

  public get y():number{
    return this.m_y;
  }

  public set y(val:number){
    this.m_y=val;
    this.notify();
  }
}

function createConstraint(dependencies:GameObject[],update:()=>void){
  update();

  dependencies.forEach(dependency=>{
    dependency.subscribe(update);
  });
}

const pointA=new Point(0,0);
const pointB=new Point(10,10);

function midpoint(pointA:Point,pointB:Point){
  const mid=new Point();

  createConstraint([pointA,pointB],()=>{
    mid.x=(pointA.x+pointB.x)/2;
    mid.y=(pointA.y+pointB.y)/2;
  });

  return mid;
}

const m=midpoint(pointA,pointB);

onMounted(()=>{
  if(canvasRef.value===null)return;
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
