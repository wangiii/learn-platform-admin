import axios from 'axios'
import globalInfo from '@/api/global'

function getVideo (currentPage) {
  let pageNum = 1
  let pageSize = 10
  if (currentPage != null) {
    pageNum = currentPage
  }
  return axios.get(globalInfo.baseURLWithPort + '/courseResource/type/VIDEO?pageNum=' + pageNum + '&pageSize=' + pageSize, {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function deleteVideo (id) {
  return axios.delete(globalInfo.baseURLWithPort + '/courseResource/' + id, {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function updateVideo (id, row) {
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

function addVideo (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)
  param.append('url', row.url)
  param.append('course.id', row.courseName)
  param.append('type', 'VIDEO')

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

export { getVideo, deleteVideo, updateVideo, addVideo, getCourses }
