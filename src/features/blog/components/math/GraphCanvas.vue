<script setup lang="ts">
import type {Props} from '../../types/graphCanvas';

import useGraphCanvas from '../../composables/useGraphCanvas';
import {useDarkMode} from '@/shared/composables/useDarkMode';

import {onMounted,ref,watch} from 'vue';

const props=withDefaults(
  defineProps<Props>(),
  {draggable:false},
);

const containerRef=ref<SVGSVGElement|null>(null);
const {
  size,
  init,
  updateThemeOnly,
  updateFunctions,
}=useGraphCanvas({...props,containerRef});

const darkMode=useDarkMode();
watch(()=>darkMode.isDarkMode,updateThemeOnly);
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
