<template>
  <div class="turn-indicator">
    <div class="turn-indicator__player" :class="turn.allegiance">{{turn.allegiance}} {{turn.role}}'s turn</div>
    <div class="turn-indicator__code" v-if="turn.role === player.role">
      <span class="turn-indicator__placeholder" v-if="code.word.length==0">Type your codeword</span>
      <span v-else>{{code.word}}</span>
      <span v-if="turn.role==='codebreaker' || code.select!=='word'">
        {{code.count}}
      </span>
    </div>
    <div class="turn-indicator__code" v-else>
      Wait {{turn.role==='codemaster'?'for codeword':'selection'}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player: Object,
    turn: Object,
    code: Object
  }
};
</script>

<style lang="scss">
</style>
