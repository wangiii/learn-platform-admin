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

function updateTeacher (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)
  param.append('faculty.id', row.facultyName)
  // param.append('majors', row.majors)
  // let majorIds = []
  // if (row.majors.length > 0) {
  //   for (var i = 0; i < row.majors.length; i++) {
  //     majorIds.push(row.majors[i])
  //   }
  // }
  // param.append('majorIds', majorIds)

  return axios({
    method: 'put',
    url: 'http://localhost:8888/teacher/' + id,
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    },
    data: param
  })
}

function getOptions () {
  return axios.get('http://localhost:8888/faculty/dto', {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

export { getTeacher, deleteTeacher, updateTeacher, getOptions }
