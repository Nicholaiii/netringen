<template>
  <header>
    <h1>Netringen</h1>
    <nav>
      <ul>
        <li><NuxtLink to="/">Navigation 1</NuxtLink></li>
        <li><NuxtLink to="/">Navigation 2</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
header {
  max-width: 1000px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5em 1em;
  margin-top: 2em;
  background-color: var(--white);
  border-top: 2px solid var(--black-light);
  border-left: 2px solid var(--black-light);
  border-right: 2px solid var(--black-light);

  ul {
    display: flex;
    gap: 1em;

    a {
      font-weight: 600;
      color: var(--black);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
