<template>
    <Menu class="menu" mode="vertical" active-name="1">
        <header>
            <MenuItem class="logo-menu-item" name="0" to="/">
                <img class="logo" src="../assets/img/logo.png" alt="logo">
            </MenuItem>
        </header>
        <nav>
            <MenuItem name="1" to="/public">
                <Icon type="md-home" />
                内推广场
            </MenuItem>
            <MenuItem name="2" to="/application">
                <Icon type="md-clipboard" />
                申请内推
            </MenuItem>
            <MenuItem name="3" to="/job">
                <Icon type="md-briefcase"/>
                发布职位
            </MenuItem>
            <MenuItem name="4" to="/user">
                <Icon type="md-person" />
                个人信息
            </MenuItem>
        </nav>
    </Menu>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"

  @Component
  export default class ReMenu extends Vue {

  }
</script>

<style scoped lang="scss">
    .menu {
        height: 100%;
    }
    .logo-menu-item {
        text-align: center;
        .logo {
            width: 10em;
            height: 10em;
        }
    }
</style>
