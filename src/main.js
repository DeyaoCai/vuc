import Vue from 'vue';
import App from './App';
import confs from './index.js';
import {init} from "cdy-utils";
const {getInitRouter, getInitVuex} = init;
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
