<template>
  <div>
    <section>
      <h2>{{ $t("welcome.welcome_oslash") }}</h2>
      <p>
        {{ $t("welcome.about_komputerclub") }}
      </p>
      <p>
        {{ $t("welcome.why_komputerclub1") }}
      </p>
      <p>
        {{ $t("welcome.why_komputerclub2") }}
      </p>
    </section>
    <div class="separator">
      <img src="@/assets/img/x_separator.gif" alt="separator" />
    </div>
    <section>
      <h2>{{ $t("join.webring") }}</h2>

      <p>
        {{ $t("join.webring_explanation") }}
      </p>

      <h3>{{ $t("join.how_to_join") }}</h3>
      <p>
        {{ $t("join.join_komputerclub_explanation") }}
      </p>
      <div class="separator">
        <Register />
      </div>
      <h4>
        {{ $t("join.requirements") }}
      </h4>
      <ul>
        <li>
          {{ $t("join.requirements1") }}
        </li>
        <li>
          {{ $t("join.requirements2") }}
        </li>
        <li>
          {{ $t("join.requirements3") }}
        </li>
      </ul>

      <h3>
        {{ $t("join.code_of_conduct") }}
      </h3>
      <p>
        {{ $t("join.code_of_conduct_explanation") }}
      </p>
    </section>
    <div class="separator">
      <img src="@/assets/img/x_separator.gif" alt="separator" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

ul {
  list-style-type: disc;

  li {
    margin-bottom: 0.5em;
  }
}
</style>
