<script lang="ts" setup></script>

<template>
  <header>
    <div class="logo">
      <NuxtLink to="/">
        <img
          src="@/assets/img/komputerclub-logo.png"
          alt="komputer.club logo"
        >
      </NuxtLink>
    </div>
    <aside>
      <HitCounter />
    </aside>
  </header>
</template>

<style lang="scss" scoped>
header {
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3em 1em;
  background-image: url("@/assets/img/bg-stars.png");
  border-top: 2px solid var(--black-light);
  border-left: 2px solid var(--black-light);
  border-right: 2px solid var(--black-light);
  color: var(--white);

  .logo {
    // center on mobile
    @media (max-width: 700px) {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }

  aside {
    @media (max-width: 700px) {
      display: none;
    }
  }
}
</style>
