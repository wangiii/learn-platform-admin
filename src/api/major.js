import axios from 'axios'
import util from '@/libs/util.js'

function getMajor (currentPage) {
  let pageNum = 1
  let pageSize = 10
  if (currentPage != null) {
    pageNum = currentPage
  }
  return axios.get('http://localhost:8888/major/?pageNum=' + pageNum + '&pageSize=' + pageSize, {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

function getOptions () {
  return axios.get('http://localhost:8888/faculty/dto', {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

function deleteMajor (id) {
  return axios.delete('http://localhost:8888/major/' + id, {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

function updateMajor (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)
  param.append('faculty.id', row.facultyName)

  return axios({
    method: 'put',
    url: 'http://localhost:8888/major/' + id,
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    },
    data: param
  })
}

function addMajor (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)
  param.append('faculty.id', row.facultyName)

  return axios({
    method: 'post',
    url: 'http://localhost:8888/major/',
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    },
    data: param
  })
}

export { getMajor, deleteMajor, updateMajor, addMajor, getOptions }
