<script setup lang="ts">
import useKatex from '@/features/articles/composables/useKatex';

const props=defineProps<{
  formula:string;
}>();

const {rendered}=useKatex(props.formula,false);
</script>

<template>
  <span v-html="rendered"></span>
</template>
