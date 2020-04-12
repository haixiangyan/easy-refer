<template>
    <footer>
        有任何问题或者新想法，可以联系：
        <el-link href="mailto:haixiang6123@gmail.com">haixiang6123@gmail.com</el-link>
    </footer>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "nuxt-property-decorator"

  @Component
  export default class Footer extends Vue {

  }
</script>

<style scoped lang="scss">
    footer {
        padding: 20px 0;
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 100%;
        transform: translateX(-50%);
        text-align: center;
        border-top: 1px solid $border-color;
        color: #303133;
        font-size: 16px;
    }
</style>
