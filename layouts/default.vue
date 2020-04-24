<template>
    <div class="app" :class="screenClass">
        <Menu v-if="!isLoginPage"/>
        <el-row class="main">
            <nuxt class="router-view"/>
        </el-row>
        <Footer v-if="!isLoginPage"/>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'nuxt-property-decorator'
  import Menu from '@/components/Menu.vue'
  import Footer from '@/components/Footer.vue'

  @Component({
    components: {Menu, Footer},
  })
  export default class App extends Vue {
    get screenClass(): string {
      return this.$route.name === 'login' ? 'full-screen' : 'normal-screen'
    }

    get isLoginPage(): boolean {
      return this.$route.name === 'login'
    }
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
        padding-bottom: 80px;
    }

    .main {
        height: 100%;

        .router-view {
            padding: 0 24px;
        }
    }

    .full-screen {
        padding-top: 0;
        height: 100vh;
        width: 100vw;
    }
</style>
