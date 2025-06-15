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
    <Separator />
    <section>
      <h2>{{ $t("join.webring") }}</h2>

      <p>
        {{ $t("join.webring_explanation") }}
      </p>

      <h3>{{ $t("join.how_to_join") }}</h3>
      <p>
        {{ $t("join.join_komputerclub_explanation") }}
      </p>
      <div class="register">
        <Register />
      </div>

      <h3>
        {{ $t("join.code_of_conduct") }}
      </h3>
      <p>
        {{ $t("join.code_of_conduct_reference") }}
        <a
          target="_blank"
          href="https://www.contributor-covenant.org/version/2/1/code_of_conduct/"
        >
          {{ $t("join.contributor_covenant_link") }}</a
        >
        {{ $t("join.and_the") }}
        <a target="_blank" href="https://yesterweb.org/#manifesto">
          {{ $t("join.yesterweb_manifesto_link") }}</a
        >.
      </p>
      <p>{{ $t("join.code_of_conduct_tldr") }}</p>
      <ul>
        <li>
          {{ $t("join.conduct_inclusive") }}
        </li>
        <li>
          {{ $t("join.conduct_responsibility") }}
        </li>
        <li>
          {{ $t("join.conduct_wellbeing") }}
        </li>
        <li>{{ $t("join.conduct_preserve") }}</li>
      </ul>
    </section>
    <Separator />
    <section>
      <h2>{{ $t("members.members") || "Members" }}</h2>
      <MembersList />
    </section>
    <Separator />
  </div>
</template>

<style lang="scss" scoped>
.register {
  margin: 2em 0;
}

ul {
  list-style-type: disc;

  li {
    margin-bottom: 0.5em;
  }
}
</style>
