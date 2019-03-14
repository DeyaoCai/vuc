<template>
  <div class="vuc-tab" :class="getCLass(type)">
    <i :style="left"></i>
    <span
      class="icon iconfont"
      :class="[{active:index===config.index.x},item.iconClass]"
      v-for="(item,index) in config.tabs"
      :key="index"
      @click="onTabClick(index)"
    >
      {{config.keyPath?item[config.keyPath]:item?item:""}}
    </span>
  </div>
</template>

<script>
import getClass from "../tools/compType.js";
export default {
  name: 'vue-tab',
  props:["config", "type"],
  methods:{
    onTabClick (index) {this.config.index = {x: index, y: this.config.index.y}},
    getCLass (type) {return getClass(type);}
  },
  computed: {
    left () {return {left: (this.config.index.x * 2 + 1) / 2 / this.config.tabs.length * 100 + "%"}}
  }
}
</script>
<style scoped>
  .vuc-tab{
    display: flex;
    position: relative;
    font-size: 0;
    border-top: 1px solid #eee;
  }
  .vuc-tab>i{
    display: block;
    position: absolute;
    bottom: 0;
    transform: translateX(-50%);
    height: .25rem;
    width: 2.5rem;
    background-color: #418dcc;
    transition: left .3s;
  }
  .vuc-tab>span{
    font-size: .75rem;
    display: inline-block;
    flex: 1;
    text-align: center;
    line-height: 2.5rem;
    border-bottom: 1px solid #eee;
    text-shadow: 0 0 2px #ccc;
  }
  .vuc-tab>span.active{
    color: #418dcb;
  }

  .vuc-tab.login{
    border-top: 0;
    border-bottom: 1px solid rgba(255,255,255,.1);
  }
  .vuc-tab.login>span{
    border-bottom: 0;
    color: rgba(255,255,255,.6);
    text-shadow: 0 0 0 transparent;
    line-height: 2rem;
  }
  .vuc-tab.login>span.active{
    color: rgba(255,255,255,.8);
  }
  .vuc-tab.login>i{
    background-color: rgba(255,255,255,.2);
  }
</style>
