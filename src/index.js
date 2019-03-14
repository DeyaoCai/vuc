import tools from "./tools.js";
import comps from "./comps.js";
import store from "./vuex";
import routerConf from "./router/conf.js";
import routerDef from "./router/index.js";
import cRouter from "./tools/initCRouter.js";
import {onresize, appendAudio} from "./tools/initAudio.js";
import "./assets/font/iconfont.css"
import "./assets/index.css"
comps.useComp = tools.useComp;
onresize();
appendAudio();
export default {
  comps,
  tools,
  store: [store],
  router: [routerDef, routerConf],
  callback: [
    param => {
      cRouter.setRouter(param.router)
    }
  ]
}
