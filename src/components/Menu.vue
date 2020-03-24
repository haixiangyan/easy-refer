<template>
    <nav>
        <el-menu
            :default-active="$route.path"
            style="border-bottom: none"
            mode="horizontal"
            :router="true"
            class="menu">
            <el-menu-item class="logo-menu-item" index="/">
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
        </el-menu>
        <router-link to="/user" tag="span">
            <el-link icon="el-icon-user">{{authText}}</el-link>
        </router-link>
    </nav>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"

  @Component({
    computed: {
      authText() {
        return this.$store.state.auth.isLogin ? '个人' : '登录'
      }
    }
  })
  export default class ReMenu extends Vue {

  }
</script>

<style scoped lang="scss">
    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgb(230, 230, 230);
        .menu {
            border-bottom: none;
            .logo-menu-item {
                text-align: center;

                > img {
                    width: 4em;
                    height: 4em;
                }
            }
        }
    }
</style>
