<script setup lang="ts">
import type {Point} from '@/types/d3';

defineProps<{
  dataset:Point[];
}>();
</script>

<template>
  <table>
    <tr>
      <th>Size (m<sup>2</sup>)</th>
      <td v-for="point in dataset">
        {{ point.x }}
      </td>
    </tr>
    <tr>
      <th>Price ($)</th>
      <td v-for="point in dataset">
        {{ point.y }}
      </td>
    </tr>
  </table>
</template>

<style scoped>
table{
  border-collapse:collapse;
}
table td,
table th{
  padding:12px;
  border:1px solid var(--text-color);
}
</style>
