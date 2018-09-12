<template>
  <div class="winner-indicator">
    <template v-if="winner==='assassin'">
      <div class="winner-indicator__motiff" :class="foundAssassin">
        <template v-if="foundAssassin === 'red'">{{t('Red found the bomb')}}</template>
        <template v-if="foundAssassin === 'blue'">{{t('Blue found the bomb')}}</template>
      </div>
      <div class="winner-indicator__winner" :class="turn">
        <template v-if="turn === 'red'">{{t('Red team won')}}</template>
        <template v-if="turn === 'blue'">{{t('Blue team won')}}</template>
      </div>
    </template>
    <template v-if="winner==='tie'">
      <div class="winner-indicator__motiff">
        {{t('All cards were found')}}
      </div>
      <div class="winner-indicator__winner">
        {{t('Tie game')}}
      </div>
    </template>
    <template v-else>
      <div class="winner-indicator__motiff" :class="winner">
        <template v-if="winner === 'red'">{{t('All red cards were found')}}</template>
        <template v-if="winner === 'blue'">{{t('All blue cards were found')}}</template>
       </div>
      <div class="winner-indicator__winner"  :class="winner" >
        <template v-if="winner === 'red'">{{t('Red team won')}}</template>
        <template v-if="winner === 'blue'">{{t('Blue team won')}}</template>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    turn: String,
    winner: String
  },
  computed: {
    foundAssassin() {
      return this.turn === "blue" ? "red" : "blue";
    }
  },
  locales: {
    pt_br: {
      'All red cards were found' : 'Cartas vermelhas encontradas',
      'All blue cards were found' : 'Cartas azuis encontradas',
      'Red team won' : 'Time vermelho venceu',
      'Blue team won' : 'Time azul venceu',
      'Red found the bomb' : 'Time vermelho explodiu',
      'Blue found the bomb' : 'Time azul explodiu',
      'All cards were found' : 'Todas as cartas foram encontradas',
      'Tie game' : 'Empate'
    }
  }
};
</script>