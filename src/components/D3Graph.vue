<script setup lang="ts">
import type {Point,Graph} from '@/types/d3';

import * as d3 from 'd3';
import {ref,onMounted,toRefs,toRef,watch} from 'vue';

const props=defineProps<{
  graph:Graph;
}>();
const state=toRefs(props);
const graph=toRef(state.graph);

const svgRef=ref<HTMLElement|null>(null);

function draw(width:number,height:number){
  if(!svgRef.value)return;

  const svg=d3.select(svgRef.value);
  svg
    .selectAll('*')
    .remove();
  svg.attr('viewBox',`0 0 ${width} ${height}`);

  // Basic settings
  const margin={
    top:30,
    left:30,
    right:30,
    bottom:30,
  };
  const innerWidth=width-margin.left-margin.right;
  const innerHeight=height-margin.top-margin.bottom;

  // Add axes
  const xScale=d3
    .scaleLinear()
    .domain(graph.value.domain)
    .range([margin.left,innerWidth+margin.right]);
  const yScale=d3
    .scaleLinear()
    .domain(graph.value.range)
    .range([innerHeight+margin.top,margin.top]);

  const xAxis=d3
    .axisBottom(xScale)
    .tickFormat(d3.format('d'))
    .tickValues(d3.range(xScale.domain()[0]??0,(xScale.domain()[1]??10)+1,graph.value.domain[2]));
  const yAxis=d3
    .axisLeft(yScale)
    .tickFormat(d3.format('d'))
    .tickValues(d3.range(yScale.domain()[0]??0,(yScale.domain()[1]??10)+1,graph.value.range[2]));

  const xAxisPosition=
    graph.value.range[0]<=0&&graph.value.range[1]>=0
      ?yScale(0)
      :innerHeight+margin.top;
  const yAxisPosition=
    graph.value.domain[0]<=0&&graph.value.domain[1]>=0
      ?xScale(0)
      :margin.left;
  svg
    .append('g')
    .attr('transform',`translate(0,${xAxisPosition})`)
    .call(xAxis);
  svg
    .append('g')
    .attr('transform',`translate(${yAxisPosition},0)`)
    .call(yAxis);

  // Add grid
  const xGrid=d3
    .axisBottom(xScale)
    .tickSize(-innerHeight-margin.top)
    .tickFormat(()=>'')
    .tickValues(d3.range(xScale.domain()[0]??0,(xScale.domain()[1]??10)+1,graph.value.domain[2]));
  const yGrid=d3
    .axisLeft(yScale)
    .tickSize(-innerWidth-margin.right)
    .tickFormat(()=>'')
    .tickValues(d3.range(yScale.domain()[0]??0,(yScale.domain()[1]??10)+1,graph.value.range[2]));

  svg
    .append('g')
    .attr('opacity',0.2)
    .attr('transform',`translate(0,${innerHeight+margin.top})`)
    .call(xGrid);
  svg
    .append('g')
    .attr('opacity',0.2)
    .attr('transform',`translate(${margin.left},0)`)
    .call(yGrid);

  // Draw points
  if(graph.value.points){
    svg
      .selectAll('circle')
      .data(graph.value.points.data)
      .enter()
      .append('circle')
      .attr('cx',p=>xScale(p.x))
      .attr('cy',p=>yScale(p.y))
      .attr('r',6)
      .attr('stroke','none')
      .attr('fill',graph.value.points.color);
  }

  // Draw function
  if(graph.value.func){
    const [xMin,xMax]=graph.value.func.domain;
    const step=(xMax-xMin)/graph.value.func.samples;
    const points:Point[]=Array.from({length:graph.value.func.samples+1},(_,i)=>{
      const x=xMin+i*step;
      return {x,y:graph.value.func!.func(x)};
    });
    const line=d3
      .line<Point>()
      .x(p=>xScale(p.x))
      .y(p=>yScale(p.y));
    svg
      .append('path')
      .datum(points)
      .attr('fill','none')
      .attr('stroke',graph.value.func.color??'black')
      .attr('stroke-width',3)
      .attr('d',line);
  }
}

let resizeObserver:ResizeObserver|null=null;

onMounted(()=>{
  if(!svgRef.value)return;
  resizeObserver=new ResizeObserver(entries=>{
    if(!entries[0])return;
    const {width,height}=entries[0].contentRect;
    draw(width,height);
  });
  resizeObserver.observe(svgRef.value);
});

watch(props.graph,()=>{
  if(!svgRef.value)return;
  const {clientWidth:width,clientHeight:height}=svgRef.value;
  draw(width,height);
});
</script>

<template>
  <svg data-graph ref="svgRef"></svg>
</template>

<style scoped>
svg{
  width:100%;
  height:400px;
  display:block;
}
</style>
