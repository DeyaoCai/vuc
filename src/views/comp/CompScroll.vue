<template>
  <Wrap :config="wrapConfig">
    <div slot="header">
      <HeadTitle>Scroll</HeadTitle>
      <HeadLeft><span @click="goBack()" class="iconfont icon-fanhui"></span></HeadLeft>
    </div>
    <Scroll :config="tabWrapConfig">
      <div class="scroll-demo">
        <Scroll :config="tabInnerConfig">
          <p style="padding: .75rem;text-align: center;line-height: 1.5rem;">
            Scroll 是滚动的容器<br/>
            借助它 可以实现 banner 上下拉加载，tab功能<br/>
            与定时器配合还可以实现自动轮播图<br/>
            <br/>
            ~ derction "":"x"|"y"|"xy" 设置滚动方向<br/>
            ~ itemNum {x:number,y:number}<br/>
            各方向的标签个数<br/>
            ~ index {x:number,y:number}<br/>
            默认显示标签的序号<br/>
            比如默认选中第几个tab或者banner<br/>
            ~takeOneStepAtATime：boolean<br/>
            一次最多index + - 1<br/>
            onLeftEnd fn<br/>
            滑动超出左侧一定范围时调用<br/>
          onRightEnd fn <br/>
          滑动超出右侧一定范围时调用<br/>

          loadMore fn<br/>
          滑动超出底部一定范围时调用<br/>
          reflash fn<br/>
          滑动超出顶部一定范围时调用<br/>

            ~tabs array tab 参数<br/>
            keyPath string tab 显示的键名<br/>
          </p>
        </Scroll>
        <Scroll :config="tabInnerConfig">
          <div class="margin">
            <Scroll :config="bannerConfigx" :height="'7.5rem'">
              <ul class="home-banner"><li v-for="item in banner"><img :src="item.src"/></li></ul>
            </Scroll>
          </div>
          <Btns><span>横向banner</span></Btns>
          <Scroll :config="bannerConfigx" :height="'7.5rem'">
            <ul class="home-banner"><li v-for="item in banner"><img :src="item.src"/></li></ul>
          </Scroll>
          <Btns><span>横向banner</span></Btns>
          <Scroll :config="isGetInnerSizeByChild"  :height="'7.5rem'">
            <ul class="home-banner-h"><li v-for="item in banner"><img :src="item.src"/></li></ul>
          </Scroll>
          <Btns><span>横向banner</span></Btns>
          <div class="home-banner-v-w">
            <Scroll :config="bannerConfigy" :height="'7.5rem'">
              <ul class="home-banner-v"><li v-for="item in banner"><img :src="item.src"/></li></ul>
            </Scroll>
          </div>
          <Btns><span>纵向banner</span></Btns>
        </Scroll>

        <Scroll :config="listDemoConfig">
          <div class="demo" v-for="(item, index) in list">{{index}}</div>
        </Scroll>
      </div>
    </Scroll>
    <Tab slot="footer" :config="tabWrapConfig"></Tab>
  </Wrap>
</template>
<script>
import wrap from '@vuc/wrap';
import {Wrap} from 'vuc-ui';
const {WrapConfig, inputConf} = wrap;
export default {
  name: 'home',
  components: {Wrap, ...Wrap.relativeComp},
  methods:{
    goBack(){this.$router.go(-1);},
    showTimePicker() {this.wrapConfig.showTimePicker();},
    showSlide(type) {this.wrapConfig.showSlide({type});},
    showDataPicker(){this.wrapConfig.showDatePicker();},
    showRadio(){this.wrapConfig.showRadio();},
    showCheck(){this.wrapConfig.showCheck();},
    showAlert(){this.wrapConfig.showAlert();},
    showConfirm(){ this.wrapConfig.showConfirm();},
    showLoading(){ this.wrapConfig.showLoading();},
    showFilter(){this.wrapConfig.showFilter();},
  },
  data(){

    const list = new Array(20);
    return {
      list,
      wrapConfig:new WrapConfig(),
      banner:[{src: "http://47.104.252.208:3000/static/1.jpg"}, {src: "http://47.104.252.208:3000/static/2.jpg"}, {src: "http://47.104.252.208:3000/static/3.jpg"}],
      tabWrapConfig:{
        derction:"x",
        itemNum:{x:3},
        index:{x:this.$route.query.index},
        tabs:[{name:"说明"},{name:"实例"},{name:"实例2"}],
        keyPath:"name",
        takeOneStepAtATime:true,
      },
      tabInnerConfig:{
        noMore:false,
        derction:"y",
        loadMore(item, hide){ setTimeout(()=>{ hide(); }, 300) },
        reflash(item, hide){ setTimeout(()=>{ hide(); }, 300) }
      },
      listDemoConfig:{
        noMore:false,
        derction:"y",
        loadMore: (item, hide) => { setTimeout(()=>{
          this.list = this.list.concat(new Array(10));
          hide();
         }, 300) },
        reflash: (item, hide) => { setTimeout(()=>{ hide(); }, 300) }
      },
      bannerConfigx: {
        derction: "x",
        itemNum: {x: 3},
        index: {x: 0},
        takeOneStepAtATime: true,
      },
      bannerConfigy: {
        derction: "y",
        itemNum: {y: 3},
        index: {y: 0},
        isGetInnerSizeByChild: true,
      },
      isGetInnerSizeByChild:{
        derction: "x",
        isGetInnerSizeByChild: true,
      },
    }
  },
  computed:{
    index() {return this.tabWrapConfig.index;}
  },
  watch: {
    index() {
      this.cRouter.replace({name: "compscroll", query: {index: this.index.x}})
    }
  },
}
</script>
<style scoped>
.scroll-demo{
  white-space: nowrap;
  font-size: 0;
  height: 100%;
}
.scroll-demo>.vuc-scroll{
  display: inline-block;
  vertical-align: top;
  width: 100%;
  height: 100%;
  border: 1px solid #fff;
  overflow: hidden;
}
.margin{
  margin: 1rem;

}
.margin>.vuc-scroll{
  overflow: visible;
}
.margin li{
  padding: .3rem;
}

li img{
  width: 100%;
  display: block;
}
.home-banner{
  font-size: 0;
  white-space: nowrap;
}
.home-banner li{
  width: 100%;
  height: 7.5rem;
  display: inline-block;
  overflow: hidden;
  font-size: 0;
}
.home-banner-v-w{
  height: 7.5rem;
}
.home-banner-v li{
  width: 100%;
  height: 7.5rem;
  overflow: hidden;
}
.home-banner-h{
  display: inline;

}
.home-banner-h li{
  display: inline-block;
  width: 16rem;
  height: 8rem;
}
.demo{
  padding: 2rem;
  border-bottom: 1px solid #eee;
  text-align: center;
}
.demo:nth-child(2n){
  background-color: #f8f8f8;
}
</style>
