import * as d3 from 'd3';

export default function(props:GraphProps){
  const containerRef=ref<SVGSVGElement|null>(null);
  const components=reactive<GraphComponents>({});
  const svgSelection=ref<d3.Selection<SVGSVGElement,unknown,null,undefined>|null>(null);

  const width=ref(0);
  const height=ref(0);

  const xScale=computed<TheScale>(()=>
    d3
      .scaleLinear()
      .domain(props.domain)
      .range([0,width.value])
  );

  const yScale=computed<TheScale>(()=>
    d3
      .scaleLinear()
      .domain(props.range)
      .range([height.value,0])
  );

  function init(){
    initSVG();
    initGroups();
    initZoom();

    draw(xScale.value,yScale.value);
  }

  function initSVG(){
    if(!containerRef.value)return;

    width.value=containerRef.value?.clientWidth;
    height.value=containerRef.value?.clientHeight;
    svgSelection.value=d3
      .select(containerRef.value)
      .attr('viewBox',`0 0 ${width.value} ${height.value}`);
  }

  function initGroups(){
    components.root=svgSelection.value!.append('g');

    components.grid=components.root.append('g').attr('class','grid');
    components.axes=components.root.append('g').attr('class','axes');
    components.xAxis=components.axes.append('g').attr('class','x-axis');
    components.yAxis=components.axes.append('g').attr('class','y-axis');

    components.functions=components.root.append('g').attr('class','lines');
    components.points=components.root.append('g').attr('class','points');
  }

  function initZoom(){
    const zoom=d3.zoom<SVGSVGElement,unknown>()
      .on('zoom',e=>{
        const t=e.transform;
        const newXScale=t.rescaleX(xScale.value);
        const newYScale=t.rescaleY(yScale.value);

        draw(newXScale,newYScale);
      });

    if(props.draggable)svgSelection.value!.call(zoom);
  }

  function draw(xS:TheScale,yS:TheScale){
    drawGrid(xS,yS);
    drawAxes(xS,yS);
    drawFunctions(xS,yS);
    drawPoints(xS,yS);
  }

  function drawGrid(xS:TheScale,yS:TheScale){
    if(!components.grid)return;

    // Draw vertical grid
    components.grid
      .selectAll('line.v-grid')
      .data(xS.ticks())
      .join('line')
      .attr('class','v-grid')
      .attr('x1',p=>xS(p))
      .attr('x2',p=>xS(p))
      .attr('y1',p=>0)
      .attr('y2',p=>height.value)
      .attr('stroke','rgb(var(--divider-color))')
      .attr('stroke-width',1)
      .attr('opacity',0.5);

    // Draw horizontal grid
    components.grid
      .selectAll('line.h-grid')
      .data(yS.ticks())
      .join('line')
      .attr('class','h-grid')
      .attr('x1',0)
      .attr('x2',width.value)
      .attr('y1',p=>yS(p))
      .attr('y2',p=>yS(p))
      .attr('stroke','rgb(var(--divider-color))')
      .attr('stroke-width',1)
      .attr('opacity',0.5);
  }

  function drawAxes(xS:TheScale,yS:TheScale){
    if(!components.xAxis||!components.yAxis)return;

    const [xMin,xMax]=xS.domain() as [number,number];
    const [yMin,yMax]=yS.domain() as [number,number];
    const isZeroInDomain=isNumberInInterval(0,[xMin,xMax]);
    const isZeroInRange=isNumberInInterval(0,[yMin,yMax]);

    // Define axis
    const xAxis=d3
      .axisBottom(xS)
      .tickSize(0)
      .tickPadding(5)
      .tickFormat((d)=>{
        const n=+d;
        if(!isZeroInRange&&n===0) return '';
        return Number.isInteger(n)
          ?n.toFixed(0)
          :n.toString();
      });

    const yAxis=d3
      .axisLeft(yS)
      .tickSize(0)
      .tickPadding(5)
      .tickFormat((d)=>{
        const n=+d;
        if(n===0)return '';
        return Number.isInteger(n)
          ?n.toFixed(0)
          :n.toString();
      });

    // Calculate axes position
    const xAxisPosition=isZeroInRange
      ?yS(0)
      :(yMax>0?height.value-20:0);

    const yAxisPosition=isZeroInDomain
      ?xS(0)
      :(xMax>0?20:width.value);

    components.xAxis
      .attr('transform',`translate(0,${xAxisPosition})`)
      .call(xAxis);

    components.yAxis
      .attr('transform',`translate(${yAxisPosition},0)`)
      .call(yAxis);

    // Style domain lines
    components.xAxis
      .select('.domain')
      .attr('x1',0)
      .attr('x2',width.value)
      .attr('stroke','rgb(var(--text-color))');

    components.yAxis
      .select('.domain')
      .attr('y1',0)
      .attr('y2',height.value)
      .attr('stroke','rgb(var(--text-color))');

    // Move 0 tick out of y-axis
    components.xAxis
      .selectAll<SVGTextElement,d3.NumberValue>('.tick text')
      .filter(d=>+d===0)
      .attr('dx',-7);

    // Relocate axis if necessary
    if(!isZeroInRange){
      components.xAxis
        .selectAll('.tick text')
        .attr('opacity',0.7);
        components.xAxis
        .select('.domain')
        .remove();
    }

    if(!isZeroInDomain){
      components.yAxis
        .selectAll('.tick text')
        .attr('opacity',0.7);
        components.yAxis
        .select('.domain')
        .remove();
    }
  } 

  function drawFunctions(xS:TheScale,yS:TheScale){
    const line=d3
      .line<Point>()
      .x(p=>xS(p.x))
      .y(p=>yS(p.y));

    const paths=components.functions!
      .selectAll<SVGPathElement,MathFunction>('path')
      .data(props.functions!);

    paths.join('path')
      .attr('fill','none')
      .attr('stroke','rgb(var(--text-color))')
      .attr('stroke-width',2)
      .attr('d',func=>line(generatePoints(func)));
  }

  function drawPoints(xS:TheScale,yS:TheScale){
    const groups=components.points!
      .selectAll<SVGGElement,Point[]>('g.point-group')
      .data(props.points!);

    const groupsEnter=groups.join('g').attr('class','point-group');

    groupsEnter.each(function(pointData){
      d3.select(this)
        .selectAll<SVGCircleElement,Point>('circle.point')
        .data(pointData)
        .join('circle')
        .attr('class','point')
        .attr('cx',p=>xS(p.x))
        .attr('cy',p=>yS(p.y))
        .attr('r',5)
        .attr('fill','rgb(var(--text-color))');
    });
  }

  watch(
    ()=>props.functions,
    ()=>drawFunctions(xScale.value,yScale.value),
    {deep:true},
  );

  onMounted(init);

  return{containerRef};
}
