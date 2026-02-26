<script setup lang="ts">
import type {Heading} from '@/types/nav';

import TheHeader from './TheHeader.vue';
import TableOfContents from './TableOfContents.vue';

defineProps<{
  headings:Heading[];
}>();
</script>

<template>
  <div class="layout">
    <TheHeader/>
    <main>
      <article>
        <slot></slot>
      </article>
      <!-- <TableOfContents :headings="headings"/> -->
    </main>
  </div>
</template>

<style>
main{
  display:flex;
}
article{
  max-width:700px;
  padding:32px 16px;
  margin:0 auto;
}
article section{
  margin:32px 0;
  scroll-margin-top:24px;
}
article hr{
  width:100%;
  height:1px;
  background-color:#d4d4d4;
  border:none;
}
article h1,
article h2,
article h3{
  font-weight:700;
}
article h1{
  margin-bottom:48px;
  font-size:38px;
}
article h2{
  margin-bottom:28px;
  font-size:24px;
}
article h3{
  margin-bottom:20px;
  font-size:20px;
}
article p{
  margin-bottom:20px;
  font-size:16px;
  text-indent:32px;
}
article [data-table]{
  margin:16px auto;
}
article [data-mathDisplay]{
  margin:16px;
}
article [data-graph]{
  max-width:500px;
  margin:24px auto;
}
article [data-split]{
  display:grid;
  gap:16px;
}

@media screen and (min-width:1000px){
  article [data-split]{
    grid-template-columns:repeat(2,1fr);
  }
}
</style>
