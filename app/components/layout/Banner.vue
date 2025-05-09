<template>
  <div class="banner">
    <div class="content">Banner?</div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.banner {
  height: 35px;
  width: 1030px;
  background-color: var(--blue-light);
  border: 2px solid var(--blue);
  position: relative;
  display: flex;
  padding: 0 2em;
  align-items: center;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
  }

  &::before {
    content: "";
    position: absolute;
    display: block;
    top: -20px;
    left: -2px;
    width: 20px;
    height: 20px;
    clip-path: polygon(100% 0, 0% 100%, 100% 100%);
    background-color: var(--blue);
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    display: block;
    top: -20px;
    right: -2px;
    width: 20px;
    height: 20px;
    clip-path: polygon(0 0, 100% 100%, 0 100%);
    background-color: var(--blue);
    z-index: -1;
  }
}
</style>
