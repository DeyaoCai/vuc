<template>
  <PopUp :config="config">
    <MusicWrap :config="wrapConfig">
      <Head slot="header">
        <HeadTitle>排行榜</HeadTitle>
        <HeadLeft><span @click="hidePop" class="iconfont icon-shangyige"></span></HeadLeft>
        <HeadRight><span @click="()=>{}" class="iconfont icon-bianji-"></span></HeadRight>
      </Head>
      <div class="banner-wrap">
        <Scroll :config="bannerConfig" :height="'6rem'">
          <ul class="home-banner"><li v-for="item in banner"><img :src="item.src"/></li></ul>
        </Scroll>
      </div>
      <Scroll :config="scrollConfig">
          <ul class="recommend-list">
            <li v-for="(item, index) in list" @click="showRankList(index)">
              <img :src="item.coverImgUrl">
              <div>
                <span>{{item.name}}</span>
                <i>{{item.description}}</i>
                <li v-for="key in item.tracks">{{key.first}} <span>{{key.second}}</span></li>
              </div>
            </li>
          </ul>
      </Scroll>
    </MusicWrap>
  </PopUp>
</template>
<script>
import wrap from '@vuc/wrap';
import http from '@vuc/http';
import $music from '@vuc/http/http.js';

const {WrapConfig, inputConf} = wrap;
export default {
  components: wrap,
  name: 'musichome',
  methods:{
    hidePop(){this.config.hide();},
    showRankList(idx){
      $music.topList({idx})(res => {
        this.$store.mutations.showRankList(res.playlist);
      });
    }
  },
  mounted(){


  },
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
    config () {return this.$store.state.music.musicRankConf;},
    show(){return this.config.show;}
  },
  watch:{
    show(){
      this.show && $music.toplistDetail()(res=>{
        this.list = res.list;
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
