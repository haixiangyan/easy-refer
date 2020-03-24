<template>
    <footer>
        有任何问题或者新想法，可以联系：
        <el-link href="haixiang6123@gmail.com">haixiang6123@gmail.com</el-link>
    </footer>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"

  @Component
  export default class Footer extends Vue {

  }
</script>

<style scoped lang="scss">
    @import "~@/assets/styles/variables.scss";
    footer {
        padding: 20px 0;
        text-align: center;
        border-top: 1px solid $border-color;
        color: #303133;
        font-size: 16px;
    }
</style>
