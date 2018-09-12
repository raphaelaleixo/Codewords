<template>
  <div class="wrapper">
      <div class="error main"  >
        <h1 class="error__title">{{t('Something went wrong')}}.</h1>
        <h2 class="error__subtitle">{{t("It wasn't possible to process your request: There might be a problem with your room code or with the internet connection.")}}</h2>
        <button @click.prevent="goToRoom" class="join__button button">{{t('Go back')}}</button>
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
      this.$router.push("/");
    }
  },
  locales: {
    pt_br: {
      "Something went wrong": "Algo deu errado",
      "It wasn't possible to process your request: There might be a problem with your room code or with the internet connection.":
      "Não foi possível processar seu chamado: Pode ter algum problema com o código do jogo, ou com a sua conexão à internet.",
      "Go back": "Voltar"
    }
  },
  mounted() {
    this.$translate.setLang(localStorage.lang);
  }
};
</script>