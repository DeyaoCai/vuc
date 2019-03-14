<template>
  <temWrap :config="wrapConfig">
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
  </temWrap>
</template>
<script>
import wrap from '@vuc/wrap';
import http from '@vuc/http';
const {WrapConfig, inputConf} = wrap;
export default {
  components: wrap,
  name: 'home',
  methods: {
    goBack () {this.cRouter.goBack();},
  },
  mounted () {},
  data () {
    return {
      wrapConfig: new WrapConfig(),
      scrollConfig: {derction: "y",},
      picConfig: {src: "http://47.104.252.208:3000/static/1.jpg"},
    }
  },
}
</script>

<style scoped>
  .testnew{
    height: 10rem;
    position: relative;
  }
</style>
