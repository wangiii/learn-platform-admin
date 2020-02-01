<template>
   <div>
        <div id="tag" v-for='item in list' :key='item.id'>
            <el-tag type="info">{{ item.name }}</el-tag>
        </div>
  </div>
</template>

<script>
export default {
  props: {
    scope: {
      default: null
    }
  },
  data () {
    return {
      list: null
    }
  },
  mounted () {
    if (this.scope.row.courses) {
      this.list = this.scope.row.courses
    }
  }
}
</script>
<style>
#tag {
    margin-bottom: 2px;
}
</style>
