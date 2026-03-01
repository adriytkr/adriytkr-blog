<script setup lang="ts">
const props=defineProps<{
  slug:string;
  sections:string[];
}>();
const {t}=useI18n();
</script>

<template>
  <nav class="toc">
    <h3 class="toc-list">Table of Contents</h3>
    <ul class="toc-list">
      <li
        class="toc-list-item"
        v-for="section in sections"
        :key="section"
      >
        <a :href="`#${section}`" class="toc-list-link">
          {{ t(`articles.${slug}.toc.${section}`) }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.toc{
  padding:32px;
}
.toc-title{
  margin-bottom:12px;
}

.toc-list{
  list-style:decimal;
  display:flex;
  flex-direction:column;
  row-gap:8px;
}
.toc-list-link{
  color:inherit;
  transition:color 100ms ease-in-out;
}
.toc-list-item:has(.toc-list-link:hover){
  color:rgb(var(--primary-color));
  text-decoration:underline;
}

/* @media screen and (min-width:1000px){
  .nav-wrapper{
    display:block;
  }
} */
</style>
