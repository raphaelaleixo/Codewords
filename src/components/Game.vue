<template>

  <div class="game" v-if="game.cards">

    <border :winner="winner" :turn="handleTurn" :player="player" />

    <qr-code
      :turn="handleTurn.allegiance"
      :room="room"
      @closeCodeModal="closeCodeModal"
      v-if="player.role === 'codebreaker' && showRoom === true"
    ></qr-code>

    <div v-else class="wrapper">

      <div class="game__header header">

        <score
          :redScore="redScore"
          :blueScore="blueScore"
          :firstPlayer="game.firstTurn"
        />

        <turn-indicator
          v-if="!winner"
          :player="player"
          :turn="handleTurn"
          :code="game.code"
        ></turn-indicator>

        <winner-indicator
          :winner="winner"
          :turn="handleTurn.allegiance"
          v-else
        ></winner-indicator>

      </div>

      <div class="game__main main">

        <div class="board" :class="[handleTurn.allegiance, { winner: winner }]">

          <card
            v-for="card in game.cards"
            :key="card.id"
            class="card hyphenate"
            @select="selectCard($event)"
            @unselect="unselectCard($event)"
            :class="[
              player.role === 'codemaster'
                ? 'card_code-' + card.allegiance
                : '',
              card.visibility === 'visible'
                ? 'card_turned-' + card.allegiance
                : '',
              {
                card_selectable:
                  handleTurn.role === 'codebreaker' &&
                  player.role === 'codebreaker' &&
                  selectedCards.length < game.code.count,
                card_selected: card.isSelected,
              },
            ]"
            :id="card.id"
            :allegiance="card.allegiance"
            :word="card.word"
            :is-selected="card.isSelected"
            :visibility="card.visibility"
          >

          </card>

        </div>

        <codemaster-keyboard
          v-if="player.role === 'codemaster'"
          :disabled="handleTurn.role !== player.role"
          :turn="handleTurn.allegiance"
          :select="game.code.select"
          :word="game.code.word"
          :count="game.code.count"
          :max="game.cards.length - reveledCards"
        />

      </div>

      <codemaster-buttons
        v-if="player.role === 'codemaster' && !winner"
        @countSelected="commitCode"
        :disabled="handleTurn.role !== player.role"
        :count="game.code.count"
        :select="game.code.select"
        :word="game.code.word"
      />

      <codebreaker-buttons
        v-if="player.role === 'codebreaker' && !winner"
        :room="room"
        :turn="handleTurn.allegiance"
        :code="game.code"
        :selectedCards="selectedCards.length"
        @showRoom="openCodeModal"
        @commitSelection="commitSelection"
      />

      <div class="game__restart footer" v-if="winner">

        <button class="button" @click="newGame()">{{ t("Restart") }}</button>

      </div>

    </div>

  </div>

</template>

<script>
import Border from "./game/Border.vue";
import Card from "./game/Card.vue";
import Score from "./game/Score.vue";
import CodemasterKeyboard from "./game/CodemasterKeyboard.vue";
import CodemasterButtons from "./game/CodemasterButtons.vue";
import CodebreakerButtons from "./game/CodebreakerButtons.vue";
import TurnIndicator from "./game/TurnIndicator.vue";
import WinnerIndicator from "./game/WinnerIndicator.vue";
import QrCode from "./game/QrCode.vue";
import { eventBus } from "../main";
import {
  getDatabase,
  query,
  orderByChild,
  equalTo,
  ref,
  onValue,
  onChildAdded,
  onChildChanged,
  update,
  remove,
} from "firebase/database";

const db = getDatabase();
const getRoomRef = (room) =>
  query(ref(db, "games"), orderByChild("room"), equalTo(room));

