<template>
  <div class="turn-indicator">
    <div class="turn-indicator__player" :class="turn.allegiance">
      <template
        v-if="turn.allegiance === 'blue' && turn.role === 'codemaster'"
        >{{ t("blue codemaster's turn") }}</template
      >
      <template
        v-if="turn.allegiance === 'red' && turn.role === 'codemaster'"
        >{{ t("red codemaster's turn") }}</template
      >
      <template
        v-if="turn.allegiance === 'blue' && turn.role === 'codebreaker'"
        >{{ t("blue codebreaker's turn") }}</template
      >
      <template
        v-if="turn.allegiance === 'red' && turn.role === 'codebreaker'"
        >{{ t("red codebreaker's turn") }}</template
      >
    </div>
    <div class="turn-indicator__code" v-if="turn.role === player.role">
      <span class="turn-indicator__placeholder" v-if="code.word.length == 0">{{
        t("Type your codeword")
      }}</span>
      <span v-else>{{ code.word }}</span>
      <span v-if="turn.role === 'codebreaker' || code.select !== 'word'">
        {{ code.count }}
      </span>
    </div>
    <div class="turn-indicator__code" v-else>
      <template v-if="turn.role === 'codemaster'">{{
        t("Wait for codeword")
      }}</template>
      <template v-if="turn.role === 'codebreaker'">{{
        t("Wait selection")
      }}</template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player: Object,
    turn: Object,
    code: Object
  },
  locales: {
    pt_br: {
      "blue codemaster's turn": "turno do codemaster azul",
      "red codemaster's turn": "turno do codemaster vermelho",
      "blue codebreaker's turn": "turno do codebreaker azul",
      "red codebreaker's turn": "turno do codebreaker vermelho",
      "Wait for codeword": "Aguarde o código",
      "Wait selection": "Aguarde a escolha",
      "Type your codeword": "Digite seu código"
    },
    fr: {
      "blue codemaster's turn": "tour de codemaster bleu",
      "red codemaster's turn": "tour de codemaster rouge",
      "blue codebreaker's turn": "tour de codebreaker bleu",
      "red codebreaker's turn": "tour de codebreaker rouge",
      "Wait for codeword": "Attendez le mot de code",
      "Wait selection": "Attendez la sélection",
      "Type your codeword": "Tapez votre code"
    }
  }
};
</script>
