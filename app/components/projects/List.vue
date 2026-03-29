<script setup lang="ts">
import { PLACEHOLDER_IMAGE_PATH } from '~/constants/projects';
import type { Project } from '~/types/content';
import type { ViewMode } from '~/types/recommendations';

defineProps<{
  projects:Project[];
  viewMode:ViewMode;
}>();
</script>

<template>
  <div
    :class="[
      viewMode==='grid'
        ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
        :'flex flex-col gap-y-6'
    ]"
  >
    <ProjectsCard
      v-for="project in projects"
      :img="project.thumbnail??PLACEHOLDER_IMAGE_PATH"
      :to="`/projects/${project.stem.split('/').pop()}`"
      :tags="project.tags??[]"
      :view-mode="viewMode"
    >
      <template #title>{{project.title}}</template>
      <template #description>
        <p :class="[viewMode==='grid'?'block':'hidden']">{{project.description}}</p>
        <p :class="[viewMode==='list'?'block':'hidden']">{{ project.longDescription }}</p>
      </template>
    </ProjectsCard>
  </div>
</template>
