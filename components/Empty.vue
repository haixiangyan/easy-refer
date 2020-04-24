<template>
    <div>
        <div class="empty">
            <i class="el-icon-document-delete"></i>
            <span class="text">{{emptyText}}</span>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop} from 'vue-property-decorator'

  @Component
  export default class Empty extends Vue {
    @Prop({type: String, default: '暂时没有数据哦~'})
    emptyText!: string
  }
</script>

<style scoped lang="scss">
    .empty {
        padding: 24px;
        text-align: center;
        font-size: 1.2em;
        line-height: 1.2em;
        color: $danger-color;
    }
</style>
