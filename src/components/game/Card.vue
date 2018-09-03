<template>
  <div @click="selectCard()">
    <div class="card__wrapper">
      <div class="card__front">
        <span class="card__word">{{word}}</span>
      </div>
      <div class="card__back">
        <cross-icon class="card__icon" v-if="allegiance==='neutral'"/>
        <gun-icon class="card__icon" v-else-if="allegiance==='assassin'"/>
        <glasses-icon class="card__icon" v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import CrossIcon from '../icons/Cross.vue';
import GlassesIcon from '../icons/Glasses.vue';
import GunIcon from '../icons/Gun.vue';

export default {
  components: {
    CrossIcon,
    GlassesIcon,
    GunIcon
  },
  props: {
    id: Number,
    word: String,
    allegiance: String,
    visibility: String,
    isSelected: Boolean
  },
  computed: {
    showBackground() {
      if (this.visibility === "visible") {
        if (this.allegiance === "neutral") return "beige";
        else if (this.allegiance === "assassin") return "black";
        else return this.allegiance;
      } else {
        return "transparent";
      }
    }
  },
  methods: {
    selectCard() {
      this.$emit(this.isSelected ? "unselect" : "select", this);
    }
  }
};
</script>
<style lang="scss">
.card {
  font-size: 0.625em;
  font-weight: 900;
  width: calc(20% - 0.5em);
  flex: 0 0 auto;
  margin: 0.25em;
  perspective: 1000px;
  color: #222426;
  transition: transform 0.5s ease-out;
  &.card_selectable {
    cursor: pointer;
  }
  // &.selected {
  //   border-color: springgreen;
  //   cursor: pointer;
  // }
  @media screen and (min-width: 960px) {
    font-size: 1em;
  }

  &[class*="card_code"] {
    color: #fff;
  }
  &[class*="selected"] {
    cursor: pointer;
  }
  &.card_code-,
  &.card_turned- {
    &blue .card__front,
    &blue .card__back {
      background: #2ab7ca;
    }
    &red .card__front,
    &red .card__back {
      background: #fe4a49;
    }
    &neutral .card__front,
    &neutral .card__back {
      background: #b8b89c;
    }
    &assassin .card__front,
    &assassin .card__back {
      background: #222426;
    }
  }
}

.card__wrapper {
  height: 100%;
  position: relative;
  @media screen and (min-width: 960px) {
    height:100%;
    padding-bottom: 0;
  }
}

.card__front,
.card__back {
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0.5em;
  text-align: center;
  transition: transform 0.6s ease-out, box-shadow 0.3s ease-out;
  transform-style: preserve-3d;
}

.card__front {
  background: #fefefe;
  transform: rotateY(0deg);
  [class*="turned"] & {
    transform: rotateY(180deg);
  }
}

.card__back {
  transform: rotateY(180deg);
  [class*="turned"] & {
    transform: rotateY(0deg);
  }
  @media screen and (min-width: 960px) {
    .card__icon {
      transform:scale(1.75);
    }
  }
}

.card__word {
  color: inherit;
  text-transform: uppercase;
  line-height: 1;
}


</style>

