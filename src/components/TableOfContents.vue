<script setup lang="ts">
import type {Heading} from '@/types/nav';

import {onBeforeUnmount, onMounted,ref} from 'vue';

const props = defineProps<{
  headings:Heading[];
}>();

const activeId=ref<string|null>(null);

let observer:IntersectionObserver|null=null;
onMounted(()=>{
  const sections=props.headings
    .map(heading=>document.querySelector(`section#${heading.id}`))
    .filter(Boolean) as Element[];

  observer=new IntersectionObserver(
    (entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting)activeId.value=entry.target.id;
      });
    },
    {
      rootMargin:'-30% 0px -30% 0px',
      threshold:0,
    }
  );

  console.log(sections);
  sections.forEach(section=>observer?.observe(section));
});
onBeforeUnmount(()=>{
  observer?.disconnect();
});
</script>

<template>
  <div class="nav-wrapper">
    <nav>
      <h4>On this page</h4>
      <ul>
        <li
          :class="{'active':activeId===heading.id}"
          v-for="heading in headings"
          :key="heading.id"
        >
          <a :href="`#${heading.id}`">{{ heading.title }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.nav-wrapper{
  padding:0 16px;
  display:none;
}
nav{
  padding:32px;
  position:sticky;
  top:0;
}
h4{
  margin-bottom:12px;
}
ul{
  list-style:none;
  display:flex;
  flex-direction:column;
  row-gap:6px;
}
ul>li>a{
  font-weight:600;
  color:#d4d4d4;
  transition:color 200ms ease-in-out;
}
ul>li>a:hover{
  color:#000;
}
ul>li{
  position:relative;
}
ul>li.active a{
  color:#000;
}
ul>li.active::before{
  content:'';
  width:4px;
  height:90%;
  background-color:#000;
  position:absolute;
  top:50%;
  right:104%;
  transform:translateY(-50%);
}

@media screen and (min-width:1000px){
  .nav-wrapper{
    display:block;
  }
}
</style>
