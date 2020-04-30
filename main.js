import Vue from 'vue'
import App from './App'
import apis from './util/apis.js'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.apis=apis
const app = new Vue({
    ...App
})
app.$mount()
