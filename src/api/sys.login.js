// import request from '@/plugin/axios'
import axios from 'axios'
import globalInfo from '@/api/global'

// export function AccountLogin (data) {
//   return request({
//     url: '/login',
//     method: 'post',
//     data
//   })
// }

export function AccountLogin (data) {
  return axios.post(globalInfo.baseURLWithPort + '/login', data)
}
