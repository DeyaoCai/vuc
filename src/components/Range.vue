<template>
  <div
    class="vuc-range"
    :class="[activeClass, {touching: isTouching, single: isSingle}]"
     @touchstart.stop="touchEv($event)"
     @touchmove.stop="moveEv($event)"
     @touchend.stop="endEv()"
  >
    <span>{{config.min}}</span>
    <div class="vuc-range-inner">
      <div class="vuc-range-wrap"><div :style="lineStyle"></div></div>

      <div v-if="isSingle !== 'only-right'" class="vuc-range-ball ball-f" :style="ballFStyle"><b>{{minTxt}}</b></div>
      <div v-if="isSingle !=='only-left'" class="vuc-range-ball ball-l" :style="ballLStyle"><b>{{maxTxt}}</b></div>
    </div>
    <span>{{config.max}}</span></div>
</template>
<script>
import Drag from "../tools/Drag.js";
import config from "../http/config";
export default {
  name: 'vue-scroll',
  data(){
    const posis = {
      ballF: {x: 0, y: 0},
      ballL: {x: 0, y: 0},
    };
    const nowPosis = {
      ballF: {x: 0, y: 0},
      ballL: {x: 0, y: 0},
    };
    this.config.setPosi = per => {
      if (!this.isTouching){
        this.posis.ballF.x = this.nowPosis.ballF.x = this.getWrapSize().max * per;
      }
    }
    return {
      drag: new Drag(),
      posis,
      nowPosis,
      posi: posis.ballF,
      nowPosi: posis.ballL,
      damp: .3,
      rate: 0,
      _isLoading:false,
      hasOnEndEv:false,
      catchedWrapsize: null,
      shallHandelOtherEv: false,
      isTouching: false,
      activeClass: null,
    }
  },
  computed:{
    isSingle () {return this.config.isSingle},
    minTxt () {
      const conf = this.config;
      const range = conf.max - conf.min;
      const per = range / (conf.howMuchRange || range);
      const $ele = this.$el && this.$el.getElementsByClassName("vuc-range-inner")[0];
      return Math.round((conf.max - conf.min) * this.nowPosis.ballF.x / (($ele && $ele.offsetWidth) || 1) / per) * per + conf.min;
    },
    maxTxt () {
      const conf = this.config;
      const range = conf.max - conf.min;
      const per = range / (conf.howMuchRange || range);

      const $ele = this.$el && this.$el.getElementsByClassName("vuc-range-inner")[0];
      return Math.round((conf.max - conf.min) * this.nowPosis.ballL.x / (($ele && $ele.offsetWidth) || 1) / per) * per + conf.max;
    },
    indexs () {return this.config.index},
    posiInfo () {
      const touching = this.drag.isTouching;
      const pos = this.nowPosi;
      const posi = this.posi;
      const offset = this.drag.getOffset();
      const offsetY = pos.y - posi.y - offset.y;
      let ti = Math.abs(offsetY/1000);
      ti < .3 && (ti = .3);
      const conf = this.config;
      if (!touching && conf.howMuchRange !== undefined){
        const num = conf.howMuchRange;
        if (num) {
          const dis = this.$el && this.$el.getElementsByClassName("vuc-range-inner")[0].offsetWidth;
          if (dis) {
            const perDis = dis / num;
            pos.x = Math.round(pos.x / perDis) * perDis;
          }
        }
        posi.x = pos.x;
      }
      ti > 1 && (ti = 1);
      if (this.config.takeOneStepAtATime) ti = .3;
      return ti
    },
    lineStyle () {
      const isSingle = this.isSingle;
      const $ele = this.$el && this.$el.getElementsByClassName("vuc-range-inner")[0];
      return {
        left: `${isSingle === "only-left" ? 0 : this.nowPosis.ballF.x}px`,
        right: `${isSingle === "only-left"
          ? ($ele ? ($ele.offsetWidth - this.nowPosis.ballF.x) : ("100%"))
          : -this.nowPosis.ballL.x}px`.replace("%px", "%"),
        transition: `all ${this.config.howMuchRange ? this.drag.isTouching ? 0 : this.posiInfo : 0}s ease-out`,
      }
    },
    ballFStyle () {return {
      transform: `translate3d(${this.nowPosis.ballF.x}px, 0, 0)`,
      transition: `transform ${this.config.howMuchRange ? this.drag.isTouching ? 0 : this.posiInfo : 0}s ease-out`,
    }},
    ballLStyle () {return {
      transform: `translate3d(${this.nowPosis.ballL.x}px, 0, 0)`,
      transition: `transform ${this.config.howMuchRange ? this.drag.isTouching ? 0 : this.posiInfo : 0}s ease-out`,
    }},

    prevent(){return this.config && this.config.derction ? {"": "", x: "y", y: "x", xy: "xy"}[this.config.derction] : "";},
    inits(){
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
    },

  },
  props:["config", "height", "full"],
  mounted(){
    this.config.getPosi = () => this.posi;
    this.inits && this.inits();
  },
  watch: {
    indexs () {
      this.setIndex(this.indexs);
    },
    prevent () {
      this.drag.prevent = this.prevent;
      this.config.reSetPosiWhenDerctionChanged && (this.nowPosi.x = 0);
    },
  },
  methods: {
    callPosiChangeEv(type){
      const $ele = this.$el && this.$el.getElementsByClassName("vuc-range-inner")[0];
      this.config.onChange && this.config.onChange({
        left: $ele ? this.nowPosis.ballF.x / $ele.offsetWidth : 1,
        right: $ele ? this.nowPosis.ballL.x / $ele.offsetWidth : 0,
        type
      });
    },
    touchEv (ev) {
      const $el = this.$el;
      if (!$el) return { max: 0, min: 0 };
      const ballF = $el.getElementsByClassName("ball-f")[0];
      const ballL = $el.getElementsByClassName("ball-l")[0];
      let className;
      if (ev.target !== ballF && ev.target !== ballL && ev.target.parentNode !== ballF && ev.target.parentNode !== ballL) return;
      this.shallHandelOtherEv = true;
      if (ev.target === ballF || ev.target.parentNode === ballF) {
        this.posi = this.posis.ballF;
        this.nowPosi = this.nowPosis.ballF;
        className = "ball-f";
      }
      if (ev.target.parentNode === ballL || ev.target === ballL) {
        this.posi = this.posis.ballL;
        this.nowPosi = this.nowPosis.ballL;
        className = "ball-l";
      }
      this.activeClass = className;
      const styleTransfrom = window.getComputedStyle(this.$el.getElementsByClassName(className)[0]).transform.split(", ");
      this.posi.x = this.nowPosi.x = styleTransfrom.splice(-2, 1) * 1;
      this.callPosiChangeEv("start");
      this.hasOnEndEv = false;
      if (this._isLoading) return;
      this.drag.touchEv(ev);
      this.isTouching = true;
      this.cacheWrapSize();
    },
    moveEv(ev) {
      if (this._isLoading) return;
      if (!this.shallHandelOtherEv) return;
      this.drag.moveEv(ev);
      this.nowPosi.x = this.getLimitedPosition().x;
      this.config.onTouchEnd && this.config.onTouchEnd(this.config.index, this.config);
      this.callPosiChangeEv("move");
    },
    endEv() {
      if (this._isLoading) return;
      if (!this.shallHandelOtherEv) return;
      this.isTouching = false;
      this.shallHandelOtherEv = false;
      this.drag.endEv();
      this.nowPosi.x = this.getLimitedPosition().x;
      this.callPosiChangeEv("end");
    },
    setIndex (obj) {
      let {x} = obj;
      const itemNum = this.config.itemNum;
      if (x !== undefined){
        if (x < 0) x = 0;
        if (x >= itemNum.x - 1) x = itemNum.x - 1;
        this.config.index.x = x;
        this.nowPosi.x = this.getWrapSize().max * -x;
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
      this[touching ? "touchingLimit" : "normalLimit"](pos, this.getWrapSize());
      return pos;
    },
    evalIndex(pos, derc) {
      const perLen = this.getWrapSize().wrap[derc];
      const oriIndex = Math.round(pos[derc] / perLen);
      const der = oriIndex >= 0 ? 1 : -1;
      let index = Math.abs(oriIndex);
      const cIndex = this.config.index;

      const itemNum = this.config.itemNum;
      if(index < 0) index = 0;
      if(index >= itemNum[derc]) index = itemNum[derc] - 1;
      this.config.index[derc] = index;
      pos[derc] = der * index * perLen;

    },
    cacheWrapSize(){
      const $ele = this.$el && this.$el.getElementsByClassName("vuc-range-inner")[0];
      if (!$ele) return { max: 0, min: 0 };
      // x 周因为 元素最大为100%，顾需要手动计算 y轴不用
      let min;
      let max;
      if (this.posi === this.posis.ballF) {
        min = 0;
        max = $ele.offsetWidth + this.posis.ballL.x;
      }
      if (this.posi === this.posis.ballL) {
        min = this.posis.ballF.x - $ele.offsetWidth;
        max = 0;
      }
      this.catchedWrapsize = {max, min};
      return this.catchedWrapsize;
    },
    getWrapSize(){return this.catchedWrapsize ||  this.cacheWrapSize();},
    touchingLimit(pos, dVal){
      this.callXTouchingEndFn(pos, dVal);// x 超界回调
      this.touchingDamp(pos, dVal);// 超界有阻尼
    },
    normalLimit(pos, dVal){
      // 越界限制
      if (pos.x < dVal.min) pos.x = dVal.min;
      if (pos.x > dVal.max) pos.x = dVal.max;
    },
    // 触摸相关函数
    callXTouchingEndFn(pos, dVal) {
      const f = this.damp; // 阻尼
      // x 超界函数
      if(pos.x * f > 50) {
        !this.hasOnEndEv && this.config.onLeftEnd && this.config.onLeftEnd();
        this.hasOnEndEv = true;
      }
      if ((dVal.x - pos.x) * f > 50 ) {
        !this.hasOnEndEv && this.config.onRightEnd && this.config.onRightEnd();
        this.hasOnEndEv = true;
      }
    },
    touchingDamp(pos,dVal){
      if (pos.x < dVal.min) pos.x = dVal.min;
      if (pos.x > dVal.max) pos.x = dVal.max;
      // const f = this.damp; // 阻尼
      // if (pos.x < 0) {pos.x = pos.x * f;}
      // if (pos.x > dVal) {pos.x = (pos.x - dVal) * f + dVal;}
    }
  },
}
</script>
<style type="text/css" scoped>
/*滚动开始*/
.vuc-range{
  position: relative;
  width: 100%;
  padding: 1rem 0;
  background-color: rgba(255,255,255,.1);
  display: flex;
  font-size: .6rem;
}
.vuc-range>span{
  display: inline-block;
  color: rgba(255,255,255,.3);
  width: 3rem;
  padding: 0 1rem;
}
.vuc-range>*:first-child{
  text-align: right;
  font-size: .5rem;
}
.vuc-range>*:last-child{
  text-align: left;
  font-size: .5rem;
}
.vuc-range>.vuc-range-inner{
  position: relative;
  flex: 1 1;
}
.vuc-range-wrap{
 position: absolute;
 top: 50%;
 left: 0px;
 right: 0px;
 height: 2px;
 background-color: rgba(0,0,0,.3);
}
.vuc-range-wrap>div{
  position: absolute;
  left: 0px;
  right: 0px;
  height: 100%;
  background-color: #fff;
}
.vuc-range-ball{
  position: absolute;
  top: 50%;
  color: #fff;
  will-change: transform;
}
.vuc-range-ball.ball-f{
  left: 0;
}
.vuc-range-ball.ball-l{
  right: 0;
}
.vuc-range-ball:before{
  content: "";
  box-sizing: border-box;
  top: 50%;
  display: block;
  width: 1rem;
  height: 1rem;
  border-radius: .5rem;
  background-color: #418dcb;
  animation: beating infinite 1s;
}
@keyframes beating {
  0%{
    border: 0 solid rgba(255,255,255,.5);
  }
  100%{
    border: .4rem solid rgba(255,255,255,0);
  }
}
@keyframes beatingOutline {
  0%{
    outline: 0 solid rgba(255,255,255,.4);
  }
  100%{
    outline: .3rem solid rgba(255,255,255,0);
  }
}
.vuc-range-ball.ball-f:before{
  transform: translate(-1rem,-.5rem);
}
.vuc-range-ball.ball-l:before{
  transform: translate(1rem,-.5rem);
}
.single .vuc-range-ball.ball-f:before{
  transform: translate(-.5rem,-.5rem);
}
.single .vuc-range-ball.ball-l:before{
  transform: translate(.5rem,-.5rem);
}
.vuc-range-ball b{
  display: inline-block;
  position: absolute;
  top: 0%;
  padding: .4rem .6rem;
  border-radius: .2rem;
  background-color: rgba(0,0,0,.2);
  color: #fff;
  font-size: .5rem;
  transition: all .3s;
  z-index: -1;
  animation: beatingOutline infinite 1s;
}
.vuc-range-ball.ball-f b{
  left: -50%;
  transform: translate(-50%, -50%) scale(0,0);
}
.single .vuc-range-ball.ball-f b{
  left: 0;
}
.touching.ball-f .vuc-range-ball.ball-f b{
  transform: translate(-50%, -200%) scale(1, 1);
}

.vuc-range-ball.ball-l b{
  right: -50%;
  transform: translate(50%, -50%) scale(0,0);
}
.single .vuc-range-ball.ball-l b{
  right: 0;
}
.touching.ball-l .vuc-range-ball.ball-l b{
  transform: translate(50%, -200%) scale(1, 1);
}
</style>
