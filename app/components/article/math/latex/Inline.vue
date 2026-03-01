<script setup lang="ts">
import 'katex/dist/katex-swap.min.css';

const props=defineProps<{
  formula:string;
}>();

const {rendered}=useLatex(props.formula,false);
</script>

<template>
  <span v-html="rendered"></span>
</template>
