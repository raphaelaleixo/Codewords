<template>
  <div class="game" v-if="game.cards">
    <border :winner="winner" :turn="handleTurn" :player="player"/>
    <qr-code :turn="handleTurn.allegiance"
          :room="room" @closeCodeModal="closeCodeModal"
          v-if="player.role==='codebreaker' && showRoom===true"></qr-code>
    <div v-else class="wrapper">
      <div class="game__header header">         
        <score :redScore="redScore" :blueScore="blueScore" :firstPlayer="game.firstTurn"/>
        <turn-indicator 
          v-if="!winner"
          :player="player"
          :turn="handleTurn" :code="game.code"></turn-indicator>
        <winner-indicator :winner="winner" :turn="handleTurn.allegiance" v-else></winner-indicator>  
      </div>
      <div class="game__main main">
        <div class="board" :class="[handleTurn.allegiance, {'winner':winner}]">
          <card v-for="(card) in game.cards" :key="card.id"
            class="card hyphenate"
            @select="selectCard($event)"
            @unselect="unselectCard($event)"
            :class="[player.role==='codemaster' ? 'card_code-'+card.allegiance : '',
                    card.visibility==='visible' ? 'card_turned-'+card.allegiance : '',
                    {'card_selectable':handleTurn.role==='codebreaker' && player.role === 'codebreaker' && selectedCards.length<game.code.count,
                    'card_selected':card.isSelected}
                    ]"
            :id="card.id"
            :allegiance="card.allegiance"
            :word="card.word"
            :is-selected="card.isSelected"
            :visibility="card.visibility">
          </card>
        </div>
          <codemaster-keyboard v-if="player.role==='codemaster'"
          :disabled="handleTurn.role !== player.role"
          :turn="handleTurn.allegiance"
          :select="game.code.select"
          :word="game.code.word"
          :count="game.code.count" 
          :max="game.cards.length - reveledCards"
          />
      </div> 
      <codemaster-buttons v-if="player.role==='codemaster' && !winner"
          @countSelected="commitCode"
          :disabled="handleTurn.role !== player.role"
          :count="game.code.count"
          :select="game.code.select"
          :word="game.code.word" />
      <codebreaker-buttons v-if="player.role==='codebreaker' && !winner" 
          :room="room" 
          :turn="handleTurn.allegiance"
          :code="game.code"
          :selectedCards="selectedCards.length"
          @showRoom="openCodeModal"
          @commitSelection="commitSelection"/>
      <div class="game__restart footer" v-if="winner">
        <button class="button" @click="newGame()">Restart</button>
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
import { database } from "../utils/utils";
import { eventBus } from "../main";

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
    TurnIndicator
  },
  data() {
    return {
      id: "",
      showRoom: true,
      room: this.$route.params.room,
      game: {},
      player: {
        role: this.$route.params.role,
        allegiance: this.$route.params.allegiance
      }
    };
  },
  computed: {
    reveledCards() {
      return this.game.cards.filter(
        agentCard => agentCard.visibility === "visible"
      ).length;
    },
    selectedCards() {
      return this.game.cards.filter(
        agentCard => agentCard.isSelected && agentCard.visibility === "hidden"
      );
    },
    redScore() {
      return this.game.cards.filter(
        agentCard =>
          agentCard.allegiance === "red" && agentCard.visibility === "visible"
      ).length;
    },
    blueScore() {
      return this.game.cards.filter(
        agentCard =>
          agentCard.allegiance === "blue" && agentCard.visibility === "visible"
      ).length;
    },
    assassinShown() {
      return this.game.cards.filter(
        agentCard =>
          agentCard.allegiance === "assassin" &&
          agentCard.visibility === "visible"
      ).length;
    },
    winner() {
      if (this.assassinShown) {
        return "assassin";
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
      }
    },
    handleTurn() {
      const first = this.game.firstTurn;
      const second = firstToPlay => (firstToPlay === "red" ? "blue" : "red");
      const allegiance = this.game.turn % 4 < 2 ? first : second(first);
      const role = this.game.turn % 2 === 0 ? "codemaster" : "codebreaker";
      return {
        allegiance,
        role
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
    }
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
      const ids = this.selectedCards.map(item => item.id);
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
      const self = this;
      const ref = database.ref("games");
      ref
        .orderByChild("room")
        .equalTo(this.room)
        .once("value", function(snapshot) {
          snapshot.forEach(function(child) {
            child.ref.update(self.game);
          });
        });
    },
    newGame() {
      const ref = database.ref("games");
      ref
        .orderByChild("room")
        .equalTo(this.room)
        .once("value")
        .then(snapshot => {
          database.ref("games/" + snapshot.node_.children_.root_.key).remove();
        });
      this.$router.push("/");
    }
  },
  created() {
    const self = this;
    const ref = database
      .ref("games")
      .orderByChild("room")
      .equalTo(this.room);
    ref.on("child_added", function(snapshot) {
      self.game = snapshot.val();
    });
    ref.on("child_changed", function(snapshot) {
      self.game = snapshot.val();
    });
    eventBus.$on("codeChanged", code => {
      this.game.code = code;
    });
  },
  beforeRouteEnter(to, from, next) {
    database
      .ref("games")
      .orderByChild("room")
      .equalTo(to.params.room)
      .once("value", snapshot => {
        if (!snapshot.exists()) {
          next("/error/");
        }
      });
    if (to.params.role !== "codemaster" && to.params.role !== "codebreaker") {
      next("/error/");
    }
    else {
      next();
    }
  }
};
</script>



