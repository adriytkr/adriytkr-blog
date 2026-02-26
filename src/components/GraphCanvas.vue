<script setup lang="ts">
import type {
  FunctionWrapper,
  Point,
  TheRange,
  TheScale,
} from '@/types/d3';

import * as d3 from 'd3';

import {ref,onMounted,onBeforeUnmount,watch} from 'vue';

import useDarkMode from '@/composables/useDarkMode';

const {isDarkMode}=useDarkMode();

interface Props{
  pointsWrappers?:Point[][];
  functionWrappers?:FunctionWrapper[];
  domain:TheRange;
  range:TheRange;
  draggable?:boolean;
}

const props=withDefaults(
  defineProps<Props>(),
  {
    draggable:false,
  },
);

const containerRef=ref<SVGSVGElement|null>(null);

let svg:d3.Selection<SVGSVGElement,unknown,null,undefined>;
let mainGroup:d3.Selection<SVGGElement,unknown,null,undefined>;
let gridGroup:d3.Selection<SVGGElement,unknown,null,undefined>;
let axesGroup:d3.Selection<SVGGElement,unknown,null,undefined>;
let functionsGroup:d3.Selection<SVGGElement,unknown,null,undefined>;
let pointsGroup:d3.Selection<SVGGElement,unknown,null,undefined>;

let width:number;
let height:number;
let xScaleOriginal:TheScale;
let yScaleOriginal:TheScale;

function getTheme(){
  const styles=getComputedStyle(document.documentElement)
  return{
    bgColor:styles.getPropertyValue('--background-color').trim(),
    textColor:styles.getPropertyValue('--text-color').trim(),
  };
}

function init(){
  if(!containerRef.value)return;

  width=containerRef.value?.clientWidth;
  height=containerRef.value?.clientHeight;

  svg=d3
    .select(containerRef.value)
    .attr('viewBox',`0 0 ${width} ${height}`);

  mainGroup=svg.append('g');
  gridGroup=mainGroup.append('g').attr('class','grid');
  axesGroup=mainGroup.append('g').attr('class','axes');
  functionsGroup=mainGroup.append('g').attr('class','lines');
  pointsGroup=mainGroup.append('g').attr('class','points');

  xScaleOriginal=d3
    .scaleLinear()
    .domain(props.domain)
    .range([0,width]);
  yScaleOriginal=d3
    .scaleLinear()
    .domain(props.range)
    .range([height,0]);

  draw(xScaleOriginal,yScaleOriginal);

  const zoom=d3.zoom<SVGSVGElement,unknown>()
    // .scaleExtent([0.1,20])
    // .translateExtent([[0,0],[width,height]])
    .on('zoom',e=>{
      const t=e.transform;
      const newXScale=t.rescaleX(xScaleOriginal);
      const newYScale=t.rescaleY(yScaleOriginal);

      clearScreen();
      draw(newXScale,newYScale);
    });

  if(props.draggable)svg.call(zoom);
}

function clearScreen(){
  gridGroup.selectAll('*').remove();
  axesGroup.selectAll('*').remove();
  functionsGroup.selectAll('*').remove();
  pointsGroup.selectAll('*').remove();
}

function draw(xS:TheScale,yS:TheScale){
  drawGrid(xS,yS);
  drawAxes(xS,yS);
  drawFunctions(xS,yS);
  drawPoints(xS,yS);
}

function drawGrid(xS:TheScale,yS:TheScale){
  // Draw vertical grid
  gridGroup
    .selectAll('line.v-grid')
    .data(xS.ticks())
    .enter()
    .append('line')
    .attr('x1',p=>xS(p))
    .attr('x2',p=>xS(p))
    .attr('y1',p=>0)
    .attr('y2',p=>height)
    .attr('stroke','#ccc')
    .attr('stroke-width',1)
    .attr('opacity',0.5);

  // Draw horizontal grid
  gridGroup
    .selectAll('line.h-grid')
    .data(yS.ticks())
    .enter()
    .append('line')
    .attr('x1',0)
    .attr('x2',width)
    .attr('y1',p=>yS(p))
    .attr('y2',p=>yS(p))
    .attr('stroke','#ccc')
    .attr('stroke-width',1)
    .attr('opacity',0.5);
}

