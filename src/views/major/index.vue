<template>
  <d2-container>
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      :rowHandle="rowHandle"
      :edit-template="editTemplate"
      :form-options="formOptions"
      @row-edit="handleRowEdit"
      @dialog-cancel="handleDialogCancel"
      @row-remove="handleRowRemove"
      add-title="新增专业"
      :add-template="addTemplate"
      @row-add="handleRowAdd"
      :loading="loading"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange">
      <el-button slot="header" style="margin-bottom: 5px" @click="newMajor">新增专业</el-button>
    </d2-crud>
  </d2-container>
</template>

<script>
import { getMajor, deleteMajor, updateMajor, addMajor, getOptions } from '@/api/major'

export default {
  data () {
    return {
      columns: [
        {
          title: 'ID',
          key: 'id',
          sortable: true
        },
        {
          title: '专业名',
          key: 'name'
        },
        {
          title: '所属院系',
          key: 'facultyName'
        },
        {
          title: '创建时间',
          key: 'createTime',
          sortable: true
        },
        {
          title: '更新时间',
          key: 'updateTime',
          sortable: true
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
          title: '专业名',
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
      },
      formOptions: {
        labelWidth: '70px',
        labelPosition: 'left',
        saveLoading: false,
        gutter: 1
      },
      addTemplate: {
        name: {
          title: '专业名',
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
      }
    }
  },
  methods: {
    getMajors (currentPage) {
      getMajor(currentPage)
        .then((res) => {
          if (res.data.code === 403) {
            alert('你没有权限访问')
            this.$router.replace('/')
          }
          if (res.data.code === 200) {
            this.data = res.data.data.list
            this.pagination.total = res.data.data.total
            this.pagination.pageSize = res.data.data.pageSize
          }
          this.loading = false
        }).catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    handleRowEdit ({ index, row }, done) {
      this.formOptions.saveLoading = true
      if (row.name !== '' && row.facultyName !== null) {
        updateMajor(row.id, row)
          .then((res) => {
            if (res.data.code === 403) {
              alert('你没有操作权限')
            }
            if (res.data.code === 200) {
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
              this.getMajors()
              done()
            }
          }).catch((err) => {
            console.log(err)
          })
      } else {
        done()
        alert('数据不能为空')
      }
      this.getMajors()
      this.formOptions.saveLoading = false
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消操作',
        type: 'warning'
      })
      done()
    },
    handleRowRemove ({ index, row }, done) {
      deleteMajor(row.id)
        .then((res) => {
          if (res.data.code === 403) {
            alert('你没有操作权限')
          }
          if (res.data.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getMajors()
            done()
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    newMajor () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    },
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      if (row.name !== '') {
        addMajor(row.id, row)
          .then((res) => {
            if (res.data.code === 403) {
              alert('你没有操作权限')
            }
            if (res.data.code === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              done()
              this.getMajors()
            }
          }).catch((err) => {
            console.log(err)
          })
      } else {
        done()
        this.getMajors()
        alert('专业名不能为空')
      }
      this.formOptions.saveLoading = false
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.getMajors(currentPage)
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
    this.getMajors()
    this.initOptions()
  }
}
</script>
