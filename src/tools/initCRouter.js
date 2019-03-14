import Vue from 'vue';
let router;
class Session {
  getSession () {return window.sessionStorage.his ? JSON.parse(window.sessionStorage.his) : [];};
  pushSession (his) {
    const session = this.getSession();
    this.session.push(his);
    window.sessionStorage.his = JSON.stringify(session);
  };
  saveSession (session) {window.sessionStorage.his = JSON.stringify(session);};
}
class Router {
  constructor () {
    this.isGoingBack = false;
  }
  goBackTo (route) {
    this.isGoingBack = true;
    if (!route) return this.goBack();
    let now = null;
    const list = session.getSession();
    const items = list.filter(item => item.name === route.name);
    if (items.length) {
      const index = list.indexOf(items[0]);
      if (index + 1) {
        list.length = index + 1;
        now = list.pop();
      } else now = route;
    } else now = route;
    now = route;
    list.push(now);
    session.saveSession(list);
    router.replace(now);
  };
  goBack() {
    this.isGoingBack = true;
    const list = session.getSession();
    const now = list.pop();
    const prev = list.pop();
    session.saveSession(list);
    if (prev) { this.push(prev, true); } else history.go(-1);
  };
  push (route, isGoingBack) {
    this.isGoingBack = !!isGoingBack;
    const list = session.getSession();
    list.push(route);
    session.saveSession(list);
    router.replace(route);
  };
  replace(route) {
    this.isGoingBack = false;
    const list = session.getSession();
    list.pop();
    list.push(route);
    session.saveSession(list);
    router.replace(route);
  };
  userRouterList(name) {
    const list = {
      fromLogin: [{name: "login"}, {name: "index"}],
      gcamp: [{name: "index"}, {name: "game"}, {name: "gcamp"}],
    }[name] || [{name: "index"}];
    session.saveSession(list);
    this.replace(list[list.length - 1]);
  };
  parsePath() {
    const paramStr = location.hash.replace("#/", "").split("?").pop();
    const param = {};
    paramStr.split("&").forEach(item => {
      const strParam = item.split("=");
      param[strParam[0]] = strParam[1];
    });
    return param;
  }
}
history.pushState(null, null, document.href);
const session = new Session();
const cRouter = new Router();
// if (!sessionStorage.login){
//   window.sessionStorage.his = "";
//   cRouter.push({name:"login"});
// }else{
//   const pathName = cRouter.parsePath().usePath;
//   if(pathName) cRouter.userRouterList(pathName);
// }

window.onhashchange = () => {
  const his = session.getSession();
  if (his.length) history.pushState(null, null, document.href);
  cRouter.goBack();
}

export default {
  Session, Router, setRouter(routers){
    Vue.prototype.cRouter = cRouter;
    router = routers
  }
}
