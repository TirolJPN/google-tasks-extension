import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'

Vue.use(Router)

export default new Router({
  routes: [
    // for index page
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // for sign up page
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    // for sign in page
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    }
  ]
})
