/**
 * 单指事件的一种实现的数据存储，配合Drag.js类使用
 * Drag 处理单次过程
 * SingleDragData 记录Drag 执行过后的结果的累加（并不记录多次过程， 只计算最后的结果）
 * */
export function SingleDragData() {
  this.posi = {x: 0, y: 0};
  this.nowPosi = {x: 0, y: 0};
}
SingleDragData.prototype.setPosi = function (posi) {
  if (!posi) return;
  if (posi.x || posi.x === 0) this.posi.x = this.nowPosi.x = posi.x;
  if (posi.y || posi.y === 0) this.posi.y = this.nowPosi.y = posi.y;
};
SingleDragData.prototype.setNowPosi = function (posi) {
  if (!posi) return;
  if (posi.x || posi.x === 0) this.nowPosi.x = posi.x;
  if (posi.y || posi.y === 0) this.nowPosi.y = posi.y;
};
export default SingleDragData;
