import axios from 'axios'
import util from '@/libs/util.js'

function get () {
  return axios.get('http://localhost:8080/course/', {
    headers: {
      'Authorization': 'Bearer ' + util.cookies.get('token')
    }
  })
}

export { get }
