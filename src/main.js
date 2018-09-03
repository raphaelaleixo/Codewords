import Vue from 'vue';
import VueRouter from 'vue-router';
import VueQrcode from '@xkeshi/vue-qrcode';
import App from './App.vue';
import { routes } from './routes/routes';
import './styles/codewords.scss';

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.component(VueQrcode.name, VueQrcode);

export const eventBus = new Vue();

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
