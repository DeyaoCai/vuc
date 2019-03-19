import comps from "./comps.js";
import store from "./vuex";
import routerConf from "./router/conf.js";
import routerDef from "./router/index.js";
import {initCRouter, initAudio} from "cdy-utils";
import "./assets/font/iconfont.css"
import "./assets/index.css"
const {onresize, appendAudio} = initAudio;
onresize();
appendAudio();
export default {
  comps,
  store: [store],
  router: [routerDef, routerConf],
  callback: [
    param => {
      initCRouter.setRouter(param.router)
    }
  ]
}
