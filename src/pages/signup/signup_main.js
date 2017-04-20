import Vue from 'vue'
import App from './signup'
import Resource from 'vue-resource'

Vue.use(Resource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
