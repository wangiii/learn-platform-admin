import axios from 'axios'
import globalInfo from '@/api/global'

function getPPT (currentPage) {
  let pageNum = 1
  let pageSize = 10
  if (currentPage != null) {
    pageNum = currentPage
  }
  return axios.get(globalInfo.baseURLWithPort + '/courseResource/type/PPT?pageNum=' + pageNum + '&pageSize=' + pageSize, {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function deletePPT (id) {
  return axios.delete(globalInfo.baseURLWithPort + '/courseResource/' + id, {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function updatePPT (id, row) {
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

function addPPT (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)
  param.append('url', row.url)
  param.append('course.id', row.courseName)
  param.append('type', 'PPT')

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

export { getPPT, deletePPT, updatePPT, addPPT, getCourses }
