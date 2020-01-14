// 菜单 侧边栏

import util from '@/libs/util.js'

let role = util.cookies.get('role')

// 管理员菜单
let adminMenu = {
  path: '/course',
  title: '课程管理',
  icon: 'book'
}

// 教师菜单
let teacherMenu = {}

const aside = []
if (role === 'ROLE_ADMIN') {
  aside.push(adminMenu)
}
if (role === 'ROLE_TEACHER') {
  aside.push(teacherMenu)
}

export default aside
