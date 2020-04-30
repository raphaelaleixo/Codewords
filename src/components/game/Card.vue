<template>
  <div @click="selectCard()">
    <div class="card__wrapper">
      <div class="card__front">
        <span class="card__word">{{ word }}</span>
      </div>
      <div class="card__back">
        <cross-icon class="card__icon" v-if="allegiance === 'neutral'" />
        <gun-icon class="card__icon" v-else-if="allegiance === 'assassin'" />
        <glasses-icon class="card__icon" v-else />
      </div>
    </div>
  </div>
</template>

<script>
import CrossIcon from "../icons/Cross.vue";
import GlassesIcon from "../icons/Glasses.vue";
import GunIcon from "../icons/Gun.vue";

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
