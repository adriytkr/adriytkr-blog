<script setup lang="ts">
defineProps<{
  title:string;
}>();

const isExpanded=ref(false);
const heightRef=ref<HTMLDivElement|null>(null);
const innerRef=ref<HTMLDivElement|null>(null);
const height=ref(0);

const computeHeight=()=>{
  if(!heightRef.value||!innerRef.value)return 0;
  const r=isExpanded.value?innerRef.value.scrollHeight:0;
  height.value=r;
};

watch(isExpanded,computeHeight);

let resizeObserver:ResizeObserver|null=null;
onMounted(()=>{
  if(!heightRef.value||!innerRef.value)return;

  resizeObserver=new ResizeObserver((entries)=>{
    if(!isExpanded.value)return;
    const el=entries[0];
    if(!el)return;
    height.value=el.contentRect.height;
  });
  resizeObserver.observe(innerRef.value);
});

onBeforeUnmount(()=>resizeObserver?.disconnect());
</script>

<template>
  <section class="section">
    <div class="section-top">
      <h2 class="section-title">{{ title }}</h2>
      <button class="section-expandBtn" @click="isExpanded=!isExpanded">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
    </div>
    <div class="section-content" ref="heightRef">
      <div class="section-content-inner" ref="innerRef">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section{
  padding:12px;
  border:1px solid rgb(var(--divider-color));
}

.section-top{
  display:flex;
  justify-content:space-between;
  align-items:center;
}
.section-title{
  margin-bottom:0;
}
.section-expandBtn{
  background-color:transparent;
  border:none;
}

.section-content{
  height:v-bind(height+'px');
  overflow:hidden;
  transition:height 300ms;
}
</style>
