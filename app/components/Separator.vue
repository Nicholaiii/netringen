<template>
  <div class="separator">
    <img
      v-if="preferredMotion === 'reduce'"
      src="@/assets/img/x_separator.jpg"
      alt="separator"
    />
    <img v-else src="@/assets/img/x_separator.gif" alt="separator" />
  </div>
</template>

<script lang="ts" setup>
const preferredMotion = usePreferredReducedMotion();
</script>

<style scoped lang="scss">
.separator {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em 0;

  img {
    width: 100%;
    max-width: 750px;
    height: auto;
  }
}
</style>
