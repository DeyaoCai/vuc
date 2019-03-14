<template>
  <MusicWrap :config="wrapConfig">
    <AuthorInfo slot="leftSlide"></AuthorInfo>
    <div slot="rightSlide"><btns><span @click="">作者</span></btns>
    </div>
    <Head slot="header">
      <HeadTitle><MusicSearch :config="searchConf"/></HeadTitle>
      <HeadLeft>
        <Icon :type="'arrow-left'" :config="{color: '#fff', click: goBack}"></Icon>
      </HeadLeft>
      <HeadRight><span @click="showMusic(true)" class="iconfont icon-bianji-"></span></HeadRight>
    </Head>
    <Tab :config="scrollConfig"></Tab>
    <Scroll :config="scrollConfig">
      <div class="scroll-demo">
        <Scroll :config="tabConfig">
          <Scroll :config="bannerConfig" :height="'6rem'">
            <ul class="home-banner"><li v-for="(item, index) in banner" :key="index"><img :src="item.src"/></li></ul>
          </Scroll>

          <!--<div class="test-saocaozuo-wrap">-->
            <!--<div>-->
              <!--<ScrollToFull  :config="tabConfig"><div class="test-saocaozuo">-->
                <!--<Icon :type="'arrow-left'"/>-->
              <!--</div></ScrollToFull>-->
            <!--</div>-->
            <!--<div>-->
              <!--<ScrollToFull  :config="tabConfig"><div class="test-saocaozuo">123</div></ScrollToFull>-->
            <!--</div>-->
            <!--<div>-->
              <!--<ScrollToFull  :config="tabConfig"><div class="test-saocaozuo">123</div></ScrollToFull>-->
            <!--</div>-->
            <!--<div>-->
              <!--<ScrollToFull  :config="tabConfig"><div class="test-saocaozuo">123</div></ScrollToFull>-->
            <!--</div>-->
          <!--</div>-->

          <column><div class="home-title"/></column>
          <btns :type="'color padding'">
            <div @click="showFM">私人FM</div>
            <div @click="showRecommend">每日推荐</div>
            <div @click="showDailySheet">歌单</div>
            <div @click="showRank">排行榜</div>
          </btns>

          <column><div class="home-title iconfont icon-fenlei">推荐歌单</div></column>
          <MusicSheetList :config="sheetList"/>

          <column><div class="home-title iconfont icon-fenlei">最新歌曲</div></column>
          <MusicNewSongList :config="newSongList"/>

          <column><div class="home-title iconfont icon-fenlei">精品歌单</div></column>
          <MusicSheetList :config="topSheetList"/>

        </Scroll>
        <Scroll :config="tabConfig2">
          <Scroll :config="bannerConfig" :height="'6rem'">
            <ul class="home-banner"><li v-for="item in banner"><img :src="item.src"/></li></ul>
          </Scroll>
          <column><div class="home-title"/></column>
          <btns :type="'color padding'">
            <div @click="">电台分类</div>
            <div @click="">电台排行</div>
            <div @click="">DJ电音</div>
            <div @click="">小冰电台</div>
          </btns>
          <column><div class="home-title iconfont icon-fenlei">今日优选</div></column>
          <btns :type="'color padding'">
            <div @click="">歌曲一</div>
            <div @click="">歌曲二</div>
            <div @click="">歌曲三</div>
          </btns>
          <btns :type="'color padding'">
            <div @click="">歌曲四</div>
            <div @click="">歌曲五</div>
            <div @click="">歌曲六</div>
          </btns>
          <column><div class="home-title iconfont icon-fenlei"> 有声书</div></column>
          <btns :type="'color padding'">
            <div @click="">歌曲一</div>
            <div @click="">歌曲二</div>
            <div @click="">歌曲三</div>
          </btns>
          <btns :type="'color padding'">
            <div @click="">歌曲四</div>
            <div @click="">歌曲五</div>
            <div @click="">歌曲六</div>
          </btns>
        </Scroll>
      </div>
    </Scroll>
    <MusicSearchResultPop :config="searchConf"/>
  </MusicWrap>
