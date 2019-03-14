<template>
  <div class="vuc-filter">
    <Header><HeadTitle>筛选</HeadTitle></Header>
    <HeadLeft><span @click="console.log(546)"> &lt; </span></HeadLeft>
    <Scroll :config="scrollConfig">
        <div v-for="(items, index) in list" :key="index" class="vuc-filter-group" @click.stop="">
          <div class="vuc-filter-title">{{items.title}}</div>
          <ul>
            <li v-if="items.withAll" :class="{active:noActive(items.list)}"><span @click="chooseNone(items.list)">{{items.allName||"全部"}}</span></li>
            <li v-for="(item, index) in items.list" :class="{active: item.isActive}" :key="index"><span @click="chooseThis(item,items)">{{item.name}}</span></li>
          </ul>
        </div>
    </Scroll>
    <Footer>
      <Btns :type="[]">
        <span @click="reset" @click.stop="">重置</span>
        <span @click="onCancle">取消</span>
        <span @click="onConfirm">确认</span>
      </Btns>
    </Footer>
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
  props: ["config"],
  components: {Scroll, Header, HeadTitle, HeadLeft, Footer, Btns, Content},
  data() {return {scrollConfig: {noMore: true, derction: "y"}}},
  computed: {
    list() {return this.config.data},
    show() {return this.config.show}
  },
  watch: {
    list() {this.copy();},
    show() {this.copy();},
  },
  mounted() {
    this.copy();
  },
  methods: {
    copy() {
      this.list.forEach(items =>
        items.list.forEach(item => (item.oriActiveState = item.isActive))
      );
    },
    chooseThis(item, list) {
      if (list.type === "radio") {
        list.list.forEach(item => (item.isActive = false));
        item.isActive = true;
      } else if (list.type === "check") {
        item.isActive = !item.isActive;
      }
    },
    chooseNone(list) {list.forEach(item => (item.isActive = false));},
    noActive(list) {return list.every(item => !item.isActive);},
    onCancle() {
      this.list.forEach(items =>
        items.list.forEach(item => {
          item.isActive = item.oriActiveState;
          delete item.oriActiveState;
        })
      )
    },
    reset() {
      this.list.forEach(item => this.chooseNone(item.list));
    },
    onConfirm() {this.config.onSelect && this.config.onSelect(this.list)},
  },
}
</script>
<style scoped>
  .vuc-filter-group{
    border-top: .25rem solid #eee;

  }
  .vuc-filter-title{
    padding:  0 .75rem;
    line-height: 2rem;
    border-bottom: 1px solid #eee;
  }
  .vuc-filter-group>ul{
    padding: .375rem;
    font-size: 0;
    white-space: normal;
    word-break: break-all;
    display: block;
  }
  .vuc-filter-group>ul>li{
    display: inline-block;
    width: 33.3%;
    text-align: center;
    padding: .375rem;
  }
  .vuc-filter-group>ul>li>span{
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.5rem;
    border: 1px solid #999;
    border-radius: .25rem;
    padding: 0 .75rem;
  }
  .vuc-filter-group>ul>li.active>span{
    display: block;

    line-height: 1.5rem;
    border: 1px solid #418dcb;
    color: #418dcb;
    border-radius: .25rem;
  }
  .vuc-filter{
    position: relative;
    display: flex;
    height: 100%;
    box-orient: vertical;
    flex-direction: column;
    background-color: #fff;
  }
</style>
