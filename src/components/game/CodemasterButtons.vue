<template>
  <div class="codemaster-buttons footer">
    <button
      class="codemaster-ui__button codemaster-ui__button_ok"
      :disabled="select === 'word'"
      @click="prevStep"
    >
      {{ t("Back") }}
    </button>
    <button
      class="codemaster-ui__button codemaster-ui__button_ok"
      :disabled="word.length === 0 || disabled"
      @click="nextStep"
    >
      Ok
    </button>
  </div>
</template>

<script>
import { eventBus } from "../../main";
export default {
  props: {
    disabled: Boolean,
    select: String,
    word: String,
    count: Number
  },
  methods: {
    vibrate(milisseconds) {
      navigator.vibrate =
        navigator.vibrate ||
        navigator.webkitVibrate ||
        navigator.mozVibrate ||
        navigator.msVibrate;
      if (navigator.vibrate) {
        navigator.vibrate(milisseconds);
      }
    },
    nextStep() {
      this.vibrate(50);
      if (this.select === "word") this.chooseNumber();
      else this.commitCode();
    },
    chooseNumber() {
      eventBus.$emit("codeChanged", {
        word: this.word,
        select: "count",
        count: this.count
      });
    },
    prevStep() {
      this.vibrate(50);
      eventBus.$emit("codeChanged", {
        word: this.word,
        select: "word",
        count: this.count
      });
    },
    commitCode() {
      this.$emit("countSelected");
    }
  },
  locales: {
    pt_br: {
      Back: "Voltar"
    },
    fr: {
      Back: "Retour"
    }
  }
};
</script>
