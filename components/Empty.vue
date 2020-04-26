<template>
    <div class="empty">
        <div class="hint">
            <i class="el-icon-warning"></i>
            <span class="text">{{emptyText}}</span>
        </div>
        <div class="action">
            <slot/>
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
        text-align: center;
        .hint {
            padding: 24px;
            font-size: 1.2em;
            line-height: 1.2em;
            color: $warning-color;
        }
        .action {}
    }
</style>
