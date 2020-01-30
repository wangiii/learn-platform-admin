import axios from 'axios'
import util from '@/libs/util.js'

function getVideo (currentPage) {
  let pageNum = 1
  let pageSize = 10
  if (currentPage != null) {
    pageNum = currentPage
  }
  return axios.get('http://localhost:8888/courseResource/type/VIDEO?pageNum=' + pageNum + '&pageSize=' + pageSize, {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

function deleteVideo (id) {
  return axios.delete('http://localhost:8888/courseResource/' + id, {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

function updateVideo (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)
  param.append('url', row.url)

  return axios({
    method: 'put',
    url: 'http://localhost:8888/courseResource/' + id,
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    },
    data: param
  })
}

function addVideo (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)
  param.append('url', row.url)
  param.append('faculty.id', row.facultyName)
  param.append('course.id', row.courseName)
  param.append('type', 'VIDEO')

  return axios({
    method: 'post',
    url: 'http://localhost:8888/courseResource/',
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    },
    data: param
  })
}

function getFacultys () {
  return axios.get('http://localhost:8888/faculty/dto', {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

function getCourses () {
  return axios.get('http://localhost:8888/course/dto', {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

export { getVideo, deleteVideo, updateVideo, addVideo, getFacultys, getCourses }
