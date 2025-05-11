<template>
  <div class="hit-counter">
    <span v-for="(digit, index) in digitsArray" :key="index">
      {{ digit }}
    </span>
  </div>
</template>

<script lang="ts" setup>
const digitAmount = 5;
const hitcount = 123;

const digitsArray = computed(() => {
  const digits = String(hitcount).padStart(digitAmount, "0").split("");
  return digits.map((digit) => {
    return digit === "0" ? "0" : digit;
  });
});
</script>

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
