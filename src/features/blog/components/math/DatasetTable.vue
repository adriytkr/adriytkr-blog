<script setup lang="ts">
import type {Point} from '@/shared/types/d3';

defineProps<{
  dataset:Point[];
}>();
</script>

<template>
  <table class="table">
    <tr class="table-row">
      <th class="table-row-header">Size (m<sup>2</sup>)</th>
      <td class="table-row-cell" v-for="point in dataset">
        {{ point.x }}
      </td>
    </tr>
    <tr class="table-row">
      <th class="table-row-header">Price ($)</th>
      <td class="table-row-cell" v-for="point in dataset">
        {{ point.y }}
      </td>
    </tr>
  </table>
</template>

<style scoped>
.table{
  border-collapse:collapse;
}

.table-row-cell,
.table-row-header{
  padding:12px;
  border:1px solid var(--text-color);
}
</style>
