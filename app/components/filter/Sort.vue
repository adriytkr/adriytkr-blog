<script setup lang="ts">
import type { SortingMode } from '~/types/filter';

const selectedSortingMode=defineModel<SortingMode>({
  default:'sorted',
});

const isOpen=ref<boolean>(false);

function selectSortingMode(mode:SortingMode){
  selectedSortingMode.value=mode;
  isOpen.value=false;
}
</script>

<template>
  <div class="flex items-center gap-x-2">
    Sort by
    <div class=relative>
      <button
        @click="isOpen=!isOpen"
        class="flex items-center text-primary"
      >
        {{ $t(`filter.${selectedSortingMode}`) }}
        <!-- Chevron Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor"
        >
          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
        </svg>
      </button>
      <div
        v-if="isOpen"
        class="absolute right-0 top-full w-40 flex flex-col bg-surface shadow-md rounded-sm"
      >
        <FilterSortButton @click="selectSortingMode('sorted')">A-Z</FilterSortButton>
        <FilterSortButton @click="selectSortingMode('unsorted')">Z-A</FilterSortButton>
      </div>
    </div>
  </div>
</template>
