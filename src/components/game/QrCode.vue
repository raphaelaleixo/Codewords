<template>
  <div class="game-code wrapper" :class="turn">
    <div class="game-code__main main">
      <div class="game-code__text-area">
        <div class="game-code__title">Room Code:</div>
        <div class="game-code__code">{{room}}</div>
        <p class="game-code__text">Your game is ready. Please ask the codemasters to scan the QR CODE to access their data.</p>
        <p class="game-code__text">they can also join using the url codewords.ludoratory.com/join and entering the room code.</p>
        <button class="game-code__button" @click="closeCode()">play game</button>
      </div>
      <div class="game-code__qr">
        <qrcode :options="{size:1000, background:'#f4f4f8', foreground:'#091619'}"
                  :value="'http://codewords.ludoratory.com/game/'+room+'/codemaster/'">
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
        this.$emit('closeCodeModal');
      }
    }
  }
</script>