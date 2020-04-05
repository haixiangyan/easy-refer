<template>
    <div class="app" :class="screenClass">
        <Menu v-if="!isLoginPage"/>
        <el-row class="main">
            <el-col :span="showIntro ? 16 : 24" class="view-wrapper">
                <router-view class="router-view"/>
            </el-col>
            <el-col :span="showIntro ? 8 : 0">
                <Intro v-if="showIntro"/>
            </el-col>
        </el-row>
        <Footer v-if="!isLoginPage"/>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import Menu from "@/components/Menu.vue"
  import Intro from "@/components/Intro.vue"
  import Footer from '@/components/Footer.vue'

  @Component({
    components: {Menu, Intro, Footer},
  })
  export default class App extends Vue {
    get loading() {
      return this.$store.state.loading
    }
    get screenClass(): string {
      return this.$route.name === "Login" ? "full-screen" : "normal-screen"
    }
    get isLoginPage(): boolean {
      return this.$route.name === "Login"
    }
    get showIntro() {
      return !this.isLoginPage && this.$store.state.auth.isLogin
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

        .view-wrapper {
            height: 100%;

            .router-view {
                padding: 0 24px;
            }
        }
    }

    .full-screen {
        padding-top: 0;
        height: 100vh;
        width: 100vw;
    }
</style>
