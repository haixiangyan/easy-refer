<template>
    <div class="refer">
        <ReferItem></ReferItem>
        <ReferItem></ReferItem>
        <ReferItem></ReferItem>
        <ReferItem></ReferItem>
        <ReferItem></ReferItem>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import ReferItem from '@/components/ReferItem.vue'

  @Component({
    components: {ReferItem}
  })
  export default class Refer extends Vue {

  }
</script>

<style scoped lang="scss">

</style>
