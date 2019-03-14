<template>
  <MusicWrap :config="wrapConfig">
    <AuthorInfo slot="leftSlide"></AuthorInfo>
    <div slot="rightSlide"><btns><span>作者</span></btns>
    </div>
      <Scroll :config="scrollConfig">
        <div class="scroll-demo">
          <MusicDiscover :config="musicDiscoverConf"/>
          <MusicVideo/>
          <MusicMy :config="musicDiscoverConf"/>
          <MusicAccount :config="musicDiscoverConf"/>
        </div>
      </Scroll>
    <Foot slot="footer"><Tab :config="scrollConfig"></Tab></Foot>
    <div slot="out-pop">
      <MusicDailyRecommend/>
      <MusicDailySheet/>
      <MusicDailySheetDetail/>
      <MusicRank/>
      <MusicRankList/>
      <MusicFM/>
      <MusicRecentPlay/>
      <MusicPlay/>
      <MusicPlayingList/>
    </div>
  </MusicWrap>
</template>
<script>
import wrap from '@vuc/wrapUnit';
import http from '@vuc/http';
import $music from '@vuc/http/http';
const {WrapConfig, inputConf} = wrap;
export default {
  components: wrap,
  name: 'musichome',
  methods: {
    showSlide (type) {this.wrapConfig.showSlide({type});},
  },
  mounted () {
    console.log(wrap)
  },
  data () {
    return {
      music: this.$store.state.music,
      wrapConfig: new WrapConfig(),
      scrollConfig: {
        takeOneStepAtATime: true,
        derction: "x",
        itemNum: {x: 4, y: 1},
        index: {x: this.$route.query.index || 0, y: 0},
        tabs: [
          {name: "发现", iconClass: "icon-shouye"},
          {name: "视频", iconClass: "icon-shouye"},
          {name: "我的", iconClass: "icon-shouye"},
          {name: "设置", iconClass: "icon-fenlei"}
        ],
        keyPath: "name",
        onLeftEnd: () => this.showSlide("left"),
        onRightEnd: () => this.showSlide("right"),
      },
    }
  },
  computed: {
    musicPlayConf () {return this.$store.state.music.musicPlayConf},
    prevSongDto () {return this.musicPlayConf.prevSongDto;},
    songDto () {return this.musicPlayConf.songDto;},
    songList () {return this.musicPlayConf.list;},
    index () {return this.scrollConfig.index;},
    musicDiscoverConf () {
      return {
        showSlideL: () => {this.wrapConfig.showSlide({type: "left"});},
        showSlideR: () => {this.wrapConfig.showSlide({type: "right"});},
        setIndex: (index) => {
          const conf = this.scrollConfig;
          index < 0 && (index = 0);
          index >= conf.itemNum && (index = conf.itemNum - 1);
          this.scrollConfig.index.x = index;
        },
      }
    },
  },
  watch: {
    index () {
      this.cRouter.replace({name: "musichome", query: {index: this.index.x}})
    },
    songDto () {
      if (!this.songDto) return;
      if (this.prevSongDto && this.songDto.id === this.prevSongDto.id) return;
      const id = this.songDto.id || (this.songDto.song && this.songDto.song.id);
      id && $music.songUrl({id})(res => (document.querySelector("#audio").src = res.data[0].url));
    },
  },
}
</script>
<style scoped>
.scroll-demo{
  white-space: nowrap;
  font-size: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}
.scroll-demo>.vuc-scroll{
  display: inline-block;
  vertical-align: top;
  width: 100%;
  height: 100%;
  border: 1px solid #fff;
  overflow: hidden;
}
.scroll-demo>.vuc-wrap{
  display: inline-block;
  width: 100%;
}
</style>
