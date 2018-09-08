<template>
  <div id="app" class="base">
    <background/>
    <transition name="page">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Background from './components/base/Background.vue'
export default {
  name: 'app',
  components: {
    Background
  }
}
</script>

<style>



</style>
