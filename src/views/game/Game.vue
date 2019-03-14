<template>
  <TemWrap :config="wrapConfig">
    <GameSetting slot="leftSlide"></GameSetting>
    <AuthorInfo slot="rightSlide"></AuthorInfo>
    <div slot="header">
      <HeadTitle>类火纹</HeadTitle>
      <HeadLeft><span @click="goBack" class="iconfont icon-fanhui"></span></HeadLeft>
    </div>
    <Content>
      <Scroll :config="scrollConfig">
        <div class="inner">
          <Btns :type="['padding color']">
            <span @click="cRouter.push({name:'gcamp'})">开始游戏</span>
          </Btns>
          <!--<Btns :type="['padding color']"><span>继续游戏</span></Btns>-->
          <Btns :type="['padding color']"><span @click="goMapList">地图列表</span></Btns>
          <Btns :type="['padding color']"><span @click="cRouter.push({name:'gherolist'})">英雄列表</span></Btns>
          <Btns :type="['padding color']">
            <span @click="showSlide('left')">设置</span>
            <span @click="showSlide('right')">关于开发</span>
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
    goMapList(){this.cRouter.push({name:"gmaplist"});},
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
<style scoped>
  .inner{
    padding: 6rem 2rem;
  }
  .inner>.vuc-btn{

  }
</style>
