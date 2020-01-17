// 菜单 侧边栏

import util from '@/libs/util.js'

let role = util.cookies.get('role')

// 管理员菜单
let course = {
  path: '/course',
  title: '课程管理',
  icon: 'book'
}
let faculty = {
  path: '/faculty',
  title: '院系管理',
  icon: 'university'
}
let major = {
  path: '/major',
  title: '专业管理',
  icon: 'code-fork'
}

// 教师菜单

const aside = []
if (role === 'ROLE_ADMIN') {
  aside.push(faculty)
  aside.push(major)
  aside.push(course)
}
if (role === 'ROLE_TEACHER') {}

export default aside
