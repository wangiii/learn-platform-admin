import axios from 'axios'
import globalInfo from '@/api/global'

function getMajor (currentPage) {
  let pageNum = 1
  let pageSize = 10
  if (currentPage != null) {
    pageNum = currentPage
  }
  return axios.get(globalInfo.baseURLWithPort + '/major/?pageNum=' + pageNum + '&pageSize=' + pageSize, {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function getMajorDTO () {
  return axios.get(globalInfo.baseURLWithPort + '/major/dto', {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function getOptions () {
  return axios.get(globalInfo.baseURLWithPort + '/faculty/dto', {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function deleteMajor (id) {
  return axios.delete(globalInfo.baseURLWithPort + '/major/' + id, {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function updateMajor (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)
  param.append('faculty.id', row.facultyName)

  return axios({
    method: 'put',
    url: globalInfo.baseURLWithPort + '/major/' + id,
    headers: {
      'Authorization': globalInfo.authorizationToken
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
    url: globalInfo.baseURLWithPort + '/major/',
    headers: {
      'Authorization': globalInfo.authorizationToken
    },
    data: param
  })
}

export { getMajor, deleteMajor, updateMajor, addMajor, getOptions, getMajorDTO }
