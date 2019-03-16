<template>
  <PopUp :config="config">
    <Wrap :config="wrapConfig">
      <Head slot="header">
        <HeadTitle>最近播放</HeadTitle>
        <HeadLeft><span @click="hidePop" class="iconfont icon-shangyige"></span></HeadLeft>
        <HeadRight><span @click="()=>{}" class="iconfont icon-bianji-"></span></HeadRight>
      </Head>
      <div class="banner-wrap">
        <Scroll :config="bannerConfig" :height="'6rem'">
          <ul class="home-banner"><li v-for="item in banner"><img :src="item.src"/></li></ul>
        </Scroll>
      </div>
      <Scroll :config="scrollConfig">
        <MusicNewSongList :config="songList"/>
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
      songList: {
        list: [],
      },
      banner:[{src: "./static/1.jpg"}, {src: "./static/2.jpg"}, {src: "./static/3.jpg"}],
      wrapConfig:new WrapConfig(),
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
    config () {return this.$store.state.music.musicRecentPlayConf;},
    show(){return this.config.show;},
    listDot(){return this.config.listDto;},
    list(){return this.config && this.config.list;},
  },
  watch:{
    list(){
      this.songList.list = this.list;
    },
  }
}
</script>

<style scoped>
  .banner-wrap{
    flex: 0;
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
