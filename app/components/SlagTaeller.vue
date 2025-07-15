<script lang="ts" setup>
const digitAmount = 5

const { data: hitcount } = await useFetch('/api/hitcounter')

const digitsArray = computed(() => String(hitcount.value).padStart(digitAmount, '0').split(''))
</script>

<template>
  <div class="hit-counter">
    <span v-for="(digit, index) in digitsArray" :key="index">
      {{ digit }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.hit-counter {
  font-family: "WWDigital", sans-serif;
  border: lightgray 1.75px solid;
  background-color: var(--black);
  padding: 0.1em 0.25em;

  span {
    margin: 0 0.1em;
    color: rgb(0, 236, 0);
    font-weight: 700;
  }
}
</style>
