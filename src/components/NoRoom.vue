<template>
  <div class="wrapper">
      <div class="error main"  >
        <h1 class="error__title">Nothing to see here.</h1>
        <h2 class="error__subtitle">There's no game with this code.</h2>
        <button @click.prevent="goToRoom" class="join__button button">Go back</button>
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
  }
};
</script>

<style>
</style>