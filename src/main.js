import Vue from 'vue';
import App from './App';
import {getInitRouter, getInitVuex} from './init.js';
import confs from './index.js';
const router = getInitRouter.apply(null, confs.router);
const store = getInitVuex.apply(null, confs.store);
Vue.config.productionTip = false;
confs.callback && confs.callback.forEach(fn => {
  fn && fn({router, store})
});
export default new Vue({
  el: '#app',
  store: store,
  router,
  components: { App },
  template: '<App/>'
});
