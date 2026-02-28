<script setup lang="ts">
import type {DesmosProps} from '@/features/articles/types/desmos';

import useDesmos from '@/features/articles/composables/useDesmos';
import {useDarkMode} from '@/shared/composables/useDarkMode';

import {onMounted,ref,watch} from 'vue';

const props=withDefaults(
  defineProps<DesmosProps>(),
  {draggable:false},
);

const containerRef=ref<SVGSVGElement|null>(null);
const {
  size,
  init,
  updateThemeOnly,
  updateFunctions,
}=useDesmos({...props,containerRef});

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
