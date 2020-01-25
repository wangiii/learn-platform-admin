<template>
  <d2-container>
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      :rowHandle="rowHandle"
      @row-remove="handleRowRemove"
      :edit-template="editTemplate"
      :form-options="formOptions"
      @row-edit="handleRowEdit"
      @dialog-cancel="handleDialogCancel"
      :loading="loading"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange">
    </d2-crud>
  </d2-container>
</template>

<script>
import { getTeacher, deleteTeacher, updateTeacher, getOptions } from '@/api/teacher'

export default {
  data () {
    return {
      columns: [
        {
          title: 'ID',
          key: 'id'
        },
        {
          title: '教师名称',
          key: 'name'
        },
        {
          title: '教师手机',
          key: 'phone'
        },
        {
          title: '所属院系',
          key: 'facultyName'
        }
      ],
      data: [],
      loading: false,
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      },
      rowHandle: {
        edit: {
          size: 'mini'
        },
        remove: {
          size: 'mini',
          fixed: 'right',
          confirm: true
        }
      },
      editTemplate: {
        name: {
          title: '教师名称',
          value: ''
        },
        facultyName: {
          title: '所属院系',
          value: '',
          component: {
            name: 'el-select',
            options: [],
            span: 12
          }
        }
        // majors: {
        //   title: '所教专业',
        //   component: {
        //     name: 'el-checkbox',
        //     options: []
        //   }
        // }
      },
      formOptions: {
        labelWidth: '70px',
        labelPosition: 'left',
        saveLoading: false,
        gutter: 1
      }
    }
  },
  methods: {
    getTeachers (currentPage) {
      getTeacher(currentPage)
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
      deleteTeacher(row.phone)
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
      this.getTeachers(currentPage)
    },
    handleRowEdit ({ index, row }, done) {
      this.formOptions.saveLoading = true
      if (row.name !== '' && row.facultyName !== null) {
        if (isNaN(row.facultyName)) {
          row.facultyName = row.facultyId
        }
        updateTeacher(row.phone, row)
          .then((res) => {
            if (res.data.code === 403) {
              alert('你没有操作权限')
            }
            if (res.data.code === 200) {
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
              this.getTeachers()
              done()
            }
          }).catch((err) => {
            console.log(err)
          })
      } else {
        done()
        alert('数据不能为空')
      }
      this.getTeachers()
      this.formOptions.saveLoading = false
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消操作',
        type: 'warning'
      })
      done()
    },
    initOptions () {
      getOptions().then((res) => {
        if (res.data.code === 403) {
          alert('你没有操作权限')
        }
        if (res.data.code === 200) {
          this.editTemplate.facultyName.component.options = res.data.data
          this.addTemplate.facultyName.component.options = res.data.data
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getTeachers()
    this.initOptions()
  }
}
</script>
