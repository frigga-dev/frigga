import Vue from 'vue'
import Router from 'vue-router'

import reg from '@/components/reg'
import info from '@/components/info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'info',
      component: info
    },
    {
      path: '/reg',
      name: 'reg',
      component: reg
    }
  ]
})
