<script setup lang="ts">
import { derive,InternalNode,watch } from '@adriytkr/core';

const canvasRef=ref<HTMLCanvasElement|null>(null);

const root=new InternalNode();
const parent=new InternalNode();
const child=new InternalNode();
root.add(parent);
parent.add(child);

parent.rotation.z.value=Math.PI/2;
parent.position.x.value=300;
const brother=child.clone();
child.position.x.value=100;
console.log(parent.worldPosition,child.worldPosition,brother.worldPosition);

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