function drawAxes(xS:TheScale,yS:TheScale){
  const [xMin,xMax]=xS.domain() as [number,number];
  const [yMin,yMax]=yS.domain() as [number,number];
  const isZeroInDomain=xMin<=0&&0<=xMax;
  const isZeroInRange=yMin<=0&&0<=yMax;

  // Config x axis
  const formatXTick=(d:d3.NumberValue,i:number):string=>{
    const n=+d;
    if(!isZeroInRange&&n===0)return '';
    return Number.isInteger(n)
      ?n.toFixed(0)
      :n.toString();
  }

  const xAxis=d3
    .axisBottom(xS)
    .tickSize(0)
    .tickFormat(formatXTick)
    .tickPadding(5);

  const xAxisPosition=isZeroInRange
    ?yS(0)
    :(yMax>0?height-20:0);// this is not perfect, fix later

  const xAxisGroup=axesGroup
    .append('g')
    .attr('transform',`translate(0,${xAxisPosition})`)
    .call(xAxis);

  xAxisGroup
    .select('.domain')
    .attr('x1',0)
    .attr('x2',width)
    .attr('stroke','black');
  
  // Move 0 tick out of y-axis
  xAxisGroup
    .selectAll<SVGTextElement,d3.NumberValue>('.tick text')
    .filter(d=>+d===0)
    .attr('dx',-7);

  if(!isZeroInRange){
    xAxisGroup
      .selectAll('.tick text')
      .attr('opacity',0.7);
    xAxisGroup
      .select('.domain')
      .remove();
  }

  // Config y-axis
  const formatYTick=(d:d3.NumberValue,i:number):string=>{
    const n=+d;
    if(n===0)return '';
    return Number.isInteger(n)
      ?n.toFixed(0)
      :n.toString();
  };

  const yAxis=d3
    .axisLeft(yS)
    .tickSize(0)
    .tickFormat(formatYTick)
    .tickPadding(5);

  const yAxisPosition=isZeroInDomain
    ?xS(0)
    :(xMax>0?20:width);// this is not perfect, fix later

  const yAxisGroup=axesGroup
    .append('g')
    .attr('transform',`translate(${yAxisPosition},0)`)
    .call(yAxis);

  yAxisGroup
    .select('.domain')
    .attr('y1',0)
    .attr('y2',height)
    .attr('stroke','black');

  if(!isZeroInDomain){
    yAxisGroup
      .selectAll('.tick text')
      .attr('opacity',0.7);
    yAxisGroup
      .select('.domain')
      .remove();
  }
}

function drawFunctions(xS:TheScale,yS:TheScale){
  const theme=getTheme();
  props.functionWrappers?.forEach(wrapper=>{
    // Generate points
    const [minX,maxX]=wrapper.domain;
    const xStep=(maxX-minX)/wrapper.samples;
    const points:Point[]=Array.from(
      {length:wrapper.samples+1},
      (_,i)=>{
        const x=minX+i*xStep;
        return{x,y:wrapper.func(x)};
      },
    )
    const line=d3
      .line<Point>()
      .x(p=>xS(p.x))
      .y(p=>yS(p.y));
    functionsGroup
      .append('path')
      .datum(points)
      .attr('fill','none')
      .attr('stroke',theme.textColor)
      .attr('stroke-width',2)
      .attr('d',line);
  });
}

function drawPoints(xS:TheScale,yS:TheScale){
  const theme=getTheme();
  props.pointsWrappers?.forEach(points=>{
    pointsGroup.
      selectAll('.point')
      .data(points)
      .enter()
      .append('circle')
      .attr('cx',p=>xS(p.x))
      .attr('cy',p=>yS(p.y))
      .attr('r',5)
      .attr('fill',theme.textColor);
  });
}

onMounted(init);
onBeforeUnmount(()=>{});

watch(
  ()=>props.functionWrappers,
  ()=>{
    clearScreen();
    draw(xScaleOriginal,yScaleOriginal);
  },
  {deep:true},
);

function updateThemeOnly(){
  const theme=getTheme()

  pointsGroup
    .selectAll('circle')
    .attr('fill',theme.textColor)

  functionsGroup
    .selectAll('path')
    .attr('stroke',theme.textColor)
}

watch(isDarkMode,updateThemeOnly);
</script>

<template>
  <svg ref="containerRef"></svg>
</template>

<style scoped>
svg{
  width:100%;
  max-width:750px;
  height:400px;
}
</style>
