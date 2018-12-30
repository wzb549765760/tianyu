<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  @import "assets/css/main.css";

  #app {
    min-width: 1280px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    /*margin-top: 60px;*/
  }

  html, body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: auto;
    overflow: hidden;
  }

  ul, li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
</style>
