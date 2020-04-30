<template>
  <div class="wrapper">
    <form class="join main" @submit.prevent="goToRoom">
      <h1 class="join__title">{{ t("Join game") }}:</h1>
      <input
        class="join__input"
        name="room"
        :placeholder="t('room key')"
        v-model="roomToEnter"
      />
      <button class="join__button button">{{ t("Enter game") }}</button>
    </form>
    <div class="join join__footer footer">
      <router-link class="join join__back-link" to="/">{{
        t("go back")
      }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomToEnter: ""
    };
  },
  methods: {
    goToRoom() {
      this.$router.push(
        "/game/" + this.roomToEnter.toLowerCase() + "/codemaster/"
      );
    }
  },
  locales: {
    pt_br: {
      "Join game": "Entrar na sala",
      "room key": "Código",
      "Enter game": "Entrar",
      "go back": "voltar"
    },
    fr: {
      "Join game": "Rejoins une partie",
      "room key": "Code",
      "Enter game": "Entrer",
      "go back": "retour"
    }
  },
  mounted() {
    this.$translate.setLang(localStorage.lang);
  }
};
</script>
