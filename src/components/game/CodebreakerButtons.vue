<template>
  <div class="codebreaker-ui footer" :class="turn">
    <div @click="showRoom" class="codebreaker-ui__room">
      {{ t("Room") }}:
      <span class="codebreaker-ui__room-code">{{ room }}</span>
    </div>
    <template v-if="code.word.length > 0">
      <span class="codebreaker-ui__selection" v-if="selectedCards < code.count">
        {{ t("Select") }} {{ code.count - selectedCards }}
        <template v-if="code.count - selectedCards > 1">{{
          t("more cards")
        }}</template>
        <template v-else>{{ t("more card") }}</template>
      </span>
      <button
        class="codebreaker-ui__selection selection__button"
        v-else
        @click="commitSelection()"
      >
        {{ t("Send selection") }}
      </button>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    room: String,
    turn: String,
    code: Object,
    selectedCards: Number
  },
  methods: {
    commitSelection() {
      this.$emit("commitSelection");
    },
    showRoom() {
      this.$emit("showRoom");
    }
  },
  locales: {
    pt_br: {
      Room: "Sala",
      Select: "Escolha mais",
      "more cards": "cartas",
      "more card": "carta",
      "Send selection": "Enviar escolha"
    },
    fr: {
      Room: "Chambre",
      Select: "Choisissez",
      "more cards": "autre cartes",
      "more card": "autre carte",
      "Send selection": "Envoyer la sélection"
    }
  }
};
</script>
