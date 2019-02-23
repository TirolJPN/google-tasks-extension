// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Vuetiry from "vuetify"
// import 'vuetify/dist/vuetify.min.css'
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import VueOnsen from 'vue-onsenui';

Vue.use(VueOnsen);



Vue.config.productionTip = false
Vue.use(router)



new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
