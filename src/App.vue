<template>
    <el-row class="app">
        <el-col class="pane" :span="3">
            <Menu v-if="$route.name !== 'Login'"/>
        </el-col>
        <el-col class="pane" :span="21">
            <router-view/>
        </el-col>
    </el-row>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component} from 'vue-property-decorator'
    import Menu from "@/components/Menu.vue"

    @Component({
      components: {Menu},
    })
    export default class App extends Vue {
    }
</script>

<style lang="scss">
    .app {
        height: 100vh;
        .pane {
            height: 100%;
        }
    }
</style>
