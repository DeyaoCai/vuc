<template>
  <div class="vuc-inputs" :class="classes">
    <span>{{config.name}}：</span>
    <input
      :placeholder="config.placeholder||config.label"
      v-model="config.val"
      :readonly="readonly"
      :type="config.type"
      @click="readonly&&config.onClick(config)"
      @focus="onFocus($event)"
      v-if="funcType==='text'"
    >
    <div
      class="vuc-switch"
      :class="{active: config.isActive}"
      @click="toggleVal"
      v-if="funcType==='switch'"
    ></div>
  </div>
</template>

<script>
import getClass from "../tools/compType.js";
import type from "../tools/type.js"
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
  methods: {
    getClass (type) { return getClass(type); },
    toggleVal () { this.config.isActive = !this.config.isActive; },
    onFocus (ev) { this.readonly && ev.target.blur(); },
  },
  computed: {
    readonly(){return this.config.onClick},
    funcType(){
      const conf = this.config
      if (!type.isUndefined(conf.isActive)) return "switch";
      return "text"
    },
    classes () {
      return getClass([{
        mustfill: this.config.isMustFill,
        regfail: this.shouldReg && !this.regSucc,
        withArrow: this.type === "text" && this.readonly,
      },this.type])
    },
    regSucc(){
      const conf = this.config;
      return conf.isMustFill && conf.val && (conf.regFn ? conf.regFn(conf.val) : true);
    }
  },
}
</script>
<style scoped>

  .vuc-inputs{
    background-color: #fff;
    display: flex;
    border-bottom: 1px solid #eee;
    height: 2.5rem;
    padding: 0 .75rem;
    position: relative;
  }
  .vuc-inputs.withArrow{
    padding-right: 1.75rem;
  }
  .vuc-inputs.withArrow:after{
    content: ">";
    position: absolute;
    top: 50%;
    right: .625rem;
    transform: translate(-50%,-50%);
  }
  .vuc-inputs>span,
  .vuc-inputs>input{
    vertical-align: middle;
  }
  .vuc-inputs>span{
    position: relative;
    height: 100%;
    line-height: 2.5rem;
    padding-right: .5rem;
    min-width: 20%;
  }
  .vuc-inputs.mustfill>span:after{
    content: "*";
    color:red;
  }
  .vuc-inputs.regfail{
    border-bottom: 1px solid red;
  }
  .vuc-inputs>input{
    flex: 1;
    height: 100%;
    width: 100%;
    line-height: 2.5rem;
    text-align: right;
  }
  .vuc-switch{
    position: absolute;
    width: 2rem;
    height: 1rem;
    background-color: #ccc;
    right: .75rem;
    top: 50%;
    transform: translateY(-50%);
    border-radius: .5rem;
    transition: all .3s;
  }
  .vuc-switch.active{
    background-color: #418dcb;
  }
  .vuc-switch:after{
    content: "";
    display: block;
    border-radius: .75rem;
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #fff;
    border: 1px solid #ccc;
    left: 25%;
    top: 50%;
    transform: translate(-50%,-50%);
    transition: all .3s;
  }
  .vuc-switch.active:after{
    left: 75%;
    background-color: #fff;
    border: 1px solid #418dcb;
  }

  .vuc-inputs.login{
    width: 60%;
    margin: 0 auto;
  }
  .vuc-inputs.login>span,
  .vuc-inputs.login>input{

  }
  .vuc-inputs.login>input:first-child,
  .vuc-inputs.login>span:first-child{
    width: 40%;
    text-align: right;
  }
  .vuc-inputs.login>input:last-child,
  .vuc-inputs.login>span:last-child{
    width: 60%;
    text-align: left;
  }
  .vuc-inputs.login>span:after{
    content: ""!important;
  }
</style>
