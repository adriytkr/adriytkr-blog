<script setup lang="ts">
import type { ViewMode } from '~/types/filter';

defineProps<{
  to:string;
  thumbnail:string;
  alt?:string;
  tags:string[];
  viewMode:ViewMode;
}>();

defineEmits<{
  (e:'select-tag',tag:string):void;
}>();
</script>

<template>
  <NuxtLinkLocale
    :to="to"
    class=""
    :class="[
      viewMode==='grid'
        ?'hover:scale-110 focus:scale-110 transition-transform duration-200'
        :'flex'
    ]"
  >
    <img
      class="object-cover aspect-video rounded-sm"
      :class="[
        viewMode==='grid'
          ?'mb-4 w-full'
          :'w-64 mr-4'
      ]"
      :src="thumbnail"
      :alt="alt"
    />
    <div class="flex flex-col">
      <div class="flex flex-col flex-1 mb-4">
        <h2 class="mb-2 font-bold text-xl">
          <slot name="title"></slot>
        </h2>
        <slot name="description"></slot>
      </div>
      <div class="flex flex-wrap gap-x-2">
        <ProjectsCardTag
          v-for="tag in tags"
          :key="tag"
          @click.stop.prevent="$emit('select-tag',tag)"
        >
          {{ $t(`tags.${tag}`) }}
        </ProjectsCardTag>
      </div>
    </div>
  </NuxtLinkLocale>
</template>
