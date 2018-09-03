<template>
  <div class="score">
      <div class="score__red">{{redScore}} red</div>
      <div class="score__blue">blue {{blueScore}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      redScore: Number,
      blueScore: Number
    }
  }
</script>

<style lang="scss">

</style>
