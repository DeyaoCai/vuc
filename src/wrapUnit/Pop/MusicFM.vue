<template>
  <PopUp :config="config">
    <Wrap :config="wrapConfig">
      <Head slot="header">
        <HeadTitle>FM</HeadTitle>
        <HeadLeft><span @click="hidePop" class="iconfont icon-shangyige"></span></HeadLeft>
        <HeadRight><span @click="()=>{}" class="iconfont icon-bianji-"></span></HeadRight>
      </Head>
      <div class="banner-wrap">
        <Scroll :config="bannerConfig" :height="'6rem'">
          <ul class="home-banner"><li v-for="item in banner"><img :src="item.src"/></li></ul>
        </Scroll>
      </div>
      <Scroll :config="scrollConfig"></Scroll>
    </Wrap>
  </PopUp>
</template>
<script>
import wrap from '@vuc/wrap';
import {Wrap} from 'vuc-ui';
import http from '@vuc/http';
import $music from '@vuc/http/http.js';

const {WrapConfig, inputConf} = wrap;
export default {
  components: {...wrap, Wrap, ...Wrap.relativeComp},
  name: 'musichome',
  methods:{
    hidePop(){this.config.hide();},
  },
  mounted () {},
  data(){
    return {
      banner:[{src: "./static/1.jpg"}, {src: "./static/2.jpg"}, {src: "./static/3.jpg"}],
      wrapConfig:new WrapConfig(),
      list: [],
      scrollConfig:{
        derction:"y",
        itemNum:{x:1,y:1},
      },
      bannerConfig:{
        derction:"x",
        itemNum:{x:3,y:1},
        index:{x:0,y:0},
        takeOneStepAtATime:true,
      },
    }
  },
  computed:{
    config () {return this.$store.state.music.musicFMConf;},
    show(){return this.config.show;}
  },
  watch:{
    show(){
      this.show && $music.personal_fm()(res => {
        console.log(res)
      })
    }
  },
}
</script>

<style scoped>
  .banner-wrap{
    flex: 0;
  }
  .recommend-list{
    background-color: #fff;
  }
  .recommend-list>li{
    position: relative;
    padding: .4rem;
    border-bottom: 1px dashed #eee;
    font-size: 0;
  }
  .recommend-list>li>img,
  .recommend-list>li>div{
    vertical-align: middle;
  }
  .recommend-list>li>div{
    display: inline-block;
    width: 56%;
    padding: 0 .4rem;
  }
  .recommend-list>li>img{
    width: 44%;
  }
  .recommend-list>li>div>span{
    display: block;
    font-size: .75rem;
  }
  .recommend-list>li>div>i{
    display: block;
    font-style: normal;
    font-size: .55rem;
    color: #999;
    line-height: 1rem;
    padding: .2rem 0;
  }
  .recommend-list>li>div>li{
    font-size: .6rem;
  }
  .recommend-list>li>div>li>span{
    font-size: .55rem;
    color: #999;
  }
  .recommend-list>li>span{
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .recommend-list>li>span>i{
    font-style: normal;
    padding: .2rem;
    font-size: .55rem;
    opacity: .6;
  }
  .recommend-list>li>span:first-child{
    font-size: .65rem;
  }

  .recommend-list>li>span:last-child{
    font-size: .55rem;
    opacity: .6;
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
  .home-banner li img{
    width: 100%;
    display: block;
  }
</style>
