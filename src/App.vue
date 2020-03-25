<template>
    <div class="app" :class="screenClass">
        <Menu v-if="!isLoginPage"/>
        <el-row class="main">
            <el-col :span="isLoginPage ? 24 : 16" class="view-wrapper">
                <router-view class="router-view"/>
            </el-col>
            <el-col :span="isLoginPage ? 0 : 8">
                <Intro v-if="!isLoginPage"/>
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
    computed: {
      screenClass() {
        return this.$route.name === 'Login' ? 'full-screen' : 'normal-screen'
      },
      isLoginPage() {
        return this.$route.name === 'Login'
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
        padding-bottom: 80px;
    }
    .main {
        height: 100%;
        .view-wrapper {
            height: 100%;
            .router-view {
                padding: 0 12px 0 24px;
            }
        }
    }
    .full-screen {
        padding-top: 0;
        height: 100vh;
        width: 100vw;
    }
</style>
