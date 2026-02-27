import type {Point,TheScale} from '@/shared/types/d3';
import type {Components,GraphCanvasOptions,Size} from '../types/graphCanvas';

import {getTheme} from '@/shared/utils/theme';

import * as d3 from 'd3';
import {reactive} from 'vue';

export default function(props:GraphCanvasOptions){
  const components=reactive<Components>({});
  const size=reactive<Size>({});

  function init(){
    initSVG();
    initGroups();
    initScales();
    initZoom();

    draw(size.xScale!,size.yScale!);
  }

  function initSVG(){
    if(!props.containerRef.value)return;

    size.width=props.containerRef.value?.clientWidth;
    size.height=props.containerRef.value?.clientHeight;
    components.svg=d3
      .select(props.containerRef.value)
      .attr('viewBox',`0 0 ${size.width} ${size.height}`);
  }

  function initGroups(){
    components.root=components.svg!.append('g');
    components.grid=components.root.append('g').attr('class','grid');
    components.axes=components.root.append('g').attr('class','axes');
    components.functions=components.root.append('g').attr('class','lines');
    components.points=components.root.append('g').attr('class','points');
  }

  function initScales(){
    size.xScale=d3
      .scaleLinear()
      .domain(props.domain)
      .range([0,size.width!]);
    size.yScale=d3
      .scaleLinear()
      .domain(props.range)
      .range([size.height!,0]);
  }

  function initZoom(){
    const zoom=d3.zoom<SVGSVGElement,unknown>()
      .on('zoom',e=>{
        const t=e.transform;
        const newXScale=t.rescaleX(size.xScale!);
        const newYScale=t.rescaleY(size.yScale!);

        clearScreen();
        draw(newXScale,newYScale);
      });

    if(props.draggable)components.svg!.call(zoom);
  }

  function clearScreen(){
    components.grid!.selectAll('*').remove();
    components.axes!.selectAll('*').remove();
    components.functions!.selectAll('*').remove();
    components.points!.selectAll('*').remove();
  }

  function draw(xS:TheScale,yS:TheScale){
    drawGrid(xS,yS);
    drawAxes(xS,yS);
    drawFunctions(xS,yS);
    drawPoints(xS,yS);
  }

  function drawGrid(xS:TheScale,yS:TheScale){
    // Draw vertical grid
    components.grid!
      .selectAll('line.v-grid')
      .data(xS.ticks())
      .enter()
      .append('line')
      .attr('x1',p=>xS(p))
      .attr('x2',p=>xS(p))
      .attr('y1',p=>0)
      .attr('y2',p=>size.height!)
      .attr('stroke','#ccc')
      .attr('stroke-width',1)
      .attr('opacity',0.5);

    // Draw horizontal grid
    components.grid!
      .selectAll('line.h-grid')
      .data(yS.ticks())
      .enter()
      .append('line')
      .attr('x1',0)
      .attr('x2',size.width!)
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
      :(yMax>0?size.height!-20:0);// this is not perfect, fix later

    const xAxisGroup=components.axes!
      .append('g')
      .attr('transform',`translate(0,${xAxisPosition})`)
      .call(xAxis);

    xAxisGroup
      .select('.domain')
      .attr('x1',0)
      .attr('x2',size.width!)
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
      :(xMax>0?20:size.width!);// this is not perfect, fix later

    const yAxisGroup=components.axes!
      .append('g')
      .attr('transform',`translate(${yAxisPosition},0)`)
      .call(yAxis);

    yAxisGroup
      .select('.domain')
      .attr('y1',0)
      .attr('y2',size.height!)
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
    props.functions?.forEach(wrapper=>{
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
      components.functions!
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
    props.pointSeries?.forEach(points=>{
      components.points!.
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

  function updateFunctions(xS:TheScale,yS:TheScale){
    clearScreen();
    draw(xS,yS);
  }

  function updateThemeOnly(){
    const theme=getTheme();

    components.points!
      .selectAll('circle')
      .attr('fill',theme.textColor)

    components.functions!
      .selectAll('path')
      .attr('stroke',theme.textColor)
  }

  return{
    size,
    init,
    updateThemeOnly,
    updateFunctions,
  };
}
