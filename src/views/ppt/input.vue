<template>
  <el-upload
        drag
        action=""
        accept=".ppt,.txt"
        :http-request="handleFile"
        :before-upload="onBeforeUpload"
        :auto-upload="true"
        :limit="1">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传 PPT 文件</div>
    </el-upload>
</template>
<script>
import axios from 'axios'
import util from '@/libs/util.js'

export default {
  data () {
    return {
      uploadFile: ''
    }
  },
  methods: {
    onBeforeUpload (file) {
      this.uploadFile = file
    },
    handleFile (param) {
      const formData = new FormData()
      formData.append('file', this.uploadFile)
      formData.append('type', 'PPT')
      console.log('开始上传')
      console.log('file' + this.uploadFile)
      axios({
        method: 'post',
        url: 'http://localhost:8888/courseResource/res',
        headers: {
          'Authorization': 'Bearer ' + util.cookies.get('token')
        },
        data: formData
      })
        .then((res) => {
          if (res.data.code === 403) {
            alert('你没有操作权限')
          }
          if (res.data.code === 200) {
            this.$emit('input', res.data.data)
            console.log(res.data.data)
            param.onSuccess()
          }
        }).catch((err) => {
          console.log(err)
          param.onError()
        })
    }
  }
}
</script>
