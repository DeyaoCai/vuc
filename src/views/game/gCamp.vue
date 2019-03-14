<style scoped>
  .inner{padding: 6rem 2rem;}
</style>
<template>
  <TemWrap :config="wrapConfig">
    <GameSetting slot="leftSlide"></GameSetting>
    <AuthorInfo slot="rightSlide"></AuthorInfo>
    <div slot="header">
      <HeadTitle>战前准备</HeadTitle>
      <HeadLeft><span @click="goBack" class="iconfont icon-fanhui"></span></HeadLeft>
    </div>
    <Content>
      <Scroll :config="scrollConfig">
        <div class="inner">
          <Btns :type="['padding color']">
            <span @click="cRouter.push({name:'gstore'})">仓库</span>
            <span @click="cRouter.push({name:'gshop'})">商店</span>
          </Btns>
          <Btns :type="['padding color']">
            <span @click="cRouter.push({name:'gfiled'})">推进关卡</span>
          </Btns>
          <Btns :type="['padding color']">
            <span @click="cRouter.push({name:'garena'})">竞技场</span>
          </Btns>
          <Btns :type="['padding color']">
            <span @click="showSlide('left')">转职</span>
            <span @click="showSlide('right')">复活</span>
          </Btns>
      </div>
      </Scroll>

    </Content>
    <Foot><btns>

    </btns></Foot>
  </TemWrap>
</template>
<script>
import wrap from '@vuc/wrap';
import http from '@vuc/http';
const {WrapConfig, inputConf} = wrap;
export default {
  components: wrap,
  name: 'home',
  mounted(){},
  methods:{
    goBack(){this.cRouter.goBack();},
    showSlide(type) {this.wrapConfig.showSlide({type});},
  },
  data(){
    return {
      wrapConfig:new WrapConfig(),
      scrollConfig:{
        derction:"xy",
      onLeftEnd:()=>this.showSlide("left"),
      onRightEnd:()=>this.showSlide("right"),
      bgRate:1.2
      },
    }
  },
  computed:{
  },
  watch:{

  },
}
</script>
