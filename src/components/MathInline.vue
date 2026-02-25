<script setup lang="ts">
import katex from 'katex';
import {computed} from 'vue';

const props=defineProps<{
  f:string;
}>();

const rendered=computed(()=>{
  try{
    return katex.renderToString(
      props.f,
      {throwOnError:false},
    );
  }catch(err){
    return props.f;
  }
});
</script>

<template>
  <span data-mathInline v-html="rendered"></span>
</template>
