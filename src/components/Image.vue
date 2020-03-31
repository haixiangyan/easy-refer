<template>
    <el-image :lazy="lazy" :src="src" class="image" fit="cover">
        <div slot="error" class="image-slot">
            <img style="width: 100%;" :src="errorSrc" alt="error">
        </div>
        <div slot="placeholder" class="image-slot">
            <p>
                <i class="image-loading-icon el-icon-picture-outline"></i>
            </p>
            <p class="image-text">加载中...</p>
        </div>
    </el-image>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component, Prop} from "vue-property-decorator"

  @Component
  export default class Image extends Vue {
    @Prop(Boolean) lazy = false
    @Prop({required: true, type: String}) src!: string
    @Prop(String) errorSrc: string = 'https://dummyimage.com/420x320/ff7f7f/333333.png&text=无'
  }
</script>

<style scoped lang="scss">
.image {
    width: 80%;
    background: #f5f7fa;
    &-slot {
        height: 140px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    &-loading-icon {
        font-size: 1.5em;
        color: #c0c4cc;
    }
    &-text {
        color: #c0c4cc;
    }
}
</style>
