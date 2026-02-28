<script setup lang="ts">
defineProps<{
  label:string;
  min:number;
  max:number;
}>();

const model=defineModel<number>();
</script>

<template>
  <div class="input">
    <div class="input-number-wrapper">
      <label>{{ label }}=</label>
      <input
        type="number"
        class="input-number"
        v-model.number="model"
        :min="min"
        :max="max"
      />
    </div>
    <div class="input-slider-wrapper">
      <span>{{ min }}</span>
      <input
        type="range"
        class="input-slider"
        v-model.number="model"
        :min="min"
        :max="max"
      />
      <span>{{ max }}</span>
    </div>
  </div>
</template>

<style scoped>
.input-number{
  border:none;
  border-bottom:1px solid #000;
}
.input-number::-webkit-outer-spin-button,
.input-number::-webkit-inner-spin-button {
  appearance:none;
  margin:0;
}
.input-slider-wrapper{
  display:flex;
  align-items:center;
  column-gap:8px;
}
.input-slider{
  height:6px;
  appearance:none;
  background-color:#c4c4c4;
  border-radius:16px;
}
.input-slider::-webkit-slider-thumb,
.input-slider::-moz-range-thumb{
  background-color:red;
}
</style>
