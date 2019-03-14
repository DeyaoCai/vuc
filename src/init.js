import Vue from 'vue';
import Vuex from 'vuex'
import Router from 'vue-router';

Vue.use(Vuex);
Vue.use(Router);
export function getInitRouter() { // 接收 route 列表
  [].forEach.call(
    arguments,
    routes => routes.forEach(route => (route.path = route.path.replace(/\/\//g, "/")))
  );
  console.log(arguments, [].concat.apply([], arguments))
  return new Router({
    routes: [].concat.apply([], arguments)
  })
}

export function getInitVuex() { // 接收store 列表
  const store = {state: {}, getters: {}, mutations: {}, actions: {}};
  Object.keys(store).forEach(items => {
    [].forEach.call(arguments, item => {
      item[items] && Object.keys(item[items]).forEach(key => {
        if (store[items][key]) return console.log(`warning store.${items}.${key} has been defined!`)
        store[items][key] = item[items][key];
      });
    });
  });
  return store;
}
export default {
  getInitRouter, getInitVuex
}
