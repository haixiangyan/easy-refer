<template>
    <ve-line
        :data="chartData"
        width="100%"
        height="80px"
        :settings="settings"
        :tooltip-visible="true"
        :legend-visible="false"
        :extend="options"
    />
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop} from 'nuxt-property-decorator'

  @Component
  export default class StatusChart extends Vue {
    @Prop({required: true})
    dataSource!: TLog[]
    @Prop({type: Number, default: 1000})
    max!: number

    settings = {
      labelMap: { // 别名
        date: '日期',
        count: '已处理'
      },
      yAxisType: ['KMB'] // 1000 -> 1k
    }

    options = {
      xAxis: {show: false},
      yAxis: {show: false, max: this.max},
      // Canvas 对于容器的位置
      grid: {left: '-16%', top: '10%', bottom: 0, right: 0},
      // 配置 y 轴方向的渐变色
      color: {
        type: 'linear',
        x: 0, y: 1, x2: 0, y2: 0,
        colorStops: [
          {offset: 0, color: '#EBEDF0'},
          {offset: 0.25, color: '#C6E48B'},
          {offset: 0.5, color: '#7BC96F'},
          {offset: 0.75, color: '#329A3B'},
          {offset: 1, color: '#1C6127'}],
      },
      // 不显示拆线上的节点
      series: {type: 'line', showSymbol: false},
    }

    get chartData() {
      return {
        columns: ['date', 'count'],
        rows: JSON.parse(JSON.stringify(this.dataSource))
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
