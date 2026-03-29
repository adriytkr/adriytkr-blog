<script setup lang="ts">
const {
  fetch,
  searchQuery,
  selectedTags,
  selectedViewMode,
  filteredProjects,
  tags,
  tagFrequencyMap,
  reset,
}=useProjectsFilter();

fetch();
</script>

<template>
  <h1 class="text-5xl mb-4">{{$t('projectsPage.title')}}</h1>
  <p class="mb-8">{{ $t('projectsPage.description') }}</p>
  <div class="flex flex-col md:flex-row md:justify-between md:items-center">
    <FilterSearch v-model="searchQuery"/>
    <FilterSelectViewMode v-model="selectedViewMode"/>
  </div>
  <FilterCategory
    :categories="tags"
    :frequency="tagFrequencyMap"
    v-model="selectedTags"
  />
  <p v-if="filteredProjects.length>0" class="mb-4">
    RESULTS: {{ filteredProjects.length }} Matches found
  </p>
  <div class="flex flex-1 flex-col items-center justify-center" v-else>
    <p>No results</p>
    <button @click="reset">Clear search</button>
  </div>
  <ProjectsList
    :projects="filteredProjects??[]"
    :view-mode="selectedViewMode"
  />
</template>
