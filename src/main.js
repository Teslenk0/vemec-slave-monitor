import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' //Vuesax styles

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(Vuesax)
Vue.use(ElementUI);


new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
