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
      add-title="新增视频"
      :add-template="addTemplate"
      @row-add="handleRowAdd"
      :loading="loading"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange">
      <el-button slot="header" style="margin-bottom: 5px" @click="newResource">新增视频</el-button>
    </d2-crud>
  </d2-container>
</template>

<script>
import { getVideo, deleteVideo, updateVideo, addVideo, getCourses } from '@/api/video'
import input from './input'

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
          title: '标题',
          key: 'name'
        },
        {
          title: 'url',
          key: 'url'
        },
        {
          title: '所属院系',
          key: 'facultyName'
        },
        {
          title: '所属课程',
          key: 'courseName'
        },
        {
          title: '上传者',
          key: 'teacherName'
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
          title: '资源标题',
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
          title: '标题',
          value: ''
        },
        url: {
          title: '视频',
          value: '',
          component: {
            name: input
          }
        },
        courseName: {
          title: '所属课程',
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
    getVideos (currentPage) {
      getVideo(currentPage)
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
        updateVideo(row.id, row)
          .then((res) => {
            if (res.data.code === 403) {
              alert('你没有操作权限')
            }
            if (res.data.code === 200) {
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
              this.getVideos()
              done()
            }
          }).catch((err) => {
            console.log(err)
          })
      } else {
        alert('数据不能为空')
      }
      done()
      this.getVideos()
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
      deleteVideo(row.id)
        .then((res) => {
          if (res.data.code === 403) {
            alert('你没有操作权限')
          }
          if (res.data.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getVideos()
            done()
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    newResource () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    },
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      if (row.name !== '' && row.url !== '' && row.courseName !== undefined) {
        addVideo(row.id, row)
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
              this.getVideos()
            }
          }).catch((err) => {
            console.log(err)
          })
      } else {
        done()
        this.getVideos()
        alert('资源不能为空')
      }
      this.formOptions.saveLoading = false
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.getVideos(currentPage)
    },
    initOptions () {
      getCourses()
        .then((res) => {
          if (res.data.code === 403) {
            alert('你没有操作权限')
          }
          if (res.data.code === 200) {
            this.addTemplate.courseName.component.options = res.data.data
          }
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getVideos()
    this.initOptions()
  }
}
</script>
