<template>
  <el-upload
        drag
        action=""
        accept=".doc,.docx,.pdf,.txt"
        :http-request="handleFile"
        :before-upload="onBeforeUpload"
        :auto-upload="true"
        :limit="1">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传 doc,docx,pdf,txt 文件</div>
    </el-upload>
</template>
<script>
import axios from 'axios'
import globalInfo from '@/api/global'

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
      formData.append('type', 'CASE')
      console.log('开始上传')
      console.log('file' + this.uploadFile)
      axios({
        method: 'post',
        url: globalInfo.baseURLWithPort + '/courseResource/res',
        headers: {
          'Authorization': globalInfo.authorizationToken
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
