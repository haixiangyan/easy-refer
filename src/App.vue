<template>
    <div id="app">
        <ReMenu/>
        <main>
            <router-view/>
        </main>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component} from 'vue-property-decorator'
    import ReMenu from "@/components/ReMenu.vue"

    @Component({
      components: {ReMenu}
    })
    export default class App extends Vue {

    }
</script>

<style lang="scss">
    #app {
        height: 100vh;
        display: flex;
    }
</style>
