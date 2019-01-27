// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

import Vuetiry from "vuetify"
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.use(Vuetiry)
Vue.use(router)

const config = {
  apiKey: "AIzaSyCe-RCGwhttCdLy6S9EvNUT25HmIpuqsyg",
  authDomain: "eastern-shell-229809.firebaseapp.com",
  databaseURL: "https://eastern-shell-229809.firebaseio.com",
  projectId: "eastern-shell-229809",
  storageBucket: "eastern-shell-229809.appspot.com",
  messagingSenderId: "201505471424"
}
firebase.initializeApp(config)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})