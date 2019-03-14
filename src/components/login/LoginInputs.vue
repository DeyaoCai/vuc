<template>
  <div class="vuc-inputs">
    <span class="iconfont" :class="'icon-'+config.icon">{{config.name}}</span>
    <input
      :placeholder="config.placeholder||config.label"
      v-model="config.val"
      :readonly="readonly"
      :type="config.type"
      @click="readonly&&config.onClick(config)"
      @focus="onFocus($event)"
    >
  </div>
</template>

<script>
import getClass from "../../tools/compType.js";
import type from "../../tools/type.js"
export default {
  name: 'vuc-inputs',
  props:["config","type"],
  methods:{},
  data(){
    return {}
  },
  mounted(){
    const conf=this.config;
  },
  methods:{
    getClass(type){return getClass(type);},
    toggleVal(){this.config.isActive = !this.config.isActive;},
    onFocus(ev){this.readonly && ev.target.blur();},
  },
  computed:{
    readonly(){return this.config.onClick},
    regSucc(){
      const conf = this.config;
      return conf.isMustFill && conf.val && (conf.regFn ? conf.regFn(conf.val) : true);
    }
  },
}
</script>
<style scoped>
  .vuc-inputs{
    background-color: transparent;
    display: flex;
    border-bottom: 1px solid rgba(255,255,255,.1);
    height: 2.5rem;
    padding: 0 .75rem;
    position: relative;
    width: 60%;
    margin: 0 auto;
    color: #fff;
  }
  input::-webkit-input-placeholder{
    color: rgba(255,255,255,.5);
  }
  .vuc-inputs>span,
  .vuc-inputs>input{
    vertical-align: middle;
    background-color: transparent;
    color: #fff;
    text-shadow: 1px 2px 3px #465454;
  }
  .vuc-inputs>span{
    flex: 1;
    text-align: center;
    position: relative;
    height: 100%;
    line-height: 2.5rem;
    padding-right: .75rem;
    font-size: 0;
    color: rgba(255,255,255,.5);
  }
  .vuc-inputs>span:before{
    font-size: .75rem;
  }
  .vuc-inputs>input{
    flex: 5;
    height: 100%;
    width: 100%;
    line-height: 2.5rem;
    text-align: left;
    transition: all .3s;
  }
  .vuc-inputs>input:focus{
    flex: 3;
  }
</style>
