<script setup lang="ts">
import type {Heading} from '@/types/nav';

import TableOfContents from './TableOfContents.vue';

defineProps<{
  headings:Heading[];
}>();
</script>

<template>
  <div class="layout">
    <article>
      <slot></slot>
    </article>
    <TableOfContents :headings="headings"/>
  </div>
</template>

<style scoped>
.layout{
  display:flex;
}
article{
  max-width:800px;
  padding:32px 16px;
  margin:0 auto;
}
article :slotted(section){
  margin:32px;
  scroll-margin-top:24px;
}
article :slotted(h1),
article :slotted(h2),
article :slotted(h3){
  font-weight:700;
}
article :slotted(h1){
  margin-bottom:36px;
  font-size:38px;
}
article :slotted(h2){
  margin-bottom:28px;
  font-size:32px;
}
article :slotted(h3){
  margin-bottom:24px;
  font-size:26px;
}
article :slotted(p){
  margin-bottom:12px;
  font-size:16px;
  text-indent:32px;
}
article :slotted([data-mathDisplay]){
  margin:16px;
}
article :slotted(table){
  border-collapse:collapse;
  margin:16px auto;
}
article :slotted(table) td{
  padding:6px;
  border:1px solid #000;
}
article :slotted([data-graph]){
  max-width:500px;
  margin:16px auto;
}
article :slotted([data-split]){
  display:grid;
  gap:16px;
}

@media screen and (min-width:1000px){
  article :slotted([data-split]){
    grid-template-columns:repeat(2,1fr);
  }
}
</style>
