<template>
    <div class="home">
        {{msg}}
        <Button type="primary">Primary</Button>
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
