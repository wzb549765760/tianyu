<template>
  <div id="app">
    <keep-alive><router-view v-if="$route.meta.keepAlive"/></keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
/*}*/
  html,body{
    width: 100%;
    height: 100%;
    padding: 0;
    margin: auto;
  }
  ul,li{
    padding: 0;
    margin: 0;
    list-style:none;
  }
</style>
