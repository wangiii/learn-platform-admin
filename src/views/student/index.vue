<template>
  <d2-container>
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      :rowHandle="rowHandle"
      @row-remove="handleRowRemove"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange">
      <el-input slot="header" style="margin-bottom: 5px"
        prefix-icon="el-icon-search"
        v-model="searchPhone"
        placeholder="请输入手机号"></el-input>
    </d2-crud>
  </d2-container>
</template>

<script>
import { getStudent, deleteStudent, getSearchStudent } from '@/api/student'

export default {
  data () {
    return {
      columns: [
        {
          title: 'ID',
          key: 'id'
        },
        {
          title: '学生名称',
          key: 'name'
        },
        {
          title: '学生手机',
          key: 'phone'
        },
        {
          title: '所属院系',
          key: 'facultyName'
        },
        {
          title: '所属专业',
          key: 'majorName'
        }
      ],
      data: [],
      searchPhone: '',
      loading: false,
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      },
      rowHandle: {
        remove: {
          size: 'mini',
          fixed: 'right',
          confirm: true
        }
      }
    }
  },
  methods: {
    getStudents (currentPage) {
      getStudent(currentPage)
        .then((res) => {
          if (res.data.code === 403) {
            alert('你没有权限访问')
            this.$router.replace('/')
          }
          if (res.data.code === 200) {
            this.pagination.total = res.data.data.total
            this.pagination.pageSize = res.data.data.pageSize
            this.data = res.data.data.list
          }
          this.loading = false
        }).catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    handleRowRemove ({ index, row }, done) {
      deleteStudent(row.phone)
        .then((res) => {
          if (res.data.code === 403) {
            alert('你没有操作权限')
          }
          if (res.data.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            done()
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.getStudents(currentPage)
    },
    search (phone) {
      getSearchStudent(phone)
        .then((res) => {
          if (res.data.code === 403) {
            alert('你没有权限访问')
            this.$router.replace('/')
          }
          if (res.data.code === 200) {
            this.pagination.total = res.data.data.total
            this.pagination.pageSize = res.data.data.pageSize
            this.data = res.data.data.list
          }
          this.loading = false
        }).catch((err) => {
          console.log(err)
          this.loading = false
          this.pagination.total = 0
          this.pagination.pageSize = 0
          this.data = []
        })
    }
  },
  mounted () {
    this.getStudents()
  },
  watch: {
    searchPhone: function (val) {
      if (val !== '') {
        this.search(val)
      } else {
        this.getStudents()
      }
    }
  }
}
</script>
