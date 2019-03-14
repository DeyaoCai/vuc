<template>
  <div
    class="vuc-scroll-slide"
     @touchstart="touchEv($event)"
     @touchmove="moveEv($event)"
     @touchend="endEv()"
  >
    <div class="vuc-scroll-slide-btns">
      <div></div>
      <slot name="btns"/>
    </div>
    <div class="vuc-scroll-slide-wrap" :style="innerStyle"><slot/></div>
  </div>
</template>
<script>
import Drag from "../tools/Drag.js";
export default {
  name: 'vue-scroll',
  data () {return {
    drag: new Drag(),
    posi: {x: 0, y: 0},
    nowPosi:{x: 0, y: 0},
    damp: 0.3,
    rate: 0.5,
    showReflashTip: false,
    showLoadMoreTip: false,
    isShowingTip: false,
    _isLoading: false,
    hasOnEndEv: false,
    catchedWrapsize: null,
  }},
  computed:{
    innerStyle(){
      const pos = this.nowPosi;
      const posi = this.posi;
      const touching = this.drag.isTouching;
      const offset = this.drag.getOffset();
      const offsetY = pos.y - posi.y - offset.y;
      let ti = Math.abs(offsetY / 500);
      ti < 0.3 && (ti = 0.3);
      touching || (this.posi.x = pos.x);
      ti > 1 && (ti = 1);
      return {
        transform: `translate3d(${pos.x}px, ${pos.y}px,0)`,
        transition: `transform ${touching ? 0 : ti}s ease-out`,
      }
    },
  },
  props: ["config"],
  mounted () {
    this.inits && this.inits();
  },
  watch: {},
  methods: {
    inits () {
      this.drag.prevent = "y";
      this.confg || (this.confg = {});
      this.config.canClick = () => this.canFatherClick;
      this.config.hide = () => (this.nowPosi = this.posi = {x: 0, y: 0});
    },
    touchEv (ev) {
      const styleTransfrom = window.getComputedStyle(this.$el.querySelector(".vuc-scroll-slide-wrap")).transform.split(", ");
      this.posi.x = this.nowPosi.x = styleTransfrom.splice(-2, 1) * 1;
      if (this._isLoading) return;
      this.canFatherClick = !this.posi.x;
      this.moved = false;
      this.drag.touchEv(ev);
      this.cacheWrapSize();
    },
    moveEv (ev) {
      if (this._isLoading) return;
      this.moved = true;
      this.drag.moveEv(ev);
      this.nowPosi = this.getLimitedPosition();

    },
    endEv () {
      if (this._isLoading) return;
      this.drag.endEv();
      this.nowPosi = this.moved ? this.getLimitedPosition() : {x: 0, y: 0};
    },
    getOffset () {
      const touching = this.drag.isTouching;
      const offset = this.drag.getOffset();
      const speed = touching ? {x: 0, y: 0} : this.drag.getSpeed();
      return {
        x: offset.x + speed.x * Math.abs(speed.x) * this.rate,
        y: 0
      }
    },
    getUnLimitedPosition () {
      const touching = this.drag.isTouching;
      const posi = this.posi;
      const offset = this.drag.getOffset();
      const speed = touching ? {x: 0, y: 0} : this.drag.getSpeed();
      return {
        x: posi.x + offset.x + speed.x * Math.abs(speed.x) * this.rate,
        y: 0
      }
    },
    getLimitedPosition () {
      const touching = this.drag.isTouching;
      let pos = this.getUnLimitedPosition();
      this[touching ? "touchingLimit" : "normalLimit"](pos, this.getWrapSize());
      return pos;
    },
    cacheWrapSize () {
      this.catchedWrapsize = this.$el ? this.$el.querySelector(".vuc-scroll-slide-btns>div:last-child").offsetWidth : 0;
      return this.catchedWrapsize;
    },
    getWrapSize () {return this.catchedWrapsize || this.cacheWrapSize();},
    touchingLimit (pos, dVal) {
      const f = this.damp; // 阻尼
      if (pos.x > 0) pos.x = 0;
      if (pos.x < -dVal) pos.x = (pos.x + dVal) * f - dVal;
    },
    normalLimit (pos, dVal) {
      if (pos.x > 0) pos.x = 0;
      pos.x = pos.x < -dVal / 2 ? -dVal : 0;
    },
  },
}
</script>
<style type="text/css" scoped>
/*滚动开始*/
.vuc-scroll-slide{
  position: relative;
  overflow: hidden;
}
.vuc-scroll-slide-wrap{
  position: relative;
  will-change: transform;
  font-size: 0;
  background-color: #fff;
}
.vuc-scroll-slide-btns{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
}
.vuc-scroll-slide-btns>div:first-child{
  flex: 1 1 0;
}
.vuc-scroll-slide-btns>div:last-child{
  font-size: 0;
}
.vuc-scroll-slide-btns>div:last-child>*{
  font-size: .6rem;
  display: inline-block;
}
</style>
