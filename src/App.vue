<template>
  <div id="app" class="base">
    <background/>
    <transition name="page">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Background from "./components/base/Background.vue";
export default {
  name: "app",
  components: {
    Background
  },
  mounted() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }
};
</script>
