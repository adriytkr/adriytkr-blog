<script setup lang="ts">
const props=defineProps<{
  formula:string;
}>();

const {rendered}=useKatex(props.formula,true);
</script>

<template>
  <div class="mathDisplay" v-html="rendered"></div>
</template>

<style scoped>
.mathDisplay{
  text-align:center;
}
</style>
