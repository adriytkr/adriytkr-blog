<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader/>
    <main class="flex flex-col flex-1 px-4 py-12">
      <div class="w-full max-w-5xl mx-auto flex flex-1 flex-col">
        <slot></slot>
      </div>
    </main>
    <AppFooter/>
  </div>
</template>
