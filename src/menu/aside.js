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
let news = {
  path: '/news',
  title: '新闻通知管理',
  icon: 'hacker-news'
}
let major = {
  path: '/major',
  title: '专业管理',
  icon: 'code-fork'
}
let student = {
  path: '/student',
  title: '学生管理',
  icon: 'graduation-cap'
}
let teacher = {
  path: '/teacher',
  title: '教师管理',
  icon: 'user-secret'
}

// 教师菜单
let video = {
  path: '/video',
  title: '教学视频管理',
  icon: 'video-camera'
}

const aside = []
if (role === 'ROLE_ADMIN') {
  aside.push(faculty)
  aside.push(major)
  aside.push(course)
  aside.push(teacher)
  aside.push(student)
  aside.push(news)
}
if (role === 'ROLE_TEACHER') {
  aside.push(news)
  aside.push(video)
}

export default aside
