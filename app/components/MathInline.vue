<script setup lang="ts">
const props=defineProps<{
  formula:string;
}>();

const {rendered}=useKatex(props.formula,false);
</script>

<template>
  <span v-html="rendered"></span>
</template>
