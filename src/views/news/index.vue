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
      add-title="新增新闻"
      :add-template="addTemplate"
      @row-add="handleRowAdd"
      :loading="loading"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange">
      <el-button slot="header" style="margin-bottom: 5px" @click="newNews">新增新闻</el-button>
    </d2-crud>
  </d2-container>
</template>

<script>
import { getNews, deleteNews, updateNews, addNews } from '@/api/news'

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
          title: '新闻标题',
          key: 'name'
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
          title: '新闻标题',
          value: ''
        },
        content: {
          title: '新闻内容',
          value: ''
        }
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false,
        gutter: 1
      },
      addTemplate: {
        name: {
          title: '新闻标题',
          value: ''
        },
        content: {
          title: '新闻内容',
          value: ''
        }
      }
    }
  },
  methods: {
    getNewses (currentPage) {
      getNews(currentPage)
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
      if (row.name !== '') {
        updateNews(row.id, row)
          .then((res) => {
            if (res.data.code === 403) {
              alert('你没有操作权限')
            }
            if (res.data.code === 200) {
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
              this.getNewses()
              done()
            }
          }).catch((err) => {
            console.log(err)
          })
      } else {
        done()
        alert('数据不能为空')
      }
      this.getNewses()
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
      deleteNews(row.id)
        .then((res) => {
          if (res.data.code === 403) {
            alert('你没有操作权限')
          }
          if (res.data.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getNewses()
            done()
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    newNews () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    },
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      if (row.name !== '') {
        addNews(row.id, row)
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
              this.getNewses()
            }
          }).catch((err) => {
            console.log(err)
          })
      } else {
        done()
        this.getNewses()
        alert('新闻标题不能为空')
      }
      this.formOptions.saveLoading = false
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.getNewses(currentPage)
    }
  },
  mounted () {
    this.getNewses()
  }
}
</script>
