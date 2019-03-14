<template>
  <div class="music-search iconfont icon-sousuo" :class="{active: isFocused}">
    <input
      ref="input"
      v-model="config && config.txt"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
    >
    <b :class="{active: config.txt}" @click="clearTxt">x</b>
  </div>
</template>
<script>
// UI 组件
import comps from '@vuc/comps';

export default {
  name: 'train',
  components: comps,
  data(){
    return {
      isFocused: false,
      searchTxt: "",
      lastInputTime: "",
    }
  },
  props: ["config"],
  computed: {
    delayTime () {return this.config && this.config.delayTime || 300},
    show(){return this.isFocused || this.config.txt},
  },
  watch: {
    show(){this.config.show = !!this.show;}
  },
  methods:{
    clearTxt(){
      this.config && (this.config.txt = "");
    },
    onFocus(){this.isFocused = true;},
    onBlur(){this.isFocused = false;},
    onInput(){
      this.lastInputTime = new Date().getTime();
      setTimeout(() => {
        if (new Date().getTime() - this.delayTime > this.lastInputTime - 30) {
          this.config.onInput && this.config.onInput();
        }
      },this.delayTime)
    },
  },
}
</script>
<style scoped>
  .music-search{
    padding: .4rem;
    position: relative;
    line-height: 100%;
  }
  .music-search:before{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 40%;
    transition: left .5s;
  }
  .music-search.active:before{
    left: .65rem;
  }
  .music-search>input{
    color: #fff;
    background-color: rgba(255,255,255,.3);
    border-radius: .55rem;
    padding: .4rem .65rem;
    padding-left: 50%;
    line-height: .8rem;
    transition: padding .5s;
  }
  .music-search.active>input{
    padding-left: 1.7rem;
  }
  .music-search>input::-webkit-input-placeholder{
    color: #fff;
    opacity: .5;
  }
  .music-search>b{
    position: absolute;
    right: 1.4rem;
    top: 50%;
    transform: translateY(-50%) scale(0,0);
    transition: transform .5s;
  }
  .music-search>b.active{
    transform: translateY(-50%) scale(1,1);
  }
</style>
