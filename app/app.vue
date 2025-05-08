<script setup lang="ts">
useSeoMeta({
  title: 'Netringen',
  description: 'En webring for danske hjemmesider.'
})
</script>

<template>
  <div class="center tykkelse">
    <PageTitle />
    <NuxtPage />
  </div>
</template>

<style>
.center {
  margin: auto;
}

.tykkelse {
  width: 500px;
}
</style>