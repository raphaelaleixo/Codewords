<template>
  <div class="wrapper">
      <form class="join main"  @submit.prevent="goToRoom">
        <h1 class="join__title">Join game:</h1>
        <input class="join__input" name="room" placeholder="room key" v-model="roomToEnter"/>
        <button class="join__button button">Enter game</button>
      </form>
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
          this.$router.push('/game/'+this.roomToEnter.toLowerCase()+'/codemaster/'+this.codemasterAllegiance);
    },
  }
};
</script>

<style>
</style>