<script setup lang="ts">
import cursor from "~/utils/cursor.client.js";
const preferredMotion = usePreferredReducedMotion();

onMounted(() => {
  if (preferredMotion.value !== "reduce") cursor();
});

useSeoMeta({
  title: "komputer.club",
  description:
    "A webring and community for those who cherish the early web aesthetic.",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
