<script setup lang="ts">
import cursor from "~/utils/cursor.client.js";
const preferredMotion = usePreferredReducedMotion();

onMounted(() => {
  if (preferredMotion.value !== "reduce") cursor();
});

useSeoMeta({
  title: "komputer.club",
  description: "En webring for danske hjemmesider.",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
