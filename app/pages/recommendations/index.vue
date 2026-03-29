<script setup lang="ts">
import type { Collections } from '@nuxt/content';

import { PLACEHOLDER_IMAGE_PATH } from '~/constants/projects';
import { normalizeCollectionName } from '~/utils/content';

const {locale}=useI18n();

const {data:recommendations}=await useAsyncData(
  `recommendations-${locale.value}`,
  async()=>{
    const normalizedCollectionName=normalizeCollectionName('recommendations',locale.value) as keyof Collections;
    const recommendations=await queryCollection(normalizedCollectionName).all();

    return recommendations;
  },
  {
    watch:[locale],
  },
);
</script>

<template>
  <h1 class="text-5xl mb-4">{{$t('recommendationsPage.title')}}</h1>
  <p class="mb-8">{{ $t('recommendationsPage.description') }}</p>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
    <BaseRecommendationCard
      v-for="recommendation in recommendations"
      :img="recommendation.thumbnail??PLACEHOLDER_IMAGE_PATH"
      :to="`/recommendations/${recommendation.stem.split('/').pop()}`"
      :categories="recommendation.categories"
      :status="recommendation.status"
    >
      <template #title>{{recommendation.title}}</template>
      <template #author>{{recommendation.author}}</template>
      <template #description>
        <p>{{recommendation.description}}</p>
      </template>
    </BaseRecommendationCard>
  </div>
</template>
