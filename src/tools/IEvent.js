/**
 *  用于判断touch 系列事件 用户可能的行为， 并分发对应的处理函数（将行为判断抽离出来， 而非在处理函数中进行判断）
 *  如两指触摸后， 不执行单指触移事件，单指触移后不触发双指触摸事件等。
 *  300毫秒的单击事件认为是双击事件。
 * @changeEvFunc 改变事件回调，类似于 $.on("click", function(){});
 * @config 初始化的配置， 如果在 new 之前，你已经创建好了回调， 则你可以放在config的同名属性中传入, 当然你也可以在new 之后使用 changeEvFunc替换或替换（注意：会替换之前设置的）
 * @drageMode 判断当前触摸事件模式（单指，双指）
 * @touchEv 接受原生事件对象，用于判断用户行为
 * @moveEv 接受原生事件对象，用于判断用户行为
 * @endEv 接受原生事件对象，用于判断用户行为
 *  当前可用事件
 *  iDBClick 双击事件
 *  iClick 单击事件
 *  iTouch 单指触摸事件
 *  iMove 单指触移事件
 *  iEnd 单指触离事件
 *  iDoubleTouch 双指触摸事件
 *  iDoubleMove 双指触移事件
 *  iDoubleEnd 双指触离事件
 * */
export function IEvent(config) {
  config || (config = {});
  this.config = config;
  this.latestEnd = 0; // 最近一次点击（手指抬起）；
  this.latestDBClick = 0;
  this.moved = false;
  this.mode = null;//  null | single | double | muti
  const evArr = ["iDBClick", "iClick", "iTouch", "iMove", "iEnd", "iDoubleTouch", "iDoubleMove", "iDoubleEnd"];
  evArr.forEach(item => (this[item] = (config[item])));
}

IEvent.prototype.changeEvFunc = function (evName, func) {
  this[evName] = func;
  return this;
};
IEvent.prototype.drageMode = function (ev) {
  this.mode = "single";
  ev.touches.length > 1 && (this.mode = "double");
  !this.canNotBeDouble && ev.touches.length > 2 && (this.mode = "muti");
};
IEvent.prototype.touchEv = function (ev) {
  // 在单指触摸时发生单指触移事件后，若未发生触离事件，发生的触摸事件不认为是双指触摸事件
  this.canNotBeDouble = this.mode === "single" && this.moved === true;
  this.moved = false;
  this.drageMode(ev);
  this.startEv = ev;
  this.mode === "single" && this.iTouch && this.iTouch(ev);
  this.mode !== "single" && this.iDoubleTouch && this.iDoubleTouch(ev);
};
IEvent.prototype.moveEv = function (ev) {
  this.moved = true;
  this.mode === "single" && ev.touches.length === 1 && this.iMove && this.iMove(ev);
  ev.touches.length > 1 && this.iDoubleMove && this.iDoubleMove(ev);
  return false;
};
IEvent.prototype.endEv = function () {
  if (this.mode === "single") {
    this.iEnd && this.iEnd(this.startEv);
    if (this.moved) this.latestEnd = 0;
    else {
      const nowEnd = new Date().getTime();
      if (this.latestEnd > nowEnd - 300) { // 300毫秒内的二次点击 视为双击
        if (this.latestDBClick < nowEnd - 300) { // 双击后，300毫秒内的点击事件不视为双击
          this.iDBClick && this.iDBClick(this.startEv);
          this.latestDBClick = nowEnd;
        }
      } else { // 300毫秒内的单次点击
        setTimeout(() => { // 300毫秒内单词点击 且无move事件触发  视为双击
          if (this.latestEnd === nowEnd && !this.moved) this.iClick && this.iClick(this.startEv);
          // 单击事件延迟执行
        }, 300);
      }
      this.latestEnd = nowEnd;
    }
  } else {
    this.iDoubleEnd && this.iDoubleEnd();
  }
  this.moved = false;
};
export default IEvent;
