<template>
  <Wrap :config="wrapConfig">
    <AuthorInfo slot="leftSlide"></AuthorInfo>
    <div slot="rightSlide"><btns><span @click="">作者</span></btns>
    </div>
    <Head slot="header">
      <HeadTitle>我的音乐</HeadTitle>
    </Head>
      <Scroll :config="scrollConfig">
        <div>
        </div>
        <column><div class="home-title iconfont icon-fenlei" @click="showRecentPlay"> 最近播放 </div></column>
        <column><div class="home-title iconfont icon-fenlei"> 我的收藏 </div></column>
        <column><div class="home-title">  </div></column>
        <column><div class="home-title iconfont icon-fenlei"> 我的歌单 </div></column>
        <MusicSheetList :config="sheetList"/>
      </Scroll>
    <Foot slot="footer"></Foot>
  </Wrap>
</template>
<script>
import wrap from '@vuc/wrap';
import {Wrap} from 'vuc-ui';
import $music from '@vuc/http/http.js';
const {WrapConfig, inputConf} = wrap;
export default {
  components: {...wrap, Wrap, ...Wrap.relativeComp},
  name: 'musicmy',
  methods:{
    showRecentPlay () {
      const account = this.userInfo.account;
      $music.userRecord({uid: account.id, type: 0})(res => {
        this.config.showRecentPlay(res.allData || res.weekData);
      })
    }
  },
  mounted(){
    const account = this.userInfo.account;
    // $music.userSubcount()(res => {
    //   console.log(res)
    // });

    $music.userPlaylist({uid: account.id})(res => {
      const sheetList = res && res.playlist;
      this.sheetList.list = sheetList;
      $music.playlistDetail({id: sheetList[0].id})(res => {
        const sheetList = res && res.playlist;
        sheetList && (this.$store.state.music.likeLists = res.playlist.tracks);
      });
    });
  },
  props: ["config"],
  data(){
    return {
      sheetList: {
        list: [],
        howMuchPerLine: "s1",
        showSheetDetail: item => {this.config.showDailySheetDetail(item)}
      },
      userInfo: localStorage.userInfo && JSON.parse(localStorage.userInfo) || {},
      banner:[{src: "./static/1.jpg"}, {src: "./static/2.jpg"}, {src: "./static/3.jpg"}],
      wrapConfig:new WrapConfig(),
      scrollConfig:{derction:"y",},
    }
  },
  computed:{},
  watch:{},
}
</script>

<style scoped>
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
</style>
