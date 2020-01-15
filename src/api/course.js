import axios from 'axios'
import util from '@/libs/util.js'

function getCourse () {
  return axios.get('http://localhost:8888/course/', {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

function deleteCourse (id) {
  return axios.delete('http://localhost:8888/course/' + id, {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

function updateCourse (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)
  param.append('cover', row.cover)
  param.append('semester', row.semester)
  param.append('credit', row.credit)
  param.append('classHour', row.classHour)
  console.log('row.cover:' + row.classHour)

  return axios({
    method: 'put',
    url: 'http://localhost:8888/course/' + id,
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    },
    data: param
  })
}

function addCourse (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)
  param.append('cover', row.cover)
  param.append('semester', row.semester)
  param.append('credit', row.credit)
  param.append('classHour', row.classHour)
  console.log('row.cover:' + row.classHour)

  return axios({
    method: 'post',
    url: 'http://localhost:8888/course/',
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    },
    data: param
  })
}

export { getCourse, deleteCourse, updateCourse, addCourse }
