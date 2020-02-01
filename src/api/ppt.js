import axios from 'axios'
import util from '@/libs/util.js'

function getPPT (currentPage) {
  let pageNum = 1
  let pageSize = 10
  if (currentPage != null) {
    pageNum = currentPage
  }
  return axios.get('http://localhost:8888/courseResource/type/PPT?pageNum=' + pageNum + '&pageSize=' + pageSize, {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

function deletePPT (id) {
  return axios.delete('http://localhost:8888/courseResource/' + id, {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

function updatePPT (id, row) {
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

function addPPT (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)
  param.append('url', row.url)
  param.append('course.id', row.courseName)
  param.append('type', 'PPT')

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

export { getPPT, deletePPT, updatePPT, addPPT, getCourses }
