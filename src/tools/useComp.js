// 专门为 暴露组件的对象扩展用的  接受一个对象， 然后 添加到自己身上   ，请仅在这种情况下使用 其他情况慎用
export default function () {
  Array.prototype.forEach.call(arguments, (item, index) => {
    this.type.isObject(item) && Object.keys(item).forEach(key => {
      this[key] = item[key];
    })
  })
  return this;
};
