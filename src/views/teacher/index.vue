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
      add-title="新增教师"
      :add-template="addTemplate"
      @row-add="handleRowAdd"
      :loading="loading"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange">
      <el-button slot="header" style="margin-bottom: 5px" @click="newTeacher">新增教师</el-button>
      <el-input slot="header" style="margin-bottom: 5px"
        prefix-icon="el-icon-search"
        v-model="searchPhone"
        placeholder="请输入手机号"></el-input>
    </d2-crud>
  </d2-container>
</template>

<script>
import { getTeacher, deleteTeacher, updateTeacher, getOptions, addTeacher, getSearchTeacher } from '@/api/teacher'
import { getMajorDTO } from '@/api/major'
import { getCourseDTOForAdmin } from '@/api/course'
import majorTag from './majorTag'
import courseTag from './courseTag'

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
        },
        {
          title: '所教专业',
          key: 'majors',
          component: {
            name: majorTag
          }
        },
        {
          title: '所教课程',
          key: 'courses',
          component: {
            name: courseTag
          }
        }
      ],
      searchPhone: '',
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
        },
        majors: {
          title: '所教专业',
          component: {
            name: 'el-checkbox',
            options: []
          }
        },
        courses: {
          title: '所教课程',
          component: {
            name: 'el-checkbox',
            options: []
          }
        }
      },
      addTemplate: {
        name: {
          title: '教师名称',
          value: ''
        },
        phone: {
          title: '教师手机',
          value: ''
        },
        password: {
          title: '教师密码',
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
      }
    }
  },
  inject: ['reload'],
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
            this.reload()
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
              done()
              this.reload()
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
    },
    initCourseDTO () {
      getCourseDTOForAdmin()
        .then((res) => {
          if (res.data.code === 403) {
            alert('你没有操作权限')
          }
          if (res.data.code === 200) {
            this.editTemplate.courses.component.options = res.data.data
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    newTeacher () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    },
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      if (row.name !== '' && row.phone !== '' && row.password !== '') {
        addTeacher(row.id, row)
          .then((res) => {
            if (res.data.code === 403) {
              alert('你没有操作权限')
            }
            if (res.data.code === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.reload()
            }
          }).catch((err) => {
            console.log(err)
          })
      } else {
        alert('教师信息不能为空')
      }
      done()
      this.formOptions.saveLoading = false
    },
    search (phone) {
      getSearchTeacher(phone)
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
    this.getTeachers()
    this.initOptions()
    this.initMajorDTO()
    this.initCourseDTO()
  },
  watch: {
    searchPhone: function (val) {
      if (val !== '') {
        this.search(val)
      } else {
        this.getTeachers()
      }
    }
  }
}
</script>
