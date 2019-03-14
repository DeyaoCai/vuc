class Drag {
  constructor() {
    this.ori = {x: 0, y: 0};
    this.pre = {x: 0, y: 0};
    this.now = {x: 0, y: 0};
    this.isTouching = false;
    this.prevent = "";
    this.drection = "";
    this.touched = false;
  }

  touchEv(ev) {
    // 假设不触发开始事件， 则move事件也不应该触发
    this.touched = true;
    const touches = ev.touches[0];
    this.ori = {x: touches.clientX, y: touches.clientY};
    this.pre = {x: touches.clientX, y: touches.clientY};
    this.now = {x: touches.clientX, y: touches.clientY};
    this.isTouching = true;
    this.moved = false;
    this.drection = "";
  }

  moveEv(ev) {
    if (!this.touched) return;
    const touches = ev.touches[0];
    this.pre = this.now;
    this.now = {x: touches.clientX, y: touches.clientY};

    // 有四种方向限制模式/  "" 不限制方向 "x"限制x方向 "y"限制y防线 "xy" 限制x或y方向 先向哪个方向运动则限制另一个方向
    this.drection ||
    (this.drection =
        Math.abs(this.now.x - this.pre.x) > Math.abs(this.now.y - this.pre.y) ?
          "x" : "y"
    );
    // 如果是不阻止  则不做处理
    // 如果阻止其中任一个方向
    if (this.prevent !== this.drection) ev.cancelBubble = true;
    if (this.prevent) {
      this.now["xy".replace(this.drection, "")] = this.ori["xy".replace(this.drection, "")];
    }
    // 如果阻止已知方向
    if (this.prevent === "x" || this.prevent === "y") {
      this.now[this.prevent] = this.ori[this.prevent];
    }
  }

  endEv() {
    this.touched = false;
    this.isTouching = false;
  }

  getOffset() {
    return {
      x: this.now.x - this.ori.x,
      y: this.now.y - this.ori.y,
    }
  }

  getSpeed() {
    return {
      x: this.now.x - this.pre.x,
      y: this.now.y - this.pre.y,
    }
  }
}

export default Drag;
