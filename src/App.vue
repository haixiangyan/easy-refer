<template>
    <div class="app">
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
      menuWidth() {
        return this.$route.name === "Login" ? 0 : 3
      }
    }
  })
  export default class App extends Vue {
  }
</script>

<style lang="scss"></style>
