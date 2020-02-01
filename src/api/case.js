import axios from 'axios'
import util from '@/libs/util.js'

function getCase (currentPage) {
  let pageNum = 1
  let pageSize = 10
  if (currentPage != null) {
    pageNum = currentPage
  }
  return axios.get('http://localhost:8888/courseResource/type/CASE?pageNum=' + pageNum + '&pageSize=' + pageSize, {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

function deleteCase (id) {
  return axios.delete('http://localhost:8888/courseResource/' + id, {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

function updateCase (id, row) {
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

function addCase (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)
  param.append('url', row.url)
  param.append('course.id', row.courseName)
  param.append('type', 'CASE')

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

export { getCase, deleteCase, updateCase, addCase, getCourses }
