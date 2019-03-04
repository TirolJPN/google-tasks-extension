import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import VueGAPI from "vue-gapi"

Vue.use(VueRouter)


// Client ID and API key from the Developer Console
const CLIENT_ID = '201505471424-fgqrnhd0d50f5d2krd1upvemusl6nhtm.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCe-RCGwhttCdLy6S9EvNUT25HmIpuqsyg';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/tasks";

const apiConfig = {
  apiKey: API_KEY,
  clientId: CLIENT_ID,
  discoveryDocs : DISCOVERY_DOCS,
  scope: SCOPES
}

// const apiConfig = {
//   apiKey: process.env.VUE_APP_API_KEY,
//   clientId: process.env.VUE_APP_CLIENT_ID,
//   discoveryDocs : process.env.VUE_APP_DISCOVERY_DOCS,
//   scope: process.env.VUE_APP_SCOPES
// }



Vue.use(VueGAPI, apiConfig)


let router = new VueRouter({
  routes: [
    // for index page
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})




export default router
