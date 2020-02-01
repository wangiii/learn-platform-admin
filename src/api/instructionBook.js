import axios from 'axios'
import util from '@/libs/util.js'

function getInstruction (currentPage) {
  let pageNum = 1
  let pageSize = 10
  if (currentPage != null) {
    pageNum = currentPage
  }
  return axios.get('http://localhost:8888/courseResource/type/INSTRUCTION?pageNum=' + pageNum + '&pageSize=' + pageSize, {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

function deleteInstruction (id) {
  return axios.delete('http://localhost:8888/courseResource/' + id, {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

function updateInstruction (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)

  return axios({
    method: 'put',
    url: 'http://localhost:8888/courseResource/' + id,
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    },
    data: param
  })
}

function addInstruction (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)
  param.append('url', row.url)
  param.append('course.id', row.courseName)
  param.append('type', 'INSTRUCTION')

  return axios({
    method: 'post',
    url: 'http://localhost:8888/courseResource/',
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    },
    data: param
  })
}

function getCourses () {
  return axios.get('http://localhost:8888/course/dto', {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

export { getInstruction, deleteInstruction, updateInstruction, addInstruction, getCourses }
