<template>
    <div class="home">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-facebook"></use>
        </svg>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {Component} from 'vue-property-decorator'

    @Component
    export default class Home extends Vue{
        msg = 'hello'
    }
</script>
