import axios from 'axios'
import util from '@/libs/util.js'

function getNews (currentPage) {
  let pageNum = 1
  let pageSize = 10
  if (currentPage != null) {
    pageNum = currentPage
  }
  return axios.get('http://localhost:8888/news/?pageNum=' + pageNum + '&pageSize=' + pageSize, {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

function deleteNews (id) {
  return axios.delete('http://localhost:8888/news/' + id, {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

function updateNews (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)
  param.append('content', row.content)

  return axios({
    method: 'put',
    url: 'http://localhost:8888/news/' + id,
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
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
    url: 'http://localhost:8888/news/',
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    },
    data: param
  })
}

export { getNews, deleteNews, updateNews, addNews }
