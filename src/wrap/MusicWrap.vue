<template>
  <!--<div class="vuc-wrap"@touchmove.prevent="" :class="[slidePop&&slidePop.show?slidePop.type:'',isGoingBack?'w-left':'w-right',{'w-active':active}]">-->
    <!--<div class="vuc-wrap-inner">-->
      <!--<Head><slot name="header"></slot></Head>-->
      <!--<Content>-->
        <!--<Content><slot></slot></Content>-->
        <!--<Footer><slot name="footer"></slot></Footer>-->
        <!--<RadioPop v-if="radioPop" :config="radioPop"/>-->
        <!--<CheckPop v-if="checkPop" :config="checkPop"/>-->
        <!--<GameArenaPop v-if="gameArenaPop" :config="gameArenaPop"/>-->
      <!--</Content>-->
      <!--<Foot><slot name="out-footer"/></Foot>-->
    <!--</div>-->
    <!--&lt;!&ndash; 左右侧边栏显示时的遮罩 &ndash;&gt;-->
    <!--<PopUp v-if="slidePop" @hidePop="slidePop.type=''" :config="slidePop"/>-->
    <!--<div class="vuc-wrap-leftslide"><slot name="leftSlide"/></div>-->
    <!--<div class="vuc-wrap-rightslide"><slot name="rightSlide"/></div>-->

    <!--<slot name="out-pop"/>-->
    <!--<ComfirmPop  :config="alertPop"/>-->
    <!--<ComfirmPop  :config="confirmPop"/>-->
    <!--<LoadingPop :config="loadingPop"/>-->
  <!--</div>-->
  <Wrap :config="config">
    <slot/>
    <slot name="header" slot="header"/>
    <slot name="footer" slot="footer"/>
    <slot name="out-footer" slot="out-footer"/>
    <slot name="leftSlide" slot="leftSlide"/>
    <slot name="rightSlide" slot="rightSlide"/>
    <div slot="out-pop">
      <slot name="out-pop"/>
      <!--<ComfirmPop  :config="alertPop"/>-->
      <!--<ComfirmPop  :config="confirmPop"/>-->
      <!--<LoadingPop :config="loadingPop"/>-->
    </div>
  </Wrap>
</template>
<script>
/*
 wrap 应该是一个容器组件， 他定义了一系列的弹窗组件， 以及分割屏幕的各部分的容器， 然后返回一些开启弹窗的方法；
*/
import units from "@vuc/units.js";
import {Wrap} from "vuc-ui";
export default {
  components: {Wrap, ...Wrap.relativeComp},
  name: 'vuc-wrap',
  props:["config"],
  data(){
    return {
      isGoingBack:this.cRouter.isGoingBack,
      active:false
    }
  },
  mounted(){},
  computed:{
    timePickerPop(){ return this.config.timePickerPop },
    slidePop(){ return this.config.slidePop },
    radioPop(){ return this.config.radioPop },
    checkPop(){ return this.config.checkPop },
    alertPop(){ return this.config.alertPop },
    confirmPop(){ return this.config.confirmPop },
    loadingPop(){ return this.config.loadingPop },
    datePickerPop(){ return this.config.datePickerPop },
    filterPop(){ return this.config.filterPop },
    temFilterPickerPop(){ return this.config.temFilterPickerPop },
    gameArenaPop(){ return this.config.gameArenaPop },
  },
}
</script>
<style type="text/css" scoped>

/*wrap开始*/
.vuc-wrap{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.vuc-wrap-inner{
  position: relative;
  height: 100%;
  display: flex;
  box-orient:vertical;
  flex-direction:column;
}
/*wrap结束*/
/*wrap开始*/
.vuc-wrap{
  position: relative;
  left: 0;
  opacity: 1;
  transition: transform .6s;
}
.vuc-wrap.w-left{
  /*left: -100%;*/
}
.vuc-wrap.w-right{
  /*left: 100%;*/
}
.vuc-wrap.w-active{
  left: 0;
  opacity: 1;
}
@keyframes fadein{
  from{left: 100%;opacity: 0;}
  to{left: 0;opacity: 1;}
}
.vuc-wrap-inner{
  transition: transform .6s;
  transform: translate3d(0,0,0) scale(1);
}
.vuc-wrap.left>.vuc-wrap-inner{
  transform: translate3d(40%,0,0) scale(.9);
}
.vuc-wrap.right>.vuc-wrap-inner{
  transform: translate3d(-40%,0,0) scale(.9);
}

.vuc-wrap>.vuc-wrap-leftslide,
.vuc-wrap>.vuc-wrap-rightslide{
  position: absolute;
  top: 0;
  width: 60%;
  height: 100%;
  background-color: #fff;
  transition: transform .6s;
  z-index: 1;
}
.vuc-wrap-leftslide{
  left: -60%;
  transform: translate3d(0,0,0);
}
.vuc-wrap.left>.vuc-wrap-leftslide{
  transform: translate3d(100%,0,0);
}

.vuc-wrap-rightslide{
  right: -60%;
  transform: translate3d(0,0,0);
}
.vuc-wrap.right>.vuc-wrap-rightslide{
  transform: translate3d(-100%,0,0) scale(1);
}
/*wrap结束*/
</style>
