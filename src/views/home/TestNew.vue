<template>
  <Wrap :config="wrapConfig">
    <div slot="leftSlide">5456</div>
    <Head slot="header">
      <HeadTitle>testnew</HeadTitle>
      <HeadLeft><span @click="goBack()" class="iconfont icon-guanyanren"></span></HeadLeft>
    </Head>
      <Scroll :config="scrollConfig">
        <div class="testnew">
          <PicScroll :config="picConfig"/>
        </div>
      </Scroll>
    <Foot slot="footer"></Foot>
  </Wrap>
</template>
<script>
import {Wrap} from 'vuc-ui';
import wrap from '@vuc/wrap';
export default {
  components: {Wrap, ...Wrap.relativeComp},
  name: 'home',
  methods: {
    goBack () {this.cRouter.goBack();},
  },
  mounted () {
    // this.wrapConfig.slidePop.show = true;
  },
  data () {
    return {
      wrapConfig: {
        slidePop: {type: "left", show: false}
      },
      scrollConfig: {derction: "y",},
      picConfig: {src: "http://47.104.252.208:3000/static/1.jpg"},
    }
  },
}
</script>

<style scoped>
  .testnew{
    height: 20rem;
    position: relative;
  }
  .testnew>div{
    height: 100%;
  }
</style>
