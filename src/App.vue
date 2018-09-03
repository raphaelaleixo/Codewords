<template>
  <div id="app" class="base">
    <background/>
    <router-view></router-view>
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
