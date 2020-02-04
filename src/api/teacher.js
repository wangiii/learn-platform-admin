import axios from 'axios'
import globalInfo from '@/api/global'

function getTeacher (currentPage) {
  let pageNum = 1
  let pageSize = 10
  if (currentPage != null) {
    pageNum = currentPage
  }
  return axios.get(globalInfo.baseURLWithPort + '/teacher/?pageNum=' + pageNum + '&pageSize=' + pageSize, {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function getSearchTeacher (phone) {
  let pageNum = 1
  let pageSize = 10
  return axios.get(globalInfo.baseURLWithPort + '/teacher/search/?pageNum=' + pageNum + '&pageSize=' + pageSize + '&phone=' + phone, {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function deleteTeacher (phone) {
  return axios.delete(globalInfo.baseURLWithPort + '/teacher/' + phone, {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function updateTeacher (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)
  param.append('faculty.id', row.facultyName)
  // param.append('majors', row.majors)
  let majorIds = []
  if (row.majors.length > 0) {
    for (var i = 0; i < row.majors.length; i++) {
      majorIds.push(row.majors[i])
    }
  }
  let courseIds = []
  if (row.courses.length > 0) {
    for (var j = 0; j < row.courses.length; j++) {
      courseIds.push(row.courses[j])
    }
  }
  param.append('majorIds', majorIds)
  param.append('courseIds', courseIds)

  return axios({
    method: 'put',
    url: globalInfo.baseURLWithPort + '/teacher/' + id,
    headers: {
      'Authorization': globalInfo.authorizationToken
    },
    data: param
  })
}

function getOptions () {
  return axios.get(globalInfo.baseURLWithPort + '/faculty/dto', {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function addTeacher (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)
  param.append('phone', row.phone)
  param.append('password', row.password)
  param.append('faculty.id', row.facultyName)

  return axios({
    method: 'post',
    url: globalInfo.baseURLWithPort + '/teacher/',
    headers: {
      'Authorization': globalInfo.authorizationToken
    },
    data: param
  })
}

export { getTeacher, deleteTeacher, updateTeacher, getOptions, addTeacher, getSearchTeacher }
