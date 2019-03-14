<template>
  <div
    class="vuc-scroll"
     @touchstart="touchEv($event)"
     @touchmove="moveEv($event)"
     @touchend="endEv()"
     :style="wrapStyle"
  >
    <div class="vue-scroll-reflash" v-if="needReflash && !(animating || animatingT)">{{showReflashTip ? "松开刷新" : "继续下拉"}}</div>
    <div class="vue-scroll-loadmore" :class="{active:!canLoadMore||(canLoadMore&&showLoadMoreTip)}" v-if="needLoading && !(animating || animatingB)">{{
      canLoadMore? showLoadMoreTip ? "松开加载" : "继续上拉" :"无更多数据"
      }}</div>
    <div class="vuc-scroll-wrap" :class="{
      x: config.derction === 'x',
      y: config.derction === 'y',
      full: full
     }" :style="innerStyle"><slot/></div>
  </div>
</template>
<script>
import Drag from "../tools/Drag.js";
export default {
  name: 'vue-scroll',
  data(){return {
    drag: new Drag(),
    posi: {x: 0, y: 0},
    nowPosi:{x: 0, y: 0},
    damp: .3,
    rate: .5,
    showReflashTip:false,
    showLoadMoreTip:false,
    isShowingTip: false,
    _isLoading:false,
    hasOnEndEv:false,
    catchedWrapsize: null,
    animatingT: false,
    animatingB: false,
    animating: false,
    // 虽然在正常的理解中，当触摸时，就应该认为要禁用掉过渡，但实际应该是发生移动时才将过渡去掉，
    // 前者会导致一触摸屏幕就会发生dom操作, 在嵌套时嵌套的父级scroll 组件均会有style的改变
    shouldUseTransition: true,
  }},
  computed:{
    indexs(){return this.config.index},
    wrapStyle(){
      if (!this.config.bgUrl) return `height: ${this.height}`;
      const sp = this.drag.getSpeed();
      let ti = (Math.pow(sp.x/20,2)+Math.pow(sp.y/20,2))/4+.3;
      ti > .6 && (ti = .6);
      const touching = this.drag.isTouching;
      const pos = this.nowPosi;
      touching || (this.posi = {x: pos.x, y: pos.y});
      return `
        background-image: url(${this.config.bgUrl});
        background-size: ${(18.75+(pos.y>0?pos.y/20:0))*(this.config.bgRate||1)}rem;
        background-repeat: no-repeat;
        background-position: center top;
        transition: background-size ${touching?0:ti}s;
        height: ${this.height};
      `
    },
    innerStyle(){
      const touching = this.drag.isTouching && !this.shouldUseTransition;
      const pos = this.nowPosi;
      const posi = this.posi;
      const offset = this.drag.getOffset();
      const offsetY = pos.y - posi.y - offset.y;
      let timeingFunction = "ease-out";
      let ti = Math.sqrt(Math.sqrt(Math.sqrt(Math.sqrt(Math.abs(offsetY * this.rate)))));
      touching || (this.posi = {x: pos.x, y: pos.y});
      // ti > 1 && (ti = 1);
      if (this.config.takeOneStepAtATime) ti = .3;
      (this.isShowingTip || this.animating) && (ti = .3);

      if (!(this.showReflashTip || this.showLoadMoreTip) && this.animatingT || this.animatingB) {
        const wrapSize = this.getWrapSize();
        this.animatingT = false;
        this.animatingB = false;
        timeingFunction = "cubic-bezier(0, 1, .5, 1.25)";
      }
      return {
        transform: `translate3d(${pos.x}px, ${pos.y}px,0)`,
        transition: `transform ${touching ? 0 : ti}s ${timeingFunction}`,
      }
    },
    // 假如 用户选用了加载更多或者刷新：
    needReflash() {return !!(this.config && this.config.reflash)},
    needLoading() {return !!(this.config && this.config.loadMore)},

    prevent(){return this.config && this.config.derction ? {"": "", x: "y", y: "x", xy: "xy"}[this.config.derction] : "";},
    canLoadMore(){return !this.config.noMore},

  },
  props:["config", "height", "full"],
  mounted(){
    this.config.getPosi = () => this.posi;
    this.config.scope = this;
    this.inits && this.inits();
  },
  watch:{
    indexs(){
      this.setIndex(this.indexs);
    },
    _isLoading () {
      this.config._isLoading = this._isLoading;
    },
    prevent(){
      this.drag.prevent = this.prevent;
      this.config.reSetPosiWhenDerctionChanged&&(this.nowPosi={x:0,y:0});
    },
  },
  methods: {
    inits () {
      this.drag.prevent = this.prevent;

      this.confg || (this.confg = {});
      const conf = this.config;

      conf.index || (conf.index = {});
      const index = conf.index;
      index.x || (index.x = 0);
      index.y || (index.y = 0);

      conf.itemNum || (conf.itemNum = {});
      const itemNum = conf.itemNum;
      itemNum.x || (itemNum.x = 1);
      itemNum.y || (itemNum.y = 1);
      this.setIndex(index);
      this.config.setIndex = this.setIndex;
    },
    touchEv (ev) {
      if (this.animatingT || this.animatingB) return;
      this.shouldUseTransition = true;
      const styleTransfrom = window.getComputedStyle(this.$el.getElementsByClassName("vuc-scroll-wrap")[0]).transform.split(", ");
      this.posi.y = this.nowPosi.y = styleTransfrom.pop().replace(")","") * 1;
      this.posi.x = this.nowPosi.x = styleTransfrom.pop() * 1;
      this.hasOnEndEv = false;
      if (this._isLoading) return;
      this.drag.touchEv(ev);
      this.cacheWrapSize();
      this.animating = false;
      this.isShowingTip = false;
    },
    moveEv (ev) {
      if (this.config.noHandelMove) return;
      if (this._isLoading) return;
      this.shouldUseTransition = false;
      this.drag.moveEv(ev);
      this.nowPosi = this.getLimitedPosition();
    },
    endEv () {
      if (this._isLoading) return;
      this.drag.endEv();
      if (this.config.takeOneStepAtATime){
        const offset = this.getOffset();
        const oIndex = this.config.index;
        const posi = {x: oIndex.x, y: oIndex.y}
        const {x, y} = this.getWrapSize().wrap;
        if (offset.x > x / 2) posi.x--;
        if (offset.x < -x / 2) posi.x++;

        if (offset.y > y / 2) posi.y--;
        if (offset.y < -y / 2) posi.y++;
        this.config.index = posi;
      } else this.nowPosi = this.getLimitedPosition();
      this.config.onTouchEnd && this.config.onTouchEnd(this.config.index, this.config);
    },

    hideFlashTip () {
      this._isLoading = false;
      this.showReflashTip = false;
      this.isShowingTip = true;
      this.nowPosi.y = 0;
      setTimeout(() => this.config.noHandelMove = false, 300);
    },
    onReflash () {
      if (this.needReflash && this.showReflashTip) this.config.reflash(this.config, this.hideFlashTip)
      else this.hideFlashTip();
    },
    hideLoadTip (noMore) {
      this._isLoading = false;
      this.showLoadMoreTip = false;
      this.config.noMore = !!noMore;
      const wrapSize = this.getWrapSize();
      this.isShowingTip = true;
      this.nowPosi.y = wrapSize.wrap.y - wrapSize.inner.y;
      setTimeout(() => this.config.noHandelMove = false, 300);
    },
    onLoading () {
      if (this.needLoading && this.showLoadMoreTip) {this.config.loadMore(this.config, this.hideLoadTip)}
      else this.hideLoadTip();
    },
    setIndex (obj) {
      let {x, y} = obj;
      const itemNum = this.config.itemNum;
      if (x !== undefined){
        if (x < 0) x = 0;
        if (x >= itemNum.x - 1) x = itemNum.x - 1;
        this.config.index.x = x;
        this.nowPosi.x = this.getWrapSize().wrap.x * -x;
      }
      if (y !== undefined){
        if (y < 0) y = 0;
        if (y >= itemNum.y - 1) y = itemNum.y - 1;
        this.config.index.y = y;
        this.nowPosi.y = this.getWrapSize().wrap.y*-y;
        this.posi.y = this.nowPosi.y;
      }
    },
    getOffset(){
      const touching = this.drag.isTouching;
      const offset = this.drag.getOffset();
      const speed = touching ? {x: 0, y: 0} : this.drag.getSpeed();
      return {
        x: offset.x + speed.x * Math.abs(speed.x) * this.rate,
        y: offset.y + speed.y * Math.abs(speed.y) * this.rate
      }
    },
    getUnLimitedPosition(){
      const touching = this.drag.isTouching;
      const posi = this.posi;
      const offset = this.drag.getOffset();
      const speed = touching ? {x: 0, y: 0} : this.drag.getSpeed();
      return {
        x: posi.x + offset.x + speed.x * Math.abs(speed.x) * this.rate,
        y: posi.y + offset.y + speed.y * Math.abs(speed.y) * this.rate
      }
    },
    getLimitedPosition(){
      const touching = this.drag.isTouching;
      let pos = this.getUnLimitedPosition();
      const {inner, wrap} = this.getWrapSize();
      const dVal = {x: wrap.x - inner.x, y: wrap.y - inner.y};
      this[touching ? "touchingLimit" : "normalLimit"](pos, dVal);
      return pos;
    },
    evalIndex (pos, derc) {
      const perLen = this.getWrapSize().wrap[derc];
      const oriIndex = Math.round(pos[derc] / perLen);
      const der = oriIndex >= 0 ? 1 : -1;
      let index = Math.abs(oriIndex);
      const cIndex = this.config.index;

      const itemNum = this.config.itemNum;
      if (index < 0) index = 0;
      if (index >= itemNum[derc]) index = itemNum[derc] - 1;
      this.config.index[derc] = index;
      pos[derc] = der * index * perLen;

    },
    cacheWrapSize () {
      const $el = this.$el;
      if (!$el) return { wrap: {x: 0, y: 0}, inner: {x: 0, y: 0} };
      const $ele = $el.getElementsByClassName("vuc-scroll-wrap")[0];
      const wrap = {x: $el.offsetWidth, y: $el.offsetHeight}

      // x 周因为 元素最大为100%，顾需要手动计算 y轴不用
      let ix = $ele.offsetWidth * this.config.itemNum.x;
      let iy = $ele.offsetHeight;

      // 当不能根据容器的体积计算出滚动长度的时候， 我们需要根据他的子节点的宽度来让其滚动
      if (this.config.isGetInnerSizeByChild) {
        const child = $ele.children[0];
        ix = child ? child.offsetWidth : 0;
        iy = child ? child.offsetHeight : 0;
      }
      const inner = {x: ix, y: iy};
      this.catchedWrapsize = {wrap, inner};
      return this.catchedWrapsize;
    },
    getWrapSize (getNew) {return getNew ? this.cacheWrapSize() : (this.catchedWrapsize ||  this.cacheWrapSize());},
    touchingLimit (pos, dVal) {
      this.callXTouchingEndFn(pos, dVal);// x 超界回调
      this.callYTouchingEndFn(pos, dVal);// y越界回调
      this.touchingDamp(pos, dVal);// 超界有阻尼
    },
    normalLimit (pos, dVal) {
      // y轴 越界回调
      if (this.showReflashTip) {
        this._isLoading = true;
        this.onReflash();
      }
      if (this.showLoadMoreTip) {
        this._isLoading = true;
        this.onLoading();
      }
      // 越界限制
      if (pos.x > 0) pos.x = 0;
      if (dVal.x > 0) pos.x = 0;
      else if (pos.x < dVal.x) pos.x = dVal.x;
      // y轴方向 // 如果大于了150
      if (this.showReflashTip) pos.y = 50;
      else if (pos.y > 100) {
        // 顶部回弹
        pos.y > 100 && (pos.y = 0);
        this.animatingT = true;
      } else if (pos.y > 0){
        pos.y = 0;
      }
      if (dVal.y > 0) pos.y = 0; // 内容比容器小
      else if (this.showLoadMoreTip) pos.y = dVal.y - 50;
      else if (pos.y < dVal.y - 100) {
        // 底部回弹
        pos.y < dVal.y - 100 && (pos.y = dVal.y);
        this.animatingB = true;
        // 底部回弹时，如果需要加载更多， 则触发加载更多
        if (this.needLoading) {this.config.loadMore(this.config, this.hideLoadTip)}
      } else if (pos.y < dVal.y) {
        pos.y = dVal.y;
      }
      const itemNum = this.config.itemNum;
      // 如果x 方向切换
      if (itemNum.x-1) this.evalIndex(pos, "x");
      // 如果y 防线切换
      if (itemNum.y - 1) this.evalIndex(pos, "y");
    },
    // 触摸相关函数
    callXTouchingEndFn (pos, dVal) {
      const f = this.damp; // 阻尼
      // x 超界函数
      if(pos.x * f > 30) {
        !this.hasOnEndEv && this.config.onLeftEnd && this.config.onLeftEnd();
        this.hasOnEndEv = true;
      }
      if ((dVal.x - pos.x) * f > 30 ){
        !this.hasOnEndEv && this.config.onRightEnd && this.config.onRightEnd();
        this.hasOnEndEv = true;
      }
    },
    callYTouchingEndFn (pos, dVal) {
      // y越界回调 显示|隐藏加载更多|刷新提示
      this.showReflashTip = this.needReflash && pos.y > 150;
      this.showLoadMoreTip = this.needLoading && dVal.y - pos.y > 150;
    },
    touchingDamp (pos,dVal) {
      const f = this.damp; // 阻尼
      const fix = this.drag.touching ? 50 : 0;
      // 超界有阻尼
      if (pos.x > 0) {pos.x = pos.x * f;}
      if (dVal.x > 0) {pos.x = pos.x * f;} // 内容没铺满容器
      else if (pos.x < dVal.x) {pos.x = (pos.x - dVal.x) * f + dVal.x;}
      if (pos.y > 0) {pos.y = (pos.y - fix) * f + fix;}
      if (dVal.y > 0) {pos.y = pos.y * f; }
      else if (pos.y < dVal.y) {pos.y = (pos.y - dVal.y + fix) * f + dVal.y - fix;}
    }
  },
}
</script>
<style type="text/css" scoped>
/*滚动开始*/
.vuc-scroll{
  flex: 1;
  position: relative;
  overflow: hidden;
}
.vuc-scroll-wrap{
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  will-change: transform;
  font-size: 0;
  /*background-color: #fff;*/
}
.vuc-scroll-wrap.x{
  height: 100%;
  white-space: nowrap;
}
.vuc-scroll-wrap.y{
  width: 100%;
}
.vuc-scroll-wrap.full{
  height: 100%;
}
/*滚动结束*/
/*滚动开始*/
.vue-scroll-reflash,
.vue-scroll-loadmore{
  position: absolute;
  width: 100%;
  height: 2.5rem;
  text-align: center;
  line-height: 2.5rem;
  overflow: hidden;
  left: 0;
}
.vue-scroll-reflash{
  top: 0;
}
.vue-scroll-loadmore{
  bottom: 0;
}
/*滚动结束*/
</style>
