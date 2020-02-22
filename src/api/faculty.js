import axios from 'axios'
import globalInfo from '@/api/global'

function getFacultyPieRow () {
  return axios.get(globalInfo.baseURLWithPort + '/faculty/faculty-pie-row', {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function getFaculty (currentPage) {
  let pageNum = 1
  let pageSize = 10
  if (currentPage != null) {
    pageNum = currentPage
  }
  return axios.get(globalInfo.baseURLWithPort + '/faculty/?pageNum=' + pageNum + '&pageSize=' + pageSize, {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function deleteFaculty (id) {
  return axios.delete(globalInfo.baseURLWithPort + '/faculty/' + id, {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function updateFaculty (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)

  return axios({
    method: 'put',
    url: globalInfo.baseURLWithPort + '/faculty/' + id,
    headers: {
      'Authorization': globalInfo.authorizationToken
    },
    data: param
  })
}

function addFaculty (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)

  return axios({
    method: 'post',
    url: globalInfo.baseURLWithPort + '/faculty/',
    headers: {
      'Authorization': globalInfo.authorizationToken
    },
    data: param
  })
}

export { getFaculty, deleteFaculty, updateFaculty, addFaculty, getFacultyPieRow }