</template>
<script>
import wrap from '@vuc/wrap';
import http from '@vuc/http';
import $music from '@vuc/http/http.js';

const {WrapConfig, inputConf} = wrap;
export default {
  components: wrap,
  name: 'musichome',
  props: ["config"],
  data(){
    return {
      banner:[{src: "./static/1.jpg"}, {src: "./static/2.jpg"}, {src: "./static/3.jpg"}],
      wrapConfig: new WrapConfig(),
      sheetList: {list: [], howMuchPerLine: 3,},
      topSheetList: {list: [], howMuchPerLine: 1,},
      newSongList: {
        list: [],
      },
      scrollConfig:{
        takeOneStepAtATime:true,
        derction:"x",
        itemNum:{x:2,y:1},
        index:{x:this.$route.query.index||0,y:0},
        tabs:[
          {name:"个性推荐", iconClass:"icon-shouye"},
          {name:"主播电台", iconClass:"icon-shouye"},
        ],
        keyPath:"name",
        onLeftEnd: () => this.config.showSlideL(),
        onRightEnd: () => this.config.setIndex(1),
      },
      bannerConfig:{
        derction:"x",
        itemNum:{x:3,y:1},
        index:{x:0,y:0},
        takeOneStepAtATime:true,
      },
      tabConfig: {derction:"y"},
      tabConfig2: {derction:"y"},
      searchConf: {
        bg:{
          backgroundColor: "rgba(255,255,255,.95)",
        },
        txt: "",
        list:[],
        show: false,
        full: true,
        stop: true,
        scope: this,
        onInput () {
          $music.search({keywords: encodeURI(this.txt)})(res => {
            this.list = res.result.songs;
          })
        }
      },
    }
  },
  computed:{
    index(){return this.scrollConfig.index;}
  },
  watch:{
    index(){
      this.cRouter.replace({name:"musichome",query:{index:this.index.x}})
    }
  },
  mounted () {
    console.log(this.$store)
    $music.recommendResource()(res => {
      this.sheetList.list = res.recommend;
    });
    $music.personalizedNewsong()(res => {
      this.newSongList.list = res.result;
    })
    $music.topPlaylistHighquality()(res => {
      this.topSheetList.list = res.playlists;
    })
  },
  methods: {
    goBack () {this.cRouter.goBack();},
    showSlide (type) {this.wrapConfig.showSlide({type});},
    showMusic (songDto, songs, needShowPop) {
      this.$store.mutations.showMusic({songDto, songs, needShowPop});
    },
    showFM () {this.$store.mutations.showFM();},
    showRecommend () {this.$store.mutations.showRecommend();},
    showDailySheet () {this.$store.mutations.showDailySheet();},
    showRank () {this.$store.mutations.showRank();},
  },
}
</script>

<style scoped>

.test-saocaozuo-wrap{
  display: flex;
  height: 3rem;
}

.test-saocaozuo-wrap>*{
  flex: 1;
}


.test-saocaozuo{
  height: 100%;
  word-break: break-all;
  white-space: normal;
  border-radius: .5rem;
  padding: .65rem;
  background-color: #418dcb;
  color: #fff;
  transition: all .6s;
}

.vucScrollFull .test-saocaozuo{
  color: #418dcb;
  background-color: rgba(255,255,255,.5);
  border-radius: 0;
}


.scroll-demo{
  white-space: nowrap;
  font-size: 0;
  height: 100%;
}
.scroll-demo>.vuc-scroll{
  display: inline-block;
  vertical-align: top;
  width: 100%;
  height: 100%;
  border: 1px solid #fff;
  overflow: hidden;
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


.recommend-list{
  background-color: #fff;
  font-size: 0;
  padding: 0 .2rem;
  white-space: normal;
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

</style>
