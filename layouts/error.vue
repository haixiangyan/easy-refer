<template>
    <div class="error">
        <div class="error-text">
            <i class="el-icon-document-delete"></i>
            <span v-if="error.statusCode === 404">找不到该网页</span>
            <span v-else>页面出错啦</span>
        </div>
        <div class="home-link">
            <nuxt-link to="/">返回主页</nuxt-link>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop} from 'nuxt-property-decorator'
  import {NuxtError} from '@nuxt/types'

  @Component
  export default class error extends Vue {
    @Prop()
    error!: NuxtError
  }
</script>

<style scoped lang="scss">
    .error {
        text-align: center;
        font-size: 1.2em;

        .error-text {
            padding: 24px;
            text-align: center;
            color: $danger-color;
        }
        .home-link a {
            color: $primary-color;
        }
    }
</style>
