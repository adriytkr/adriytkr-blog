<script setup lang="ts">
const props=defineProps<{
  matchCount:number;
  query:string;
}>();

const {t}=useI18n();
const feedbackMessage=computed<string>(
  ()=>t(
    'projectsPage.search.results',
    {
      query:props.query,
      count:props.matchCount,
    },
    props.matchCount,
  )
);
</script>

<template>
  <p>
    {{feedbackMessage}}
  </p>
</template>