export default {
  components: {
    Border,
    Card,
    CodemasterKeyboard,
    CodebreakerButtons,
    CodemasterButtons,
    Score,
    QrCode,
    WinnerIndicator,
    TurnIndicator,
  },
  data() {
    return {
      id: "",
      showRoom: true,
      room: this.$route.params.room,
      game: {},
      player: {
        role: this.$route.params.role,
        allegiance: this.$route.params.allegiance,
      },
    };
  },
  computed: {
    reveledCards() {
      return this.game.cards.filter(
        (agentCard) => agentCard.visibility === "visible"
      ).length;
    },
    selectedCards() {
      return this.game.cards.filter(
        (agentCard) => agentCard.isSelected && agentCard.visibility === "hidden"
      );
    },
    redScore() {
      return this.game.cards.filter(
        (agentCard) =>
          agentCard.allegiance === "red" && agentCard.visibility === "visible"
      ).length;
    },
    blueScore() {
      return this.game.cards.filter(
        (agentCard) =>
          agentCard.allegiance === "blue" && agentCard.visibility === "visible"
      ).length;
    },
    assassinShown() {
      return this.game.cards.filter(
        (agentCard) =>
          agentCard.allegiance === "assassin" &&
          agentCard.visibility === "visible"
      ).length;
    },
    winner() {
      if (this.assassinShown) {
        return "assassin";
      } else if (
        (this.redScore === 9 && this.blueScore === 8) ||
        (this.redScore === 8 && this.blueScore === 9)
      ) {
        return "tie";
      } else if (
        this.redScore === 9 ||
        (this.redScore === 8 && this.game.firstTurn === "blue")
      ) {
        return "red";
      } else if (
        this.blueScore === 9 ||
        (this.blueScore === 8 && this.game.firstTurn === "red")
      ) {
        return "blue";
      } else {
        return false;
      }
    },
    handleTurn() {
      const first = this.game.firstTurn;
      const second = (firstToPlay) => (firstToPlay === "red" ? "blue" : "red");
      const allegiance = this.game.turn % 4 < 2 ? first : second(first);
      const role = this.game.turn % 2 === 0 ? "codemaster" : "codebreaker";
      return {
        allegiance,
        role,
      };
    },
    handleCodeMasterUI() {
      return this.game.devices === 1
        ? this.handleTurn.role === "codemaster" &&
            this.player.role === "codemaster"
        : this.handleTurn.role === "codemaster" &&
            this.handleTurn.allegiance === this.player.allegiance &&
            this.player.role === "codemaster";
    },
    handleCodeBreakerUI() {
      return (
        this.handleTurn.role === "codebreaker" &&
        this.player.role === "codebreaker"
      );
    },
  },
  methods: {
    closeCodeModal() {
      this.showRoom = false;
    },
    openCodeModal() {
      this.showRoom = true;
    },
    selectCard(card) {
      if (
        this.handleTurn.role === "codebreaker" &&
        this.player.role === "codebreaker" &&
        this.selectedCards.length < this.game.code.count
      ) {
        this.$set(this.game.cards[card.id], "isSelected", true);
      }
    },
    unselectCard(card) {
      this.$set(this.game.cards[card.id], "isSelected", false);
    },
    commitSelection() {
      const self = this;
      const ids = this.selectedCards.map((item) => item.id);
      for (let i = 0; i < ids.length; i++) {
        self.$set(self.game.cards[ids[i]], "visibility", "visible");
        self.$set(self.game.cards[ids[i]], "isSelected", false);
      }
      this.nextTurn();
      this.clearCodes();
      this.updateGameDB();
    },
    clearCodes() {
      this.game.code.select = "word";
      this.game.code.word = "";
      this.game.code.count = 1;
    },
    commitCode() {
      this.nextTurn();
      this.game.code.select = "word";
      this.updateGameDB();
    },
    nextTurn() {
      this.game.turn++;
    },
    updateGameDB() {
      const roomRef = getRoomRef(this.room);
      onValue(roomRef, (snapshot) => {
        snapshot.forEach((child) => {
          update(child.ref, self.game);
        });
      });
    },
    newGame() {
      const roomRef = getRoomRef(this.room);
      onValue(roomRef, (snapshot) => {
        snapshot.forEach((child) => {
          const childKey = child.key;
          remove(ref(db, "games/" + childKey));
        });
      });
      const ref = getRoomRef(this.room);
      this.$router.push("/");
    },
  },
  created() {
    const self = this;
    const roomRef = getRoomRef(this.room);
    onChildAdded(roomRef, (data) => {
      self.game = data.val();
    });
    onChildChanged(roomRef, (data) => {
      self.game = data.val();
    });
    eventBus.$on("codeChanged", (code) => {
      this.game.code = code;
    });
  },
  beforeRouteEnter(to, from, next) {
    const roomRef = getRoomRef(to.params.room);
    console.log(to.params.room);
    onValue(roomRef, () => {
      console.log(roomRef);
      // if (!snapshot.val()) {
      //   next("/error/");
      // }
    });
    if (to.params.role !== "codemaster" && to.params.role !== "codebreaker") {
      next("/error/");
    } else {
      next();
    }
  },
  locales: {
    pt_br: {
      Restart: "Recomeçar",
    },
    fr: {
      Restart: "Recommencer",
    },
  },
  mounted() {
    this.$translate.setLang(localStorage.lang);
  },
};
</script>

