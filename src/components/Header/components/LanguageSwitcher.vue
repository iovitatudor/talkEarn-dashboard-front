<template>
  <div class="language-switcher">
    <ul>
      <li v-for="(language, key) in languages" :key="key">
        <a href="#"
           :class="{active : language.id === defaultLanguage.id }"
           @click="switchLanguage(language)">
          {{ language.abbr }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "LanguageSwitcher",
  computed: {
    ...mapGetters({
      languages: 'language/getLanguages',
      defaultLanguage: 'language/getDefaultLanguage',
    }),
  },
  methods: {
    ...mapActions({
      setDefaultLanguage: 'language/setDefaultLanguage',
    }),
    switchLanguage(language) {
      this.setDefaultLanguage(language);
    }
  }
}
</script>

<style lang="scss" scoped>
.language-switcher {
  ul {
    margin: auto 25px;

    li {
      display: inline-block !important;
      margin: auto 7px;
      font-size: 15px;

      a {
        color: #FFF;
        text-transform: uppercase;
        font-weight: 600;
      }

      .active {
        color: #2477FF;
      }
    }
  }
}
</style>