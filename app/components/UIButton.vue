<script setup lang="ts">
const attrs = useAttrs()
</script>

<template>
  <button v-bind="attrs">
    <span class="button-inner">
      <slot />
    </span>
  </button>
</template>

<style scoped lang="scss">
button {
  border: 1px solid var(--black);
  background-color: var(--purple);
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: var(--blue);
  }

  .button-inner {
    display: block;
    padding: 2px 12px;
    text-align: center;
    border-left: 2px solid var(--white);
    border-top: 2px solid var(--white);
    font-weight: bold;
    color: var(--black);
    border-radius: 10px;
    font-size: 0.8rem;
  }
}
</style>
