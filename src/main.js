import Vue from 'vue'
export const EventBus = new Vue()
import App from './App.vue'
import router from './router'

Vue.prototype.$EventBus = new Vue()
Vue.config.productionTip = false

Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
})

const role = 'admin'
Vue.directive('permission', {
  inserted(el) {
    if (role !== 'admin') {
      el.parentElement.removeChild(el)
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
