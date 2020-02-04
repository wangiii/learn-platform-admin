import axios from 'axios'
import globalInfo from '@/api/global'

function getNews (currentPage) {
  let pageNum = 1
  let pageSize = 10
  if (currentPage != null) {
    pageNum = currentPage
  }
  return axios.get(globalInfo.baseURLWithPort + '/news/?pageNum=' + pageNum + '&pageSize=' + pageSize, {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function deleteNews (id) {
  return axios.delete(globalInfo.baseURLWithPort + '/news/' + id, {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function updateNews (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)
  param.append('content', row.content)

  return axios({
    method: 'put',
    url: globalInfo.baseURLWithPort + '/news/' + id,
    headers: {
      'Authorization': globalInfo.authorizationToken
    },
    data: param
  })
}

function addNews (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)
  param.append('content', row.content)

  return axios({
    method: 'post',
    url: globalInfo.baseURLWithPort + '/news/',
    headers: {
      'Authorization': globalInfo.authorizationToken
    },
    data: param
  })
}

export { getNews, deleteNews, updateNews, addNews }
