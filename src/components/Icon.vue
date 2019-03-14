<template>
  <div class="vuc-icon" :class="getClass(type)">
    <span :style="spanStyle" @click="config && config.click && config.click()"></span>
  </div>
</template>
<script>
import getClass from "../tools/compType.js";
export default {
  name: 'vuc-btn',
  props:["type", "config"],
  methods: {
    getClass (type) {return getClass(type);},
  },
  computed: {
    spanStyle () {
      const ret = {
        "border-top": ".4rem solid transparent",
        "border-left": ".4rem solid transparent",
        "border-bottom": ".4rem solid transparent",
        "border-right": ".4rem solid transparent",
      };
      const color = (this.config && this.config.color) || "#418dcb";
      const dre = this.type.replace(/.*arrow-(left|right|bottom|top).*/, "$1");
      const map = {
        top: ["top", "right"],
        left: ["left", "top"],
        bottom: ["bottom", "left"],
        right: ["bottom", "right"],
      }[dre];
      map && map.forEach(setBorder);
      function setBorder (dre) {ret["border-" + dre] = `.4rem solid ${color}`;};
      return ret;
    },
  },
}
</script>
<style type="text/css" scoped>
  .vuc-icon{
    position: relative;
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
  }
  .vuc-icon.absolute{
    position: absolute;
    top: 50%;
    right: .6rem;
    width: 1rem;
    height: 1rem;
    transform: translateY(-50%);
  }
  .vuc-icon>span{
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2.5rem;
    height: 2.5rem;
    transform: translate(-50%,-50%) scale(.25,.25);
    transform-origin: center center;
  }
  .vuc-icon.arrow-left>span{
    transform: translate(-50%,-50%) scale(.25,.25) rotate(-45deg);
    animation: shaking-x 1s infinite alternate cubic-bezier(.5,0,.5,1);
  }
  .vuc-icon.arrow-right>span{
    transform: translate(-50%,-50%) scale(.25,.25) rotate(-45deg);
    animation: shaking-y 1s infinite alternate cubic-bezier(.5,0,.5,1);
  }
  .vuc-icon.arrow-top>span{
    transform: translate(-50%,-50%) scale(.25,.25) rotate(-45deg);
    animation: shaking-y 1s infinite alternate cubic-bezier(.5,0,.5,1);
  }
  .vuc-icon.arrow-bottom>span{
    transform: translate(-50%,-50%) scale(.25,.25) rotate(-45deg);
    animation: shaking-y 1s infinite alternate cubic-bezier(.5,0,.5,1);
  }
  .vuc-icon.no>span{
    animation: none;
  }
  .vuc-icon.arrow-left>span:before,
  .vuc-icon.arrow-right>span:before,
  .vuc-icon.arrow-top>span:before,
  .vuc-icon.arrow-bottom>span:before{
    content: '"';
    display: block;
    position: absolute;
    width: 1rem;
    height: 1rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #418dcb;
  }
  @keyframes shaking-y {
    from {
      transform: translate(-50%,-40%) scale(.25,.25) rotate(-45deg);
    }
    to {
      transform: translate(-50%,-60%) scale(.25,.25) rotate(-45deg);
    }
  }
  @keyframes shaking-x {
    from {
      transform: translate(-40%,-50%) scale(.25,.25) rotate(-45deg);
    }
    to {
      transform: translate(-60%,-50%) scale(.25,.25) rotate(-45deg);
    }
  }
</style>
