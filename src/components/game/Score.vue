<template>
  <div class="score">
      <div class="score__red">{{redScore}}/{{redTotal}} red</div>
      <div class="score__blue">blue {{blueScore}}/{{blueTotal}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      redScore: Number,
      blueScore: Number,
      firstPlayer: String
    },
    computed: {
      redTotal() {
        return this.firstPlayer === 'red' ? 9 : 8;
      },
      blueTotal() {
        return this.firstPlayer === 'blue' ? 9 : 8;
      }
    }
  }
</script>