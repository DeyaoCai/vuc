<template>
  <PopUp :config="config">
    <Wrap :config="wrapConfig">
      <Head slot="header">
        <HeadTitle>全部歌单</HeadTitle>
        <HeadLeft><span @click="hidePop" class="iconfont icon-shangyige"></span></HeadLeft>
        <HeadRight><span @click="()=>{}" class="iconfont icon-bianji-"></span></HeadRight>
      </Head>
      <div class="banner-wrap">
        <Scroll :config="bannerConfig" :height="'6rem'">
          <ul class="home-banner"><li v-for="item in banner"><img :src="item.src"/></li></ul>
        </Scroll>
      </div>
      <Scroll :config="scrollConfig">
        <MusicSheetList :config="sheetList"/>
      </Scroll>
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
  mounted(){},
  data(){
    return {
      banner:[{src: "./static/1.jpg"}, {src: "./static/2.jpg"}, {src: "./static/3.jpg"}],
      wrapConfig: new WrapConfig(),
      sheetList: {
        list: [],
        howMuchPerLine: 2,
      },
      scrollConfig:{derction:"y", itemNum:{x:1,y:1},},
      bannerConfig:{derction:"x", itemNum:{x:3,y:1}, index:{x:0,y:0}, takeOneStepAtATime:true,},
    }
  },
  computed:{
    config () {return this.$store.state.music.musicDailySheetConf;},
    show(){return this.config.show;}
  },
  watch:{
    show(){
      this.show && $music.topPlaylist()(res => {
        console.log(res)
        this.sheetList.list = res.playlists;
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
    font-size: 0;
    padding: 0 .2rem;
  }
  .recommend-list>li{
    display: inline-block;
    position: relative;
    width: 33.3%;
    padding: .2rem;
    border-bottom: 1px dashed #eee;
  }
  .recommend-list>li>img{
    width: 100%;
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
