<script lang="ts" setup></script>

<template>
  <div class="container">
    <LayoutHeader />
    <LayoutBanner />
    <main><slot /></main>
    <LayoutFooter />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
  position: relative;

  main {
    max-width: 1000px;
    width: 100%;
    padding: 1em;
    background-color: var(--blue-dark);
    color: var(--white);
    border-bottom: 2px solid var(--black-light);
    border-left: 2px solid var(--black-light);
    border-right: 2px solid var(--black-light);
  }
}
</style>
