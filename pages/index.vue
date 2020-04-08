<template>
    <div></div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'nuxt-property-decorator'
  import {Context} from '@nuxt/types'

  @Component
  export default class extends Vue {
    middleware({redirect}: Context) {
      redirect('/job/list')
    }
  }
</script>

<style lang="scss"></style>
