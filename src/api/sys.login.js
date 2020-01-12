// import request from '@/plugin/axios'
import axios from 'axios'

// export function AccountLogin (data) {
//   return request({
//     url: '/login',
//     method: 'post',
//     data
//   })
// }

export function AccountLogin (data) {
  return axios.post('http://127.0.0.1:8080/login', data)
}
