<template>
  <div class="game__border"
          :class="[winner=='red' ? 'red' : winner=='blue' ? 'blue' : turn.allegiance,
                   turn.role === player.role ? 'active' : '',
                   winner  ? 'active' : '']">
  </div>
</template>

<script>
  export default {
    props: {
      winner: String,
      turn: Object,
      player: Object
    }
    
  }
</script>

<style>

</style>