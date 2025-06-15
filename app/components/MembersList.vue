<template>
  <div class="members-list">
    <ul>
      <li v-for="(member, index) in members" :key="index">
        <a :href="member" target="_blank" rel="noopener noreferrer">
          {{ member }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const members = [
  "https://nicolaj.me",
  "https://nicolaj.org",
  "https://nicolaj.net",
  "https://komputer.club",
];
</script>

<style lang="scss" scoped>
.members-list {
  margin: 2em 0;

  h3 {
    margin-bottom: 1em;
    color: var(--green);
  }

  ul {
    list-style: none;
    padding: 0;
    display: grid;
    gap: 0.5em;
  }
  a {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid var(--green);
    border-radius: 4px;
    padding: 0.5em;
    color: var(--white);
    text-decoration: none;
    display: block;
    word-break: break-all;

    &:hover {
      color: var(--green);
      text-decoration: underline;
      background: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
