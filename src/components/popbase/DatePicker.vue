<template>
  <div class="vuc-datepicker" @click.stop="" :class="{full:config.full}">
    <div>
      <li v-for="key in dayArr">{{key}}</li>
    </div>
    <Scroll  :config="tabConfig" :height="config.full ? '100%' : '18rem'">
      <ul v-for="(item,index) in renderList">
        <div class="vuc-datapicker-title">
          <span @click="prevMon" v-if="!config.full" :class="['zhoujun_index_datepicker_0_' + index, {dis: whichMon === 'first'}]"> < </span>
          <b>{{item.yea}} 年 {{item.mon}} 月</b>
          <span  @click="nextMon" v-if="!config.full" :class="['zhoujun_index_datepicker_1_' + index, {dis: whichMon === 'last'}]"> > </span>
        </div>
        <li
          v-for="key in item.list"
          @click="onSelect(key)"
          :class="getClass(key)"
        ><span>{{getClass(key).today?'今':key.dat}}</span></li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "../Scroll.vue";
import Btns from "../Btns.vue";
import tools from "../../tools.js";
const {Timer} = tools;

const timer=new Timer();
export default {
  name: 'vuc-datepicker',
  mounted(){ this.inits(); },
  data(){return {
    type: "",
    renderList: [],
    dayArr: "日一二三四五六",
    tabConfig:{
      noMore: false,
      derction: "xy",
      itemNum:{x:1},
      index:{x:0,y:0},
      takeOneStepAtATime:true,
      reSetPosiWhenDerctionChanged:true,
    },
    selectedTime: 0
  }},
  watch:{
    full(){this.inits();},
    start(){this.inits();},
    end(){this.inits();},
    renderConf(){this.inits();},
    num(){this.inits();},
    show(){this.show&&this.inits();}
  },
  props: ["config"],
  computed:{
    show(){return this.config.show},
    full(){return this.config.full?"y":"x";},
    start(){return this.config.start;},
    end(){return this.config.end;},
    renderConf(){return this.config.renderConf;},
    num(){return this.config.num;},
    whichMon(){
      if(this.tabConfig.index.x === 0) return "first";
      if(this.tabConfig.index.x === this.tabConfig.itemNum.x - 1) return "last";
    },
  },
  methods: {
    nextMon(){
      const index = this.tabConfig.index.x + 1;
      index < this.tabConfig.itemNum.x && this.tabConfig.setIndex({x: index, y: 0});
    },
    prevMon(){
      const index = this.tabConfig.index.x - 1;
      index >= 0 && this.tabConfig.setIndex({x: index, y:0});
    },
    inits(){
      const conf=this.config;
      const rConf=conf.renderConf||[];
      conf.num=this.config.num || 1;
      const today = new Date();
      rConf[0] || (rConf[0] = today.getFullYear());
      rConf[1] || (rConf[1] = today.getMonth());
      rConf[2] || (rConf[2] = 6);
      this.renderList = timer.getDateArr(
        rConf[0],
        rConf[1],
        rConf[2]
      );
      conf.full||(this.tabConfig.itemNum.x=rConf[2]);
      this.tabConfig.takeOneStepAtATime=!this.config.full;
      this.tabConfig.derction=this.full;
      conf.yesterday = () => {this.yesterday();};
      conf.tomorrow = () => {this.tomorrow();};
    },
    hide(){ this.config.hide(); },
    onConfirm(){
      this.config.onSelect && this.config.onSelect(this.config.time);
      setTimeout(()=>{
        this.hide();
      },350)
    },
    onCancle () {},
    yesterday () {
      const time=this.config.time[0];
      if(time){
        const yesterday=time.yesterday();
        if(yesterday.isBetween(this.config.start,this.config.end))
          this.config.time.splice(0,1,yesterday);
        else this.config.scope.wrapConfig.showAlert({title:"超出日期可选范围"});
      }
    },
    tomorrow(){
      const time=this.config.time[0];
      if(time){
        const tomorrow=time.tomorrow();
        if(tomorrow.isBetween(this.config.start,this.config.end))
          this.config.time.splice(0,1,tomorrow);
        else this.config.scope.wrapConfig.showAlert({title:"超出日期可选范围"});
      }
    },
    onSelect(key) {
      if (this.getClass(key).abled) {
        const config = this.config;
        const time = config.time.map(item=>item);
        config.time.length=0;
        if (!time[0]) {
          time[0]=key;
        } else if (!time[config.num - 1]) {
          time[config.num - 1] = key;
          time.sort((x,y) => x.time > y.time)
        } else {
          if (config.num === 1) time[0] = key;
          else time.length = 0;
        }
        time.forEach(item=>config.time.push(item))
        this.renderList=this.renderList.map(item=>item);
        if(this.config.num===1){ this.onConfirm(); }
      }
    },
    getClass(key){
      const config = this.config;
      const time = config.time.map(item => item.timeStamp);
      if (time.length === 1) time.push(time[0]);
      return {
        abled: key.isBetween && key.isBetween(this.start,this.end),
        today: key.isToday && key.isToday(),
        selected: time.length && key.isBetween && key.isBetween(time[0],time[config.num - 1])
      }
    }
  },
  components:{Scroll,Btns}
}
</script>
<style scoped>
  .vuc-datepicker{
    height: 100%;
    white-space: nowrap;
    font-size: 0;
    background-color: #fff;
  }
  .vuc-datepicker.full{
    white-space: normal;
    flex: 1;
  }
  .vuc-datepicker.full .vuc-datapicker-title{
    text-align: left;
    padding-left: .5rem;
  }
  .vuc-datapicker-title{
    text-align: center;
    line-height: 2.5rem;
    font-size: .75rem;
    display: flex;
    color: #a3a4a5;
    background-color: #f7f8f9;
  }
  .vuc-datapicker-title>span{
    flex: 1;
    color: #999;
    font-size: .8rem;
  }
  .vuc-datapicker-title>b{
    font-weight: normal;
    flex: 1;
  }
  .vuc-datapicker-title>span.dis{
    opacity: .3;
  }
  .vuc-datepicker.full ul{
    display: block;
  }
  .vuc-datepicker.full ul:last-child{
    padding-bottom: 2.5rem;
  }
  div>li{
    background-color: #f7f8f9;
    line-height: 2.5rem;
    color: #333;
  }
  ul{
    display: inline-block;
    width: 100%;
    background-color: #fff;
    font-size: 0;
    padding-bottom: .375rem;
    white-space: normal;
    vertical-align: top;
  }
  ul:first-child{
    border-top: 0;
  }
  li{
    display: inline-block;
    width: 14.28%;
    font-size: .75rem;
    text-align: center;
    padding: .2rem 0;
    color: #ccc;
  }
  li.abled{
    color: #333;
  }
  li.today span{
    background-color: rgba(242,169,70,.7);
    color: #fff;
  }
  li span{
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    border-radius: 1rem;
    display: inline-block;
    background-color: #fff;
    transition: all .3s;
  }
  li.selected{}
  li.selected span{
    display: inline-block;
    background-color: #f2a946;
    color: #fff;
  }
</style>
