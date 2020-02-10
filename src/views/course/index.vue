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
      add-title="新增课程"
      :add-template="addTemplate"
      @row-add="handleRowAdd"
      :loading="loading"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange">
      <el-button slot="header" style="margin-bottom: 5px" @click="newCourse">新增课程</el-button>
    </d2-crud>
  </d2-container>
</template>

<script>
import { getCourse, deleteCourse, updateCourse, addCourse } from '@/api/course'
import { getMajorDTO } from '@/api/major'
import Tag from './Tag'
import input from './input'

export default {
  data () {
    return {
      columns: [
        {
          title: 'ID',
          key: 'id'
        },
        {
          title: '课程名',
          key: 'name'
        },
        {
          title: '封面图',
          key: 'cover'
        },
        {
          title: '学期',
          key: 'semester'
        },
        {
          title: '学分',
          key: 'credit'
        },
        {
          title: '学时',
          key: 'classHour'
        },
        {
          title: '所属专业',
          key: 'majors',
          component: {
            name: Tag
          }
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
          title: '课程名',
          value: ''
        },
        cover: {
          title: '封面图',
          value: ''
        },
        semester: {
          title: '学期',
          value: ''
        },
        credit: {
          title: '学分',
          value: ''
        },
        classHour: {
          title: '学时',
          value: ''
        },
        majors: {
          title: '所属专业',
          component: {
            name: 'el-checkbox',
            options: []
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
          title: '课程名',
          value: ''
        },
        cover: {
          title: '封面图',
          value: '',
          component: {
            name: input
          }
        },
        semester: {
          title: '学期',
          value: ''
        },
        credit: {
          title: '学分',
          value: ''
        },
        classHour: {
          title: '学时',
          value: ''
        }
      }
    }
  },
  inject: ['reload'],
  methods: {
    getCourses (currentPage) {
      getCourse(currentPage)
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
    handleRowEdit ({ index, row }, done) {
      this.formOptions.saveLoading = true
      if (row.name !== '' && row.cover !== '' &&
      row.semester !== '' && row.credit !== null &&
      row.classHour !== null && !isNaN(row.credit) && !isNaN(row.credit)) {
        updateCourse(row.id, row)
          .then((res) => {
            if (res.data.code === 403) {
              alert('你没有操作权限')
            }
            if (res.data.code === 200) {
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
              this.reload()
            }
          }).catch((err) => {
            console.log(err)
          })
      } else {
        alert('数据不能为空')
      }
      done()
      this.getCourses()
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
      deleteCourse(row.id)
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
    newCourse () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    },
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      if (row.name !== '' && row.cover !== '') {
        addCourse(row.id, row)
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
              this.getCourses()
            }
          }).catch((err) => {
            console.log(err)
          })
      } else {
        done()
        this.getCourses()
        alert('课程名不能为空')
      }
      this.formOptions.saveLoading = false
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.getCourses(currentPage)
    },
    initMajorDTO () {
      getMajorDTO()
        .then((res) => {
          if (res.data.code === 403) {
            alert('你没有操作权限')
          }
          if (res.data.code === 200) {
            this.editTemplate.majors.component.options = res.data.data
          }
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.initMajorDTO()
    this.getCourses()
  }
}
</script>
