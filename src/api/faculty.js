import axios from 'axios'
import util from '@/libs/util.js'

function getFaculty (currentPage) {
  let pageNum = 1
  let pageSize = 10
  if (currentPage != null) {
    pageNum = currentPage
  }
  return axios.get('http://localhost:8888/faculty/?pageNum=' + pageNum + '&pageSize=' + pageSize, {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

function deleteFaculty (id) {
  return axios.delete('http://localhost:8888/faculty/' + id, {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

function updateFaculty (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)

  return axios({
    method: 'put',
    url: 'http://localhost:8888/faculty/' + id,
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    },
    data: param
  })
}

function addFaculty (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)

  return axios({
    method: 'post',
    url: 'http://localhost:8888/faculty/',
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    },
    data: param
  })
}

export { getFaculty, deleteFaculty, updateFaculty, addFaculty }
