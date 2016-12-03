// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'
import VueResource from 'vue-resource'

import App from './app'
import store from './store'

Vue.use(Element)
Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:3000/api'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
