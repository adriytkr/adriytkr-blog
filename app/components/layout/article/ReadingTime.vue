<script setup lang="ts">
const props=defineProps<{
  minutes:number;
}>();

const {t}=useI18n();
const label=computed(()=>{
  if(props.minutes<60)return t('articles.readingTimeMin',{minutes:props.minutes});

  const hours=Math.floor(props.minutes/60);
  const remainingMinutes=props.minutes%60;

  if(remainingMinutes===0)return t('articles.readingTimeHour',{hours});
  return t('articles.readingTimeMixed',{hours,minutes:remainingMinutes});
});
</script>

<template>
  <time datetime="" class="article-readTime">
    <svg class="article-readTime-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
    </svg>
    <span class="article-readTime-title">{{ label }}</span>
  </time>
</template>

<style scoped>
.article-readTime{
  display:flex;
  align-items:center;
  column-gap:8px;
}
</style>
