<template>

  <div class="welcome-screen wrapper">

    <div class="ludoratory header">

      <img class="ludoratory__logo" src="../assets/ludoratory.svg" />

    </div>

    <div class="welcome-screen__header main">

      <h1 class="welcome-screen__title">Code&#8203;words</h1>

      <h2 class="welcome-screen__subtitle">
         {{ t("A web-based version of Vlaada Chvátil’s party game") }}
      </h2>

      <div class="welcome-screen__actions">

        <button class="welcome-screen__button button" @click="createGame()">
           {{ t("new game") }}
        </button>

        <button class="welcome-screen__button-join button" @click="join()">
           {{ t("join game") }}
        </button>

      </div>

    </div>

    <div class="welcome-screen__footer footer">

      <a
        class="welcome-screen__link"
        target="_blank"
        href="https://medium.com/@raphaelaleixo/creating-codewords-a-real-time-multiplayer-boardgame-on-the-web-ca051071e75"
      >
         {{ t("About this project") }}
      </a>

      <a
        class="welcome-screen__link"
        target="_blank"
        href="https://medium.com/@raphaelaleixo/codewords-how-to-play-7b988ceb14b2"
      >
         {{ t("How to play") }}
      </a>

      <a
        @click="setLang('pt_br')"
        v-if="this.$translate.lang !== 'pt_br'"
        class="welcome-screen__link"
        href="#"
      >
         Versão em português
      </a>

      <a
        @click="setLang('fr')"
        v-if="this.$translate.lang !== 'fr'"
        class="welcome-screen__link"
        href="#"
      >
         Version en Français
      </a>

      <a
        @click="setLang('')"
        v-if="this.$translate.lang"
        class="welcome-screen__link"
        href="#"
      >
         English version
      </a>

    </div>

  </div>

</template>

<script>
import Words from "../data/Words";
import Words_ptbr from "../data/Words_ptbr";
import Words_fr from "../data/Words_fr";
import { getRandom } from "../utils/utils";
import { getDatabase, ref, push, set } from "firebase/database";

export default {
  data() {
    return {
      codemasterAllegiance: "blue",
      words: {
        default: getRandom(Words, 25),
        pt_br: getRandom(Words_ptbr, 25),
        fr: getRandom(Words_fr, 25),
      },
      devices: 1,
    };
  },
  computed: {
    firstTurn() {
      return parseInt(Math.random() * 2) === 0 ? "red" : "blue";
    },
    translatedWords() {
      if (this.$translate.lang === "pt_br") return this.words.pt_br;
      else if (this.$translate.lang === "fr") return this.words.fr;
      else return this.words.default;
    },
    map() {
      const colorMap = [];
      for (let i = 0; i < this.translatedWords.length - 2; i++) {
        if (i % 3 === 0) colorMap.push("red");
        else if (i % 3 === 1) colorMap.push("blue");
        else colorMap.push("neutral");
      }
      colorMap.push("assassin");
      colorMap.push(this.firstTurn);
      return [...getRandom(colorMap, 25)];
    },
    room() {
      return Math.random()
        .toString(36)
        .substr(2, 5);
    },
    cards() {
      const self = this;
      return this.translatedWords.map((word, index) => ({
        id: index,
        word: word,
        allegiance: self.map[index],
        visibility: "hidden",
        isSelected: false,
      }));
    },
  },
  methods: {
    join() {
      this.$router.push("/join");
    },
    getWords() {
      this.words = getRandom(Words, 25);
    },
    createGame() {
      const self = this;
      const online = navigator.onLine;
      const db = getDatabase();
      const gameRef = ref(db, "games");
      const newGameRef = push(gameRef);
      if (!online) {
        self.$router.push("/error/");
      } else {
        set(newGameRef, {
          room: this.room,
          devices: this.devices,
          cards: this.cards,
          firstTurn: this.firstTurn,
          turn: 0,
          code: {
            select: "word",
            word: "",
            count: 1,
          },
        }).then(() => {
          self.$router.push("/game/" + self.room + "/codebreaker");
        });
      }
    },
    setLang(lang) {
      localStorage.lang = lang;
      this.$translate.setLang(lang);
    },
  },
  locales: {
    pt_br: {
      "A web-based version of Vlaada Chvátil’s party game":
        "Uma versão web do party game de Vlaada Chvátil",
      "join game": "entrar em uma sala",
      "About this project": "Sobre este projeto",
      "How to play": "Como jogar",
      "new game": "novo jogo",
    },
    fr: {
      "A web-based version of Vlaada Chvátil’s party game":
        "Une version Web du jeu de société de Vlaada Chvátil",
      "join game": "Rejoins une partie",
      "About this project": "À propos de ce projet",
      "How to play": "Comment jouer",
      "new game": "Nouveau jeu",
    },
  },
  mounted() {
    this.$translate.setLang(localStorage.lang);
  },
};
</script>

