<template>
    <div class="app" :class="screenClass">
        <Menu v-if="$route.name !== 'Login'"/>
        <router-view/>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import Menu from "@/components/Menu.vue"

  @Component({
    components: {Menu},
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
        margin: 0 auto;
    }
    .normal-screen {
        min-width: 600px;
        max-width: 1100px;
    }
    .full-screen {
        height: 100vh;
        width: 100vw;
    }
</style>
