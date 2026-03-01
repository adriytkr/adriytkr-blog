<script setup lang="ts">
// BUG WTF!!!!!????
type GraphProps={
  points?:Point[][];
  functions?:MathFunction[];
  domain:Interval;
  range:Interval;
  draggable?:boolean;
};
//

const props=defineProps<GraphProps>();

const {containerRef}=useGraph(props);
</script>

<template>
  <svg class="d3" ref="containerRef"></svg>
</template>

<style scoped>
.d3{
  width:100%;
  max-width:750px;
  height:400px;
  display:block;
}
</style>
