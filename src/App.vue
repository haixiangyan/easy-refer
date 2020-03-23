<template>
    <div id="app">
        <Menu mode="horizontal" active-name="1">
            <MenuItem class="logo-menu-item" name="0" to="/">
                <img class="logo" src="./assets/img/logo.png" alt="">
            </MenuItem>
            <MenuItem name="1" to="/public">
                内推广场
            </MenuItem>
            <MenuItem name="2" to="/application">
                内推申请
            </MenuItem>
            <MenuItem name="3" to="/job">
                发布职位
            </MenuItem>
            <MenuItem name="4" to="/user">
                个人信息
            </MenuItem>
        </Menu>
        <main>
            <router-view/>
        </main>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component} from 'vue-property-decorator'

    @Component({
      components: {}
    })
    export default class App extends Vue {

    }
</script>

<style lang="scss">
    a.logo-menu-item {
        display: flex;
        align-items: center;
        .logo {
            height: 40px;
            width: 40px;
        }
    }
</style>
