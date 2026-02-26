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

<style>
.layout{
  display:flex;
}
article{
  max-width:800px;
  padding:32px 16px;
  margin:0 auto;
}
article section{
  margin:32px;
  scroll-margin-top:24px;
}
article h1,
article h2,
article h3{
  font-weight:700;
}
article h1{
  margin-bottom:36px;
  font-size:38px;
}
article h2{
  margin-bottom:28px;
  font-size:32px;
}
article h3{
  margin-bottom:24px;
  font-size:26px;
}
article p{
  margin-bottom:12px;
  font-size:16px;
  text-indent:32px;
}
article [data-mathDisplay]{
  margin:16px;
}
article table{
  border-collapse:collapse;
  margin:16px auto;
}
article table td{
  padding:6px;
  border:1px solid #000;
}
article [data-graph]{
  max-width:500px;
  margin:16px auto;
}
article [data-split]{
  display:grid;
  gap:16px;
}

@media screen and (min-width:1000px){
  article :slotted([data-split]){
    grid-template-columns:repeat(2,1fr);
  }
}
</style>
