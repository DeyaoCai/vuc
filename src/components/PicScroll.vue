<template>
  <div
    class="vuc-scroll"
    @touchstart="iEvent.touchEv($event)"
    @touchmove.prevent.stop="iEvent.moveEv($event)"
    @touchend="iEvent.endEv()"
    ref="wrapObj"
  >
    <div ref="innerObj">
      <img class="vuc-scroll-wrap" :src="config.src" :style="innerStyle" @load="imgLoad"/>
    </div>
  </div>
</template>
<script>
import tools from '@vuc/tools';
const {Drag, IEvent, DoubleDrag, SingleDragData, DoubleDragData} = tools;

export default {
  name: 'vue-scroll',
  props: ["config"],
  data() {
    const iEvent = new IEvent({tips: 0});
    const doubleDragData = new DoubleDragData();
    const singleDragData = new SingleDragData();
    const wrapObj = {
      posi: {x: 0, y: 0},
      size: {x: 0, y: 0},
    };
    const innerObj = {
      posi: {x: 0, y: 0},
      size: {x: 0, y: 0},
    };
    return {
      wrapObj,
      innerObj,
      doubleDragData,
      singleDragData,
      drag: new Drag(),
      iEvent: iEvent,
      doubleDrag: new DoubleDrag(),
    }
  },
  computed: {
    indexs() {
      return this.config.index
    },
    innerStyle() {
      const nowRate = this.doubleDragData.nowRate;
      const nowPosi = this.singleDragData.nowPosi;
      return {
        "transform-origin": `${50}% ${50}%`,
        transform: `translate(${nowPosi.x}px, ${nowPosi.y}px) scale(${nowRate},${nowRate})`,
        transition: `transform ${this.shouldUseTransition ? ".3" : "0"}s`
      }
    },
  },
  mounted() {
    this.cacheWrapSize();
    this.iEvent.changeEvFunc("iTouch", ev => {
      this.drag.touchEv(ev);
    }).changeEvFunc("iMove", ev => {
      this.shouldUseTransition = false;
      this.drag.moveEv(ev);
      this.setNowPosi();
    }).changeEvFunc("iEnd", () => {
      this.drag.endEv();
      this.shouldUseTransition = true;
      this.setPosi();
    }).changeEvFunc("iDoubleTouch", ev => {
      this.doubleDrag.touchEv(ev);
    }).changeEvFunc("iDoubleMove", ev => {
      this.shouldUseTransition = false;
      this.doubleDrag.moveEv(ev);
      this.setNowRate();
    }).changeEvFunc("iDoubleEnd", ev => {
      this.shouldUseTransition = true;
      this.doubleDrag.endEv(ev);
      this.setRate();
    });
  },
  methods: {
    setNowRate() {
      let rate = this.doubleDragData.rate;
      const offset = this.doubleDrag.getOffset();
      rate = rate + offset / 100;
      rate > 2.5 && (rate = 2.5);
      rate < 0.3 && (rate = 0.3);
      this.doubleDragData.setNowRate(rate);
    },
    setRate() {
      let rate = this.doubleDragData.rate;
      const offset = this.doubleDrag.getOffset();
      rate = rate + offset / 100;
      rate > 2 && (rate = 2);
      rate < 0.5 && (rate = 0.5);
      this.doubleDragData.setRate(rate);
    },
    setPosi() {
      const {wrapObj, innerObj, doubleDragData} = this;
      const rate = doubleDragData.rate;
      const wSize = wrapObj.size;
      const iSize = innerObj.size;
      const posi = this.singleDragData.posi;
      const offset = this.drag.getOffset();
      let x = posi.x + offset.x;
      let y = posi.y + offset.y;
      const rSize = {
        x: iSize.x * rate,
        y: iSize.y * rate,
      }
      const half = {
        x: (rSize.x - wSize.x) / 2,
        y: (rSize.y - wSize.y) / 2,
      };
      if (wSize.x > rSize.x) {
        x = 0;
      } else {
        x > half.x && (x = half.x);
        x < -half.x && (x = -half.x);
      }
      if (wSize.y > rSize.y) {
        y = 0;
      } else {
        y > half.y && (y = half.y);
        y < -half.y && (y = -half.y);
      }
      this.singleDragData.setPosi({x, y});
    },
    setNowPosi() {
      const posi = this.singleDragData.posi;
      const offset = this.drag.getOffset();
      this.singleDragData.setNowPosi({
        x: posi.x + offset.x,
        y: posi.y + offset.y,
      });
    },
    // 缓存容器大小
    cacheWrapSize() {
      const {innerObj, wrapObj} = this.$refs;
      this.wrapObj.size = {
        x: (wrapObj && wrapObj.offsetWidth) || 0,
        y: (wrapObj && wrapObj.offsetHeight) || 0,
      };
      this.innerObj.size = {
        x: (innerObj && innerObj.offsetWidth) || 0,
        y: (innerObj && innerObj.offsetHeight) || 0,
      };
    },
    imgLoad() {
      this.cacheWrapSize();
    },
  },
}
</script>
<style type="text/css" scoped>
  .vuc-scroll {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .vuc-scroll > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .vuc-scroll-wrap {

  }
</style>
