<template>
    <el-menu
        :default-active="$route.path"
        mode="horizontal"
        :router="true"
        class="menu">
        <el-menu-item class="logo-menu-item">
            <img src="../assets/img/logo.png" alt="logo">
        </el-menu-item>
        <el-menu-item index="/public">
            <i class="el-icon-s-home"></i>
            <span slot="title">内推广场</span>
        </el-menu-item>
        <el-menu-item index="/application">
            <i class="el-icon-s-order"></i>
            <span slot="title">申请内推</span>
        </el-menu-item>
        <el-menu-item index="/job">
            <i class="el-icon-s-cooperation"></i>
            <span slot="title">发布职位</span>
        </el-menu-item>
        <el-menu-item index="/user">
            <i class="el-icon-user-solid"></i>
            <span slot="title">个人信息</span>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"

  @Component
  export default class ReMenu extends Vue {

  }
</script>

<style scoped lang="scss">
    .logo-menu-item {
        text-align: center;
        > img {
            width: 4em;
            height: 4em;
        }
    }
</style>
