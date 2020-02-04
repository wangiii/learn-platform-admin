import axios from 'axios'
import globalInfo from '@/api/global'

function getCase (currentPage) {
  let pageNum = 1
  let pageSize = 10
  if (currentPage != null) {
    pageNum = currentPage
  }
  return axios.get(globalInfo.baseURLWithPort + '/courseResource/type/CASE?pageNum=' + pageNum + '&pageSize=' + pageSize, {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function deleteCase (id) {
  return axios.delete(globalInfo.baseURLWithPort + '/courseResource/' + id, {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function updateCase (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)

  return axios({
    method: 'put',
    url: globalInfo.baseURLWithPort + '/courseResource/' + id,
    headers: {
      'Authorization': globalInfo.authorizationToken
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
    url: globalInfo.baseURLWithPort + '/courseResource/',
    headers: {
      'Authorization': globalInfo.authorizationToken
    },
    data: param
  })
}

function getCourses () {
  return axios.get(globalInfo.baseURLWithPort + '/course/dto', {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

export { getCase, deleteCase, updateCase, addCase, getCourses }
