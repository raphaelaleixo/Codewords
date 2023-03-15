<template>
  <div class="game-code wrapper" :class="turn">
    <div class="game-code__main main">
      <div class="game-code__text-area">
        <div class="game-code__title">{{ t("Room Code:") }}</div>
        <div class="game-code__code">{{ room }}</div>
        <p class="game-code__text">
          {{
            t(
              "Your game is ready. Please ask the codemasters to scan the QRcode to access their data."
            )
          }}
        </p>
        <p class="game-code__text">
          {{ t("They can also join using the url") }}
          <a class="game-code__link" href="http://cdwrds.ludoratory.com/join"
            >cdwrds.ludoratory.com/join</a
          >
          {{ t("and entering the room code.") }}
        </p>
        <button class="game-code__button" @click="closeCode()">
          {{ t("play game") }}
        </button>
        <div class="game-code__starting" v-if="turn === 'blue'">
          {{ t("Blue team will start this game") }}
        </div>
        <div class="game-code__starting" v-if="turn === 'red'">
          {{ t("Red team will start this game") }}
        </div>
      </div>
      <div class="game-code__qr">
        <qrcode
          :options="{
            size: 1000,
            background: '#f4f4f8',
            foreground: '#091619'
          }"
          :value="'http://cdwrds.ludoratory.com/game/' + room + '/codemaster/'"
        >
        </qrcode>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    turn: String,
    room: String
  },
  methods: {
    closeCode() {
      this.$emit("closeCodeModal");
    }
  },
  locales: {
    pt_br: {
      "Room Code:": "Código da sala:",
      "Your game is ready. Please ask the codemasters to scan the QRcode to access their data.":
        "Seu jogo está pronto. Peça aos codemasters para escanearem o QRcode para acessarem seus dados",
      "They can also join using the url": "Eles também podem usar a url",
      "and entering the room code.": "e entrar com o código da sala.",
      "play game": "jogar",
      "Blue team will start this game": "O time azul começará o jogo",
      "Red team will start this game": "O time vermelho começará o jogo"
    },
    fr: {
      "Room Code:": "Code de chambre:",
      "Your game is ready. Please ask the codemasters to scan the QRcode to access their data.":
        "Votre jeu est prêt. Veuillez demander aux codemasters de scanner le QRcode pour accéder à leurs données.",
      "They can also join using the url":
        "Ils peuvent également rejoindre en utilisant l'URL",
      "and entering the room code.": "et entrer le code de la chambre.",
      "play game": "jouer",
      "Blue team will start this game": "L'équipe bleue commencera le jeu",
      "Red team will start this game": "L'équipe rouge commencera le jeu"
    }
  }
};
</script>
