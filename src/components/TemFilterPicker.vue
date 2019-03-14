<style scoped>
  .tem-filter{
    background-color: #fff;
    display: flex;
    height: 100%;
  }
  .tem-filter-left{
    flex: 1;
    background-color: #eee;
    display: flex;
  }
  .tem-filter-right{
    flex: 3;
    display: flex;
  }
  .tem-filter-left>ul,
  .tem-filter-right>ul{
    height: 100%;
  }
  .tem-filter-left,
  .tem-filter-right{
    display: flex;
    height: 100%;
    width: 100%;
    position: relative;
    box-orient: vertical;
    flex-direction: column;
  }
  .tem-filter-left li,
  .tem-filter-right li{
    line-height: 2rem;
    padding: 0 .75rem;
    border-bottom: 1px solid #eee;
    position: relative;
  }
  .tem-filter-right li.active{
    color: blue;
  }
  .tem-filter-left li.active{
    background-color: #fff;
  }
  .tem-filter-left li.selected:after{
    content: "";
    display: block;
    position: absolute;
    width: .3rem;
    height: .3rem;
    border-radius: .15rem;
    background-color: orange;
    top: 50%;
    right: .5rem;
    transform: translateY(-50%);
  }
</style>
<template>
  <div>
    <Scroll :config="scrollConfig"></Scroll>
    <div class="tem-filter" @click.stop="">
      <ul class="tem-filter-left">
        <li
          v-for="(items,index) in list"
          :class="{active:selectedIndex===index,selected:!noActive(items.list)}"
          @click="setIndex(index)"
        >{{items.title}}</li>
      </ul>
      <ul class="tem-filter-right">
        <li
          v-if="subList&&subList.withAll"
          :class="{active:noActive(subList.list)}"
          @click="chooseNone(subList.list)"
        >{{subList.allName||"不限"}}</li>
        <li
          v-for="items in subList.list"
          :class="{active:items.isActive}"
          @click="chooseThis(items,subList)"
        >{{items.name}}</li>
      </ul>
    </div>
    <div class="tem-filter">
      <div class="tem-filter-left"><Btns :type="[]"><span @click.stop="reset">重置</span></Btns></div>
      <div class="tem-filter-right"><Btns :type="['color']"><span @click="onConfirm">确认</span></Btns></div>
    </div>
  </div>
</template>

<script>
import Scroll from "./Scroll.vue"
import Header from "./Head.vue"
import HeadTitle from "./HeadTitle.vue"
import HeadLeft from "./HeadLeft.vue"

import Content from "./Content.vue"
import Btns from "./Btns.vue"
import Footer from "./Foot.vue"
export default {
  name: 'vuc-filter',
  props:["config"],
  data(){return {
    scrollConfig:{noMore: true, derction: "y"},
    selectedIndex:1,
  }},
  computed:{
    list(){return this.config.data},
    subList(){
      const index=this.selectedIndex;
      if(this.list&&this.list[index]) {return this.list[index];}
    }
  },
  methods:{
    setIndex(index){this.selectedIndex=index;},
    chooseThis(item,list){
      console.log(item,list)
      if(list.type === "radio"){
        list.list.forEach(item => item.isActive = false);
        item.isActive = true;
      }else if(list.type === "check"){
        item.isActive =! item.isActive;
      }
    },
    chooseNone(list){list.forEach(item => item.isActive=false);},
    noActive(list){return list.every(item => !item.isActive);},
    reset(){
      this.list.forEach(item=>this.chooseNone(item.list));
    },
    onConfirm(){this.config.onConfirm&&this.config.onConfirm(this.list)},
  },
  mounted(){},
  components:{Scroll,Header,HeadTitle,HeadLeft,Footer,Btns,Content}
}
</script>
