<template>
    <div class="apply">
        apply
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"

  @Component
  export default class Apply extends Vue {
    mounted() {
      console.log(this.$route.params.jobId)
    }
  }
</script>

<style scoped lang="scss">

</style>
