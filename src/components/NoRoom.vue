<template>
  <div class="wrapper">
      <div class="error main"  >
        <h1 class="error__title">{{t('Nothing to see here')}}.</h1>
        <h2 class="error__subtitle">{{t("There's no game with this code.")}}</h2>
        <button @click.prevent="goToRoom" class="join__button button">{{t('Go back')}}</button>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomToEnter:'',
    }
  },
  methods: {
    goToRoom() {
          this.$router.push('/');
    },
  },
  locales: {
    pt_br: {
      'Nothing to see here' : 'Nada para ver aqui',
      "There's no game with this code." : "Não há jogo com esse código.",
      'Go back' : 'Voltar'
    }
  }
};
</script>

<style>
</style>