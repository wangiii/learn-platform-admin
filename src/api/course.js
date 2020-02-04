import axios from 'axios'
import globalInfo from '@/api/global'

function getCourse (currentPage) {
  let pageNum = 1
  let pageSize = 10
  if (currentPage != null) {
    pageNum = currentPage
  }
  return axios.get(globalInfo.baseURLWithPort + '/course/?pageNum=' + pageNum + '&pageSize=' + pageSize, {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function getCourseDTOForAdmin () {
  return axios.get(globalInfo.baseURLWithPort + '/course/dtoForAdmin', {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function deleteCourse (id) {
  return axios.delete(globalInfo.baseURLWithPort + '/course/' + id, {
    headers: {
      'Authorization': globalInfo.authorizationToken
    }
  })
}

function updateCourse (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)
  param.append('cover', row.cover)
  param.append('semester', row.semester)
  param.append('credit', row.credit)
  param.append('classHour', row.classHour)
  // param.append('majors', row.majors)
  let majorIds = []
  if (row.majors.length > 0) {
    for (var i = 0; i < row.majors.length; i++) {
      majorIds.push(row.majors[i])
    }
  }
  param.append('majorIds', majorIds)

  return axios({
    method: 'put',
    url: globalInfo.baseURLWithPort + '/course/' + id,
    headers: {
      'Authorization': globalInfo.authorizationToken
    },
    data: param
  })
}

function addCourse (id, row) {
  let param = new URLSearchParams()
  param.append('name', row.name)
  param.append('cover', row.cover)
  param.append('semester', row.semester)
  param.append('credit', row.credit)
  param.append('classHour', row.classHour)

  return axios({
    method: 'post',
    url: globalInfo.baseURLWithPort + '/course/',
    headers: {
      'Authorization': globalInfo.authorizationToken
    },
    data: param
  })
}

export { getCourse, deleteCourse, updateCourse, addCourse, getCourseDTOForAdmin }
