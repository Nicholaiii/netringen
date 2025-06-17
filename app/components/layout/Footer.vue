<script lang="ts" setup>
const { locales, setLocale } = useI18n()
</script>

<template>
  <footer>
    <span class="rights">
      {{ $t("footer.no_rights_reserved") }}
      <img src="@/assets/img/pirate_flag.gif" alt="pirate flag" />
    </span>
    <span>
      <span v-for="(locale, index) in locales" :key="index">
        <button
          :class="{ active: locale.code === $i18n.locale }"
          @click="setLocale(locale.code)"
        >
          {{ locale.name }}
        </button>
        <span v-if="locale.code !== locales[locales.length - 1]?.code"> /</span>
      </span>
    </span>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1000px;
  width: 100%;
  padding: 10px 1em;
  background-image: url("@/assets/img/bg-stars.png");
  color: var(--white);
  margin-bottom: 2em;
  border-bottom: 2px solid var(--black-light);
  border-left: 2px solid var(--black-light);
  border-right: 2px solid var(--black-light);

  .rights {
    display: flex;
    align-items: center;

    img {
      height: 1.2em;
      margin-left: 7.5px;
    }
  }

  @media (max-width: 700px) {
    font-size: 0.75em;
  }
}

button {
  background-color: transparent;
  border: none;
  color: var(--white);
  cursor: pointer;
  font-size: 1em;
  margin-left: 10px;

  &.active {
    font-weight: bold;
    color: var(--green);
    text-decoration: underline;
  }

  &:hover {
    text-decoration: underline;
  }
}
</style>
