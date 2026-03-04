import { AbstractFunctionObject } from '~/shared/types/math/math-objects/AbstractFunctionObject';
import type { MathObject, MathObjectType } from '~/shared/types/math/math-objects/bases';
import type { AnimationOptions, Animations, ObjectStyle } from '~/shared/types/math/engine/api';
import type { BaseAnimation } from '~/shared/types/math/engine/animations/BaseAnimation';
import { FadeInAnimation } from '~/shared/types/math/engine/animations/FadeInAnimation';
import { FadeOutAnimation } from '~/shared/types/math/engine/animations/FadeOutAnimation';
import { ShiftAnimation } from '~/shared/types/math/engine/animations/ShiftAnimation';
import { CameraObject } from '~/shared/types/math/math-objects/CameraObject';
import type { RenderContext } from '~/shared/types/math/engine/core';

import {DEFAULT_ANIMATION_OPTIONS,DEFAULT_CAMERA} from '~/shared/constants/graph';

import * as d3 from 'd3';
import type { BaseRenderer } from '~/shared/types/math/engine/renderers/BaseRenderer';

export default function(){
  const containerRef=ref<SVGSVGElement|null>(null);
  let svgSelection:d3.Selection<SVGSVGElement,unknown,null,undefined>;
  const components:GraphComponents={};

  const theWidth=ref(0);
  const theHeight=ref(0);
  let baseXScale:d3.ScaleLinear<number,number>|undefined;
  let baseYScale:d3.ScaleLinear<number,number>|undefined;
  let currentXScale:d3.ScaleLinear<number,number>;
  let currentYScale:d3.ScaleLinear<number,number>;

  let objects:MathObject[]=[];
  let objectStyles=new WeakMap<MathObject,ObjectStyle>();
  let animations:BaseAnimation[]=[];
  let cameras:CameraObject[]=[];

  let activeCamera:CameraObject=DEFAULT_CAMERA;

  let needsUpdate=false;

  function play(...anims:BaseAnimation[]){
    return Promise.all(
      anims.map(anim=>
        new Promise<void>(resolve=>{
          anim.setup();
          anim.startTime=performance.now();
          anim.resolve=resolve;
          animations.push(anim);
        })
      ),
    );
  }

  function tick(now:number){
    requestAnimationFrame(tick);
    if(animations.length===0&&!needsUpdate)return;

    if(animations.length>0){
      animations.forEach((anim,index)=>{
        const elapsed=now-anim.startTime;
        const alpha=Math.min(elapsed/anim.duration,1);

        anim.update(alpha);

        if(alpha===1){
          anim.resolve();
          animations.splice(index,1);
        }
        needsUpdate=true;
      });
    }

    if(needsUpdate){
      updateScalesFromCamera();
      updateScene();
      needsUpdate=false;
    }
  }

  function init(){
    initSVG();
    initGroups();
    updateScalesFromCamera();
    initArrowMarker();

    needsUpdate=true;
    startAnimationLoop();
  }

  function initZoom(){
    const zoomBehavior=d3
      .zoom<SVGSVGElement,unknown>()
      .scaleExtent([0.5,10])
      .on('zoom',(event)=>{
        const {transform}=event;

        const newXScale=transform.rescaleX(baseXScale);
        const newYScale=transform.rescaleY(baseYScale);

        activeCamera.domain=newXScale.domain();
        activeCamera.range=newYScale.domain();

        needsUpdate=true;
      });

    svgSelection.call(zoomBehavior);
  }

  function startAnimationLoop(){
    requestAnimationFrame(tick);
  }

  function updateScalesFromCamera(){
    if(!baseXScale||!baseYScale){
      baseXScale=d3
        .scaleLinear()
        .domain(activeCamera.domain)
        .range([0,theWidth.value]);
      baseYScale=d3
        .scaleLinear()
        .domain(activeCamera.range)
        .range([theHeight.value,0]);
    }

    currentXScale=d3.
      scaleLinear()
      .domain(activeCamera.domain)
      .range([0,theWidth.value]);
    currentYScale=d3.
      scaleLinear()
      .domain(activeCamera.range)
      .range([theHeight.value,0]);
  }

  function setActiveCamera(camera:CameraObject){
    activeCamera=camera;

    baseXScale=undefined;
    baseYScale=undefined;
    updateScalesFromCamera();

    svgSelection.call(
      d3.zoom<SVGSVGElement,unknown>().transform,
      d3.zoomIdentity
    );

    initZoom();
    updateScene();
  }

  function initSVG(){
    if(!containerRef.value)return;

    theWidth.value=containerRef.value.clientWidth;
    theHeight.value=containerRef.value.clientHeight;
    svgSelection=d3
      .select(containerRef.value)
      .attr('viewBox',`0 0 ${theWidth.value} ${theHeight.value}`);
  }

  function initGroups(){
    components.root=svgSelection
      .append('g')
      .attr('class','root');

    renderers.set('point',new PointRenderer(components.root));
    renderers.set('function',new FunctionRenderer(components.root));
    renderers.set('vector',new VectorRenderer(components.root));
  }

  function initArrowMarker(){
    const defs=svgSelection.append('defs');

    defs
      .append('marker')
      .attr('id','arrow')
      .attr('viewBox','0 0 10 10')
      .attr('refX',10)
      .attr('refY',5)
      .attr('markerWidth',6)
      .attr('markerHeight',6)
      .attr('orient','auto')
      .append('path')
      .attr('d','M 0 0 L 10 5 L 0 10 z')
      .attr('fill','black');
  }

  const renderers=new Map<MathObjectType,BaseRenderer<MathObject>>;
  function updateScene(){
    const context:RenderContext={
      xScale:currentXScale,
      yScale:currentYScale,
      activeCamera,
      getObjectStyle,
    };

    renderers.forEach((renderer,type)=>{
      const objs=objects.filter(object=>object.type===type);
      renderer.render(objs,context);
    });
  }

  function getObjectStyle(object:MathObject){
    let style=objectStyles.get(object);
    if(!style){
      style={opacity:1};
      objectStyles.set(object,{opacity:1});
    }
    return style;
  };

  function add(object:MathObject){
    if(object instanceof CameraObject){
      cameras.push(object);
      if(!activeCamera)setActiveCamera(object);
    }else{
      objects.push(object);
      objectStyles.set(object,{opacity:1});
      needsUpdate=true;
    }
  }

  function remove(object:MathObject){
    if(!components.root)return;

    objects=objects.filter(o=>o.id!==object.id);
    needsUpdate=true;
  }

  function clear(){
    objects=[];
    renderers.forEach(renderer=>renderer.clear());
    needsUpdate=true;
  }

  const animate:Animations={
    fadeIn(object:MathObject,options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS){
      const style=getObjectStyle(object);
      return new FadeInAnimation(object,style,options);
    },
    fadeOut(object:MathObject,options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS){
      const style=getObjectStyle(object);
      return new FadeOutAnimation(object,style,options);
    },
    shift:(object:Shiftable,delta:Point,options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS)=>
      new ShiftAnimation(object,delta,options),
    moveCamera:(
      camera:CameraObject,
      targetDomain:Interval,
      targetRange:Interval,
      options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS
    )=>new CameraTransition(camera,targetDomain,targetRange,options),
  };

  onMounted(init);

  return{
    containerRef,
    add,
    remove,
    clear,
    play,
    setActiveCamera,
    animate,
  };
}

// group math objects
// add lerp function
