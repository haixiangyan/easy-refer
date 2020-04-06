<template>
    <ve-line
        :data="chartData"
        height="100%"
        :settings="chartSettings"
        :tooltip-visible="true"
        :legend-visible="false"
        :extend="options"
    />
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'

  @Component
  export default class ReferredLineChart extends Vue {
    chartSettings = {
      yAxisType: ['KMB']
    }
    chartData = {
      columns: ['date', 'referred'],
      rows: [
        {'date': '1/1', 'referred': 1393},
        {'date': '1/2', 'referred': 3530},
        {'date': '1/3', 'referred': 2923},
        {'date': '1/4', 'referred': 1723},
        {'date': '1/5', 'referred': 3792},
        {'date': '1/6', 'referred': 4593}
      ]
    }
    options = {
      xAxis: {
        show: false
      },
      yAxis: {
        show: false,
      },
      grid: {
        left: '-14%',
        top: 0,
        bottom: '-16%',
        right: 0
      },
      color: {
        type: 'linear',
        x: 0,
        y: 1,
        x2: 0,
        y2: 0,
        colorStops: [
          {offset: 0, color: '#EBEDF0'},
          {offset: 0.25, color: '#C6E48B'},
          {offset: 0.5, color: '#7BC96F'},
          {offset: 0.75, color: '#329A3B'},
          {offset: 1, color: '#1C6127'}],
      },
      series: {
        showSymbol: false
      },
    }
  }
</script>

<style scoped lang="scss">

</style>
