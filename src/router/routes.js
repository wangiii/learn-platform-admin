import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')
      },
      // 课程管理
      {
        path: 'course',
        name: 'course',
        meta: {
          title: '课程管理',
          auth: true
        },
        component: _import('course')
      },
      // 院系管理
      {
        path: 'faculty',
        name: 'faculty',
        meta: {
          title: '院系管理',
          auth: true
        },
        component: _import('faculty')
      },
      // 专业管理
      {
        path: 'major',
        name: 'major',
        meta: {
          title: '专业管理',
          auth: true
        },
        component: _import('major')
      },
      // 教师管理
      {
        path: 'teacher',
        name: 'teacher',
        meta: {
          title: '教师管理',
          auth: true
        },
        component: _import('teacher')
      },
      // 学生管理
      {
        path: 'student',
        name: 'student',
        meta: {
          title: '学生管理',
          auth: true
        },
        component: _import('student')
      },
      // 新闻通知管理
      {
        path: 'news',
        name: 'news',
        meta: {
          title: '新闻管理',
          auth: true
        },
        component: _import('news')
      },
      // 视频管理
      {
        path: 'video',
        name: 'video',
        meta: {
          title: '视频管理',
          auth: true
        },
        component: _import('video')
      },
      // 课件管理
      {
        path: 'ppt',
        name: 'ppt',
        meta: {
          title: '课件管理',
          auth: true
        },
        component: _import('ppt')
      },
      // 作业管理
      {
        path: 'homework',
        name: 'homework',
        meta: {
          title: '作业管理',
          auth: true
        },
        component: _import('homework')
      },
      // 案例库管理
      {
        path: 'case',
        name: 'case',
        meta: {
          title: '案例库管理',
          auth: true
        },
        component: _import('case')
      },
      // 实验指导书管理
      {
        path: 'instructionBook',
        name: 'instructionBook',
        meta: {
          title: '实验指导书管理',
          auth: true
        },
        component: _import('instructionBook')
      },
      // 课程大纲管理
      {
        path: 'syllabus',
        name: 'syllabus',
        meta: {
          title: '课程大纲管理',
          auth: true
        },
        component: _import('syllabus')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
