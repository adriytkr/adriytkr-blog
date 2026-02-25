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
      {
        displayMode:true,
        throwOnError:false,
      },
    );
  }catch(err){
    return props.f;
  }
});
</script>

<template>
  <div class="mathDisplay" data-mathDisplay v-html="rendered"></div>
</template>

<style scoped>
.mathDisplay{
  text-align:center;
}
</style>
