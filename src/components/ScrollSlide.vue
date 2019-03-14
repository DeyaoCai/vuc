<template>
  <div
    class="vuc-scroll-slide"
    @touchstart="touchEv($event)"
    @touchmove="moveEv($event)"
    @touchend="endEv()"
    @webkitTransitionEnd="transitionEnd"
    :class="{
      del: config.isDeleted,
      deled: isDeleted,
      expanded: this.posi.x
     }"
  >
    <div class="vuc-scroll-slide-btns">
      <div></div>
      <slot name="btns"/>
    </div>
    <div class="vuc-scroll-slide-wrap" :style="innerStyle">
      <slot/>
      <div class="vuc-scroll-slide-signs">
        <Icon :type="'arrow-left'"></Icon>
      </div>
    </div>
  </div>
</template>
<script>
import Drag from "../tools/Drag.js";
import Icon from "./Icon.vue";
export default {
  name: 'vue-scroll',
  components: {Icon},
  data () {return {
    drag: new Drag(),
    isDeleted: false,
    posi: {x: 0, y: 0},
    nowPosi:{x: 0, y: 0},
    damp: 0.3,
    rate: 0.5,
    catchedWrapsize: null,
    isDeleted: false,
  }},
  computed:{
    innerStyle () {
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
  props: ["config","supConf"],
  watch:{
    config(){
      this.inits && this.inits();
    },
  },
  mounted () {
    this.inits && this.inits();
  },
  methods: {
    transitionEnd(ev){
      if(ev.propertyName === "opacity") this.isDeleted = true;
    },
    inits () {
      this.drag.prevent = "y";
      this.confg || (this.confg = {});
      this.config.hide = () => (this.nowPosi = this.posi = {x: 0, y: 0});
    },
    touchEv (ev) {
      this.supConf &&
        this.supConf.expandedItem &&
        this.supConf.expandedItem !== this.config &&
        this.supConf.expandedItem.hide &&
        this.supConf.expandedItem.hide();
      this.supConf.expandedItem = this.posi.x ? this.config : null;
      const styleTransfrom = window.getComputedStyle(this.$el.querySelector(".vuc-scroll-slide-wrap")).transform.split(", ");
      this.posi.x = this.nowPosi.x = styleTransfrom.splice(-2, 1) * 1;
      this.moved = false;
      this.drag.touchEv(ev);
      this.cacheWrapSize();
    },
    moveEv (ev) {
      this.moved = true;
      this.drag.moveEv(ev);
      this.nowPosi = this.getLimitedPosition();
      this.supConf.expandedItem = this.config;
    },
    endEv () {
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
  transform: scale(1,1);
  opacity: 1;
  transition: all .6s;
}
.vuc-scroll-slide.del{
  transform: scale(.8,.8);
  opacity: 0;
}
.vuc-scroll-slide.deled{
  display: none;
}

.vuc-scroll-slide-wrap{
  position: relative;
  font-size: 0;
  background-color: #fff;
  transition: all .3s;
  padding-right: 1.2rem;
}
.vuc-scroll-slide.del .vuc-scroll-slide-wrap{
  transform: scale(0,0);
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
  .vuc-scroll-slide-signs{
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
