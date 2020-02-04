import util from '@/libs/util.js'

const baseURL = 'http://localhost'
const token = util.cookies.get('token')
const port = '8888'
const authorizationToken = 'Bearer ' + token
const baseURLWithPort = baseURL + ':' + port

export default {
  baseURL,
  authorizationToken,
  port,
  baseURLWithPort
}
