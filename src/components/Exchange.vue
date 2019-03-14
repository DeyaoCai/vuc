<template>
  <div class="vuc-exchange" :class="{active:config.hasExchanged}">
    <input
      @click="onExchangeItemClick(item)"
      v-for="(item,index) in config.list"
      class="vuc-exchange-item"
      v-model="item.name"
      :placeholder="placeholder[(index+indexNum)%2]"
      :readonly="true"
    />
    <i @click="onExchange(config)" class="iconfont icon-chuanshujilu-"></i>
  </div>
</template>
<script>
/**
  重构方向
  为实现 城市选择器选完后，出发目的地的切换实现的功能，
  后期准备解耦出来， 以name，id | code 的形式组织，而非与station 组织
 * */
export default {
  name: 'vuc-exchange',
  data(){return {
    placeholder:["出发地","目的地"]
  }},
  props:["config"],
  methods:{
    onExchange(data){
      const conf=this.config;
      if(conf.disableGo||conf.disableTo) return;
      conf.hasExchanged=!conf.hasExchanged;
      conf.onExchange&&conf.onExchange(conf);
    },
    onExchangeItemClick(item,data){
      const conf=this.config;
      if(conf.disableGo&&item===conf.list[0])return;
      if(conf.disableTo&&item===conf.list[1])return;
      conf.onExchangeItemClick&&conf.onExchangeItemClick(item,conf);
    }
  },
  computed:{
    indexNum(){return this.config.hasExchanged?1:0}
  },
  beforeCreate(){}
}
</script>
<style scoped>
  .vuc-exchange{
    position: relative;
    height: 2.5rem;
    line-height: 2.5rem;
  }
  .vuc-exchange>i{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .vuc-exchange-item{
    position: absolute;
    top: 50%;
    transform: translate(-50%,-50%);
    display: inline-block;
    font-size: .75rem;
    text-align: center;
    height: 100%;
    width: 50%;
    transition: left .3s;
  }
  .vuc-exchange-item:nth-child(1){
    left: 25%;
  }
  .vuc-exchange-item:nth-child(2){
    left: 75%;
  }
  .active>.vuc-exchange-item:nth-child(1){
    left: 75%;
  }
  .active>.vuc-exchange-item:nth-child(2){
    left: 25%;
  }

  .icon-chuanshujilu-:before{
    display: block;
    color: #418dcb;
    font-weight: bold;
    transform: rotate(90deg);
  }
</style>
