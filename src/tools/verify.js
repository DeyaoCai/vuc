import type from './type.js';

class Verify {
  constructor(callback) {
    this.list = {};
    callback || (this.callback = () => {
    });
    type.isFunction(callback) && (this.callback = item => callback(item));
    type.isObject(callback) && (this.callback = item => callback.wrapConfig.showAlert(item));
  };

  on(name, conf) {
    const isArray = type.isArray(name);
    const isDefault = type.isObject(name) || isArray;
    const key = isDefault ? "undefined" : name;
    const obj = isDefault ? name : conf;
    this.list[key] || (this.list[key] = []);
    isArray || this.list[key].push(obj);
    isArray && (this.list[key] = this.list[key].concat(obj));
    return this;
  };

  check(name) {
    const isDefault = type.isObject(name);
    const key = isDefault ? "undefined" : name;
    const fail = this.list[key] && this.list[key].filter(item => type.isFunction(item.val) ? !item.val() : !item.val);
    fail && (this.list[key].fails = fail);
    fail && fail[0] && this.callback(this.list[key].fails[0]);
    return fail ? !fail[0] : false;
  }
}

export default Verify;
