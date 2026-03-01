<template>
  <div class="layout-wrapper">
    <LayoutHeader/>
    <main class="main">
      <slot></slot>
    </main>
    <LayoutFooter/>
  </div>
</template>

<style scoped>
.layout-wrapper{
  height:100vh;
  min-height:100vh;
  display:flex;
  flex-direction:column;
}

.main{
  width:100%;
  max-width:700px;
  padding:32px 16px;
  margin:0 auto;
  flex-grow:1;
}
</style>
