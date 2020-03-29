<template>
    <div class="test">
        test

        {{hello}}
    </div>
</template>

<script>
    import Vue from "vue"
    import xxx from '@/graphql/hello.graphql'
    import {Component} from "vue-property-decorator"

    @Component
    export default class XXXX extends Vue {
        hello = ''

        mounted() {
            this.load()
        }

        async load() {
            try {
                const {data} = await this.$apollo.query({
                    query: xxx,
                    variables: {
                        eee: 'fuck'
                    }
                })
                console.log(data)
            } catch (error) {
                this.$message.error(error.message)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
