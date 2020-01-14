<template>
  <d2-container>
    <d2-crud
      :columns="columns"
      :data="data"
      :rowHandle="rowHandle"
      :edit-template="editTemplate"
      :form-options="formOptions"
      @row-edit="handleRowEdit"
      @dialog-cancel="handleDialogCancel"
      @row-remove="handleRowRemove">
    </d2-crud>
  </d2-container>
</template>

<script>
import { getCourse, deleteCourse, updateCourse } from '@/api/course'

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
        }
      ],
      data: [],
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
        }
      },
      formOptions: {
        labelWidth: '60px',
        labelPosition: 'left',
        saveLoading: false,
        gutter: 1
      }
    }
  },
  methods: {
    getCourses () {
      getCourse()
        .then((res) => {
          if (res.data.code === 403) {
            alert('你没有权限访问')
            this.$router.replace('/')
          }
          if (res.data.code === 200) {
            this.data = res.data.data
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    handleRowEdit ({ index, row }, done) {
      this.formOptions.saveLoading = true
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
            done()
            this.formOptions.saveLoading = false
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消编辑',
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
    }
  },
  mounted () {
    this.getCourses()
  }
}
</script>
