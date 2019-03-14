class maps {
  constructor(width, height, lsMap) {
    this.width = width;
    this.height = height;
    this.lsMap = lsMap;
  }

  getList(list) {
    if (!list) list = new Array(this.width * this.height).fill(1);
    this.list = list.map((item, i) => {
      return {
        pos: {x: i % this.width, y: Math.floor(i / this.width)}, // 位于地图位置的信息
        ls: item.ls || "ls-glass", // 地形样式
        showls: null, // 用来显示路径的类
        attack: false, // 显示攻击的样式
        prev: null, // 上一个从哪里来
        reached: {u: false, r: false, d: false, l: false},
        rest: null, // 剩余步数
        damp: 0, // 自身阻尼
      }
    });
    return this;
  }

  addDamp() {
    this.list.forEach(item => (item.damp = this.lsMap[item.ls]));
    return this;
  }

  init(list) {
    this.getList(list).addDamp();
    return this;
  }
}

export default maps;
