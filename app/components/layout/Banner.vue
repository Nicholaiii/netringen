<template>
  <div class="banner">
    <div class="content">{{ $t("welcome_to_netringen") }}</div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.banner {
  height: 35px;
  width: calc(100% + 35px);
  max-width: calc(1000px + 35px);
  background-image: url("@/assets/img/banner-bg.svg");
  color: var(--white);
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
    background-color: #0f052d;
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
    background-color: #0f052d;
    z-index: -1;
  }
}
</style>
