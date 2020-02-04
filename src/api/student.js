import axios from 'axios'
import globalInfo from '@/api/global'

function getStudent (currentPage) {
  let pageNum = 1
  let pageSize = 10
  if (currentPage != null) {
    pageNum = currentPage
  }
  return axios.get(globalInfo.baseURLWithPort + '/student/?pageNum=' + pageNum + '&pageSize=' + pageSize, {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function deleteStudent (phone) {
  return axios.delete(globalInfo.baseURLWithPort + '/student/' + phone, {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function getSearchStudent (phone) {
  let pageNum = 1
  let pageSize = 10
  return axios.get(globalInfo.baseURLWithPort + '/student/search/?pageNum=' + pageNum + '&pageSize=' + pageSize + '&phone=' + phone, {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

export { getStudent, deleteStudent, getSearchStudent }
