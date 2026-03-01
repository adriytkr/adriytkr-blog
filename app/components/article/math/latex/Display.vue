<script setup lang="ts">
import 'katex/dist/katex-swap.min.css';

const props=defineProps<{
  formula:string;
}>();

const {rendered}=useLatex(props.formula,true);
</script>

<template>
  <div class="mathDisplay" v-html="rendered"></div>
</template>

<style scoped>
.mathDisplay{
  text-align:center;
}
</style>
