import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/_globals'
import './plugins/vee-validate';

import 'sweetalert2/dist/sweetalert2.min.css'
import './assets/scss/custom.scss'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSweetalert2)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')