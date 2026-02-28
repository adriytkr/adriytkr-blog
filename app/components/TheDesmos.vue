<script setup lang="ts">
type DesmosProps={
  pointSeries?:Point[][];
  functions?:MathFunction[];
  domain:Interval;
  range:Interval;
  draggable?:boolean;
};
const props=defineProps<DesmosProps>();

const containerRef=ref<SVGSVGElement|null>(null);
const {
  size,
  init,
  updateThemeOnly,
  updateFunctions,
}=useDesmos({...props,containerRef});

const isDark=useDark();
watch(isDark,updateThemeOnly);
watch(
  ()=>props.functions,
  ()=>updateFunctions(size.xScale!,size.yScale!),
  {deep:true},
);

onMounted(init);
</script>

<template>
  <svg ref="containerRef"></svg>
</template>

<style scoped>
svg{
  width:100%;
  max-width:750px;
  height:400px;
  display:block;
}
</style>
