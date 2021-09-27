<template>
  <div id="app">
    <MapsApp/>
  </div>
</template>

<script>
import MapsApp from './components/MapsApp.vue'

export default {
  name: 'App',
  components: {
    MapsApp
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
