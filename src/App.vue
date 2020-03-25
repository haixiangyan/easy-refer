<template>
    <div class="app" :class="screenClass">
        <Menu v-if="$route.name !== 'Login'"/>
        <router-view class="main"/>
        <Footer v-if="$route.name !== 'Login'"/>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import Menu from "@/components/Menu.vue"
  import Footer from '@/components/Footer.vue'

  @Component({
    components: {Menu, Footer},
    computed: {
      screenClass() {
        return this.$route.name === 'Login' ? 'full-screen' : 'normal-screen'
      }
    }
  })
  export default class App extends Vue {
  }
</script>

<style lang="scss">
    .app {
        position: relative;
        margin: 0 auto;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        min-height: 100%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .normal-screen {
        padding-top: 80px;
        min-width: 600px;
        max-width: 1100px;
    }
    .main {
        padding-bottom: 80px;
    }
    .full-screen {
        padding-top: 0;
        height: 100vh;
        width: 100vw;
    }
</style>
