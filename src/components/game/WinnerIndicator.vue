<template>
  <div class="winner-indicator">
    <template v-if="winner==='assassin'">
      <div class="winner-indicator__motiff" :class="foundAssassin">{{foundAssassin}} found the assassin</div>
      <div class="winner-indicator__winner" :class="turn">
        {{turn}} won!
      </div>
    </template>
    <template v-else>
      <div class="winner-indicator__motiff" :class="winner">All {{winner}} agents were found</div>
      <div class="winner-indicator__winner"  :class="winner" >
        {{winner}} won!
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    turn: String,
    winner: String,
  },
  computed: {
    foundAssassin() {
      return this.turn==='blue'?'red':'blue'
    }
  }
};
</script>

<style lang="scss">
</style>
