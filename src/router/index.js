import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      {
        path: ':name',
        name: 'course',
        component: () => import('../views/Detail.vue')
      },
    ]
  },
  {
    path: '/course/:name',
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: () => import('../views/User.vue')
  },
  {
    // 会匹配所有路径
    path: '*',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
