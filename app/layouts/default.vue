<template>
  <LayoutHeader/>
  <main class="main">
    <slot></slot>
  </main>
</template>

<style scoped>
.main{
  max-width:700px;
  padding:32px 16px;
  margin:0 auto;
}
</style>
