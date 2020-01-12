<template>
  <d2-container>
    <d2-crud
      :columns="columns"
      :data="data"
      :rowHandle="rowHandle"
      @custom-emit-1="handleCustomEvent">
    </d2-crud>
  </d2-container>
</template>

<script>
import axios from 'axios'
import util from '@/libs/util.js'

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
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '更新时间',
          key: 'updateTime'
        }
      ],
      data: [],
      rowHandle: {
        custom: [
          {
            text: '修改',
            type: 'warning',
            size: 'small',
            emit: 'custom-emit-1'
          }
        ]
      }
    }
  },
  methods: {
    handleCustomEvent ({ index, row }) {
      console.log(index)
      console.log(row)
    },
    getCourse () {
      axios.get('http://localhost:8080/course/', {
        headers: {
          'Authorization': 'Bearer ' + util.cookies.get('token')
        }
      })
        .then((res) => {
          this.data = res.data.data
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getCourse()
  }
}
</script>
