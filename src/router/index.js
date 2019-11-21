import Vue from 'vue'
import Router from 'vue-router'
import Details from '@/components/Details'
import Home from '@/components/Home'
import BlogsRedact from '@/views/BlogsRedact'
import Login from '@/views/Login'
import Registe from '@/views/Registe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/Details',
          component: Details
        },

      ]
    }, 
    {
      path: '/BlogsRedact',
      name: 'BlogsRedact',
      component: BlogsRedact
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/reg',
      name: 'Registe',
      component: Registe
    },


  ]
})
