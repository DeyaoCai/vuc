<template>
  <Wrap :config="wrapConfig">
    <div slot="leftSlide"><Btns><span>这里是左侧边栏</span></Btns></div>
    <div slot="rightSlide"><Btns><span>这里是右侧边栏</span></Btns></div>
    <Head>
      <HeadTitle>这里是头部</HeadTitle>
      <HeadLeft><span @click="goBack()" class="iconfont icon-fanhui"></span></HeadLeft>
      <HeadRight><span @click="showSlide('right')">右</span></HeadRight>
    </Head>
    <Content>
      <Scroll :config="scrollConfig">
        <div>
          <!--<Btns :type="['top','bottom']" v-for="(item,index) in reflashList"><span>下拉试试{{item}}？</span></Btns>-->
          <Btns :type="['top','bottom']"><span>这里是内容</span></Btns>
          <p style="padding: .75rem;text-align: center;line-height: 1.5rem;">
            wrap 是布局的容器<br/>
            提供了3个slot 分别是左右侧边栏和内容区域<br/>
            其中内容区域可以使用  Head Content Foot 组件<br/>
            Head Foot 组件为固定在头部和底部的位置<br/>
            Content 区域根据 Head Foot 的宽高自适应高度<br/>
            Head 组件提供的 slot<br/>
            中可以使用 HeadLeft HeadRight HeadTitle<br/>
            HeadLeft 固定在左上角<br/>
            HeadRight 固定在右上角<br/>
            HeadTitle 是放置标题的位置<br/>
          </p>
          <Btns :type="['padding','color']">
            <span @click="showSlide('left')">开左边栏</span>
            <span @click="showSlide('right')">开右边栏</span>
          </Btns>
          <Btns :type="['top']">
            <span>右划试试？</span>
            <span>右划试试？</span>
          </Btns>
          <!--<Btns :type="['top','bottom']" v-for="item in loadMoreList"><span>满屏后上拉试试{{item}}？</span></Btns>-->
        </div>
      </Scroll>
    </Content>
    <Foot><Btns><span>这里是底部</span></Btns></Foot>
  </Wrap>
</template>
<script>
import wrap from '@vuc/wrap';
import {Wrap} from 'vuc-ui';
const {WrapConfig, inputConf} = wrap;
export default {
  name: 'compwrap',
  components: {Wrap, ...Wrap.relativeComp},
  data(){
    return {
      reflashList:[""],
      loadMoreList:[""],
      wrapConfig: new WrapConfig(),
      scrollConfig:{
        derction:"xy",
        loadMore:(item,hide)=>{this.loadMoreList.push(this.loadMoreList.length); setTimeout(()=>{hide()},300)},
        reflash:(item,hide)=>{this.reflashList.unshift(this.reflashList.length); setTimeout(()=>{hide()},300)},
        onLeftEnd:()=>this.showSlide("left"),
        onRightEnd:()=>this.showSlide("right"),
      },

    }
  },
  methods:{
    goBack(){this.$router.go(-1);},
    showSlide(type) {this.wrapConfig.showSlide({type});},
  },
  computed:{},
  watch:{},
}
</script>

