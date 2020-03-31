<template>
    <el-image :lazy="lazy" :src="src" class="image" fit="cover">
        <div slot="error" class="image-slot">
            <img :src="errorSrc" alt="error">
        </div>
        <div slot="placeholder" class="image-slot">
            <img :src="placeholderSrc" alt="placeholder">
        </div>
    </el-image>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component, Prop} from "vue-property-decorator"

  @Component
  export default class CompanyImage extends Vue {
    @Prop(Boolean) lazy = false
    @Prop({required: true, type: String}) src!: string
    errorSrc: string = 'https://dummyimage.com/420x320/ff7f7f/333333.png&text=无'
    placeholderSrc: string = 'https://dummyimage.com/420x320/ff7f7f/333333.png&text=等'
  }
</script>

<style scoped lang="scss">
.image {
    width: 80%;
    img {
        width: 100%;
    }
}
</style>
