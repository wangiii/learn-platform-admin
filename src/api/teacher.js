import axios from 'axios'
import util from '@/libs/util.js'

function getTeacher (currentPage) {
  let pageNum = 1
  let pageSize = 10
  if (currentPage != null) {
    pageNum = currentPage
  }
  return axios.get('http://localhost:8888/teacher/?pageNum=' + pageNum + '&pageSize=' + pageSize, {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

function deleteTeacher (phone) {
  return axios.delete('http://localhost:8888/teacher/' + phone, {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

export { getTeacher, deleteTeacher }
