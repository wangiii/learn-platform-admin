<template>
  <d2-container class="page">
    <template slot="header">按院系统计在线课程数量</template>
    <div class="inner">
      <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
    </div>
  </d2-container>
</template>

<script>
import { getFacultyPieRow } from '@/api/faculty'
export default {
  data () {
    this.chartSettings = {
      dimension: '院系',
      metrics: '在线课程数量'
    }
    return {
      chartData: {
        columns: ['院系', '在线课程数量'],
        rows: []
      }
    }
  },
  methods: {
    initRows () {
      getFacultyPieRow()
        .then((res) => {
          if (res.data.code === 403) {
            alert('你没有操作权限')
          }
          if (res.data.code === 200) {
            this.chartData.rows = res.data.data
          }
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.initRows()
  }
}
</script>

<style lang="scss" scoped>

</style>
