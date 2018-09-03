<template>
  <div class="codebreaker-ui footer" :class="turn">
    <div @click="showRoom" class="codebreaker-ui__room">Room:
      <span class="codebreaker-ui__room-code">{{room}}</span>
    </div>
    <template v-if="code.word.length > 0">
      <span class="codebreaker-ui__selection" v-if="selectedCards<code.count">Select {{code.count - selectedCards}} more {{code.count - selectedCards > 1 ? 'cards' : 'card'}}</span>
      <button class="codebreaker-ui__selection selection__button" v-else @click="commitSelection()">Send selection</button>
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
        this.$emit('commitSelection');
      },
      showRoom() {
        this.$emit('showRoom')
      }
    }
  }
</script> 

<style lang="scss">
</style>