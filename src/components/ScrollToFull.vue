<template>
  <div class="vuc-scroll-to-full" :class="{
    vucScrollFull: isActive,
    hightIndexLevel: hightIndexLevel,
    expanded: isExpanded
   }" @click="saocuoazuo" @touchmove="stopMove($event)" @webkitTransitionEnd="transitonEnd">
    <div class="vuc-scroll-to-full-inner" :style="innerStyle">
      <div class="vuc-scroll-to-full-content" :class="{vucScrollFullInner: isActive,}">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'vue-vuc-scroll-to-full',
  data() {
    return {
      hightIndexLevel: false,
      styleDate: "",
      isActive: false,
      isExpanded: false,
    }
  },
  computed: {
    innerStyle() {
      const data = this.styleDate;
      return {
        top: `${data.top}px`,
        left: `${data.left}px`,
        right: `${data.right}px`,
        bottom: `${data.bottom}px`,
      }
    }
  },
  props: ["config"],
  mounted() {
  },
  watch: {},
  methods: {
    stopMove(ev) {
      ev.cancelBubble = this.isActive;
    },
    getEl($el) {
      return Array.prototype.includes.call($el.classList, "vuc-scroll-to-full") ? $el : this.getEl($el.parentNode);
    },
    transitonEnd() {
      this.hightIndexLevel = this.isActive;
      this.config._isLoading || (this.config.noHandelMove = false);
    },
    saocuoazuo(ev) {
      this.config.noHandelMove = true;
      const $el = this.$el;
      const scope = this.config.scope;
      const wrapSizes = scope.getWrapSize(true)
      const wrapsize = wrapSizes.wrap;
      const innersize = wrapSizes.inner;
      const offsetssize = {
        x: $el.parentNode.offsetWidth,
        y: $el.parentNode.offsetHeight,
      };
      const offsetsposi = {
        x: $el.parentNode.offsetLeft,
        y: $el.parentNode.offsetTop,
      };
      const posi = scope.posi;

      const expandedStyleDate = {
        top: offsetsposi.y,
        left: offsetsposi.x,
        right: innersize.x - offsetsposi.x + posi.x - offsetssize.x,
        bottom: innersize.y - offsetsposi.y - offsetssize.y,
        height: offsetssize.y,
        width: offsetssize.x,
      };
      const unExpandedStyleDate = {
        top: -posi.y,
        left: -posi.x,
        right: posi.x + innersize.x - wrapsize.x,
        bottom: posi.y + innersize.y - wrapsize.y,
        height: wrapsize.y,
        width: wrapsize.x,
      };

      this.isExpanded = true;
      if (this.isActive) {
        // 关
        this.styleDate = expandedStyleDate;
        this.isActive = false;
      } else {
        // 开
        this.hightIndexLevel = this.isActive = true;
        this.styleDate = expandedStyleDate;
        setTimeout(() => this.styleDate = unExpandedStyleDate, 20)
      }
    },
  },
}
</script>
<style type="text/css" scoped>
  .vuc-scroll-to-full {
    height: 100%;
    width: 100%;
    display: flex;
  }

  .vuc-scroll-to-full-inner {
    flex: 1;
    display: flex;
    transition: all .6s cubic-bezier(.75, -.25, .25, 1.25);
  }

  .vuc-scroll-to-full.hightIndexLevel > .vuc-scroll-to-full-inner {
    z-index: 20;
  }

  .vuc-scroll-to-full.expanded > .vuc-scroll-to-full-inner {
    position: absolute;
  }

  .vuc-scroll-to-full-content {
    transition: all .6s;
    flex: 1;
  }
</style>
