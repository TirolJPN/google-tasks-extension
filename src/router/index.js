import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUp from '@/components/SignUp'
import Home from '@/components/Home'
import firebase from 'firebase'

Vue.use(VueRouter)

var Auth = {
  loggedIn: false,
  login: function() { this.loggedIn = true },
  logout: function() { this.loggedIn = false }  
}

let router = new VueRouter({
  routes: [
    // for index page
    {
      path: '/',
      name: 'SignUp',
      component: SignUp
    },
    // for sign up page
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// ログインが完了していない場合にサインインページの飛ばす
router.beforeEach((to, from, next)=>{
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let currentUser = firebase.auth().currentUser　
  if (requiresAuth){
  if (!currentUser){
    next({
      path: '/'
    })
  }else{
    next()
  }
}else{
  next()
}
})



export default router