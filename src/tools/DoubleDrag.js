/**
 * 双指触摸事件的一种业务逻辑抽象
 *  主要记录双指触摸时的第一组点ori
 *  触移时的最后的两组点now prev
 *  适用于记录一次操作的各种值，不适合记录状态， （如上次结束时的值，应该放在其他类实现）
 *  对比now prev 计算速度
 *  对比now ori 计算此次操作的手指偏移
 *  而对于计算出来的值用来做什么则不做过多限制
 *  对于扩展，要什么值， 在constructor添加属性，然后再事件处理函数中添加记录的过程
 *  要计算什么值，添加对应的计算方法即可， 这些方法应该暴露给外界调用，而非计算后再当前对象记录（当前设计是如此， 可以根据业务 调整）
 */

class DoubleDrag {
  constructor() {
    this.ori = [{x: 0, y: 0}, {x: 0, y: 0}];
    this.pre = [{x: 0, y: 0}, {x: 0, y: 0}];
    this.now = [{x: 0, y: 0}, {x: 0, y: 0}];
    this.isTouching = false;
    this.touched = false;
  }

  touchEv(ev) {
    // 假设不触发开始事件， 则move事件也不应该触发
    this.touched = true;
    const touches = ev.touches[0];
    const touchess = ev.touches[1];
    this.ori = [{x: touches.clientX, y: touches.clientY}, {x: touchess.clientX, y: touchess.clientY}];
    this.pre = [{x: touches.clientX, y: touches.clientY}, {x: touchess.clientX, y: touchess.clientY}];
    this.now = [{x: touches.clientX, y: touches.clientY}, {x: touchess.clientX, y: touchess.clientY}];
    this.isTouching = true;
    this.moved = false;
    this.drection = "";
  }

  moveEv(ev) {
    if (!this.touched) return;
    const touches = ev.touches[0];
    const touchess = ev.touches[1];
    this.pre = this.now;
    this.now = [{x: touches.clientX, y: touches.clientY}, {x: touchess.clientX, y: touchess.clientY}];
  }

  endEv() {
    this.touched = false;
    this.isTouching = false;
  }

  getlen(list) {
    return Math.sqrt(
      Math.pow(list[0].x - list[1].x, 2) + Math.pow(list[0].y - list[1].y, 2)
    )
  };

  getStartCenter() {
    const list = this.ori;
    return {
      x: (list[0].x + list[1].x) / 2,
      y: (list[0].y + list[1].y) / 2,
    }
  };

  getOffset() {
    return this.getlen(this.now) - this.getlen(this.ori)
  }
}

export default DoubleDrag;
