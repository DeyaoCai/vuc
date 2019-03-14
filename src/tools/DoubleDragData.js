/**
 * 双指事件的一种实现的数据存储，配合DoubleDrag.js类使用
 * DoubleDrag 处理单次过程
 * DoubleDragData 记录DoubleDrag 执行过后的结果的累加（并不记录多次过程， 只计算最后的结果）
 * */
export function DoubleDragData() {
  this.rate = 1;
  this.nowRate = 1;
  this.origin = {x: 0, y: 0};
  this.nowOrigin = {x: 0, y: 0};
}

DoubleDragData.prototype.setRate = function (rate) {
  if (rate || rate === 0) this.rate = this.nowRate = rate;
};
DoubleDragData.prototype.setNowRate = function (rate) {
  if (rate || rate === 0) this.nowRate = rate;
};
export default DoubleDragData;
