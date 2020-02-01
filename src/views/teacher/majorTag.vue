<template>
   <div>
        <div id="tag" v-for='item in list' :key='item.id'>
            <el-tag type="success">{{ item.name }}</el-tag>
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
    if (this.scope.row.majors) {
      this.list = this.scope.row.majors
    }
  }
}
</script>
<style>
#tag {
    margin-bottom: 2px;
}
</style>
