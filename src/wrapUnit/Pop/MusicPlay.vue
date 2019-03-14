<template>
  <PopUp :config="config">
    <MusicWrap :config="wrapConfig">
      <Head slot="header">
        <div class="music-play-title">{{getTitle}}</div>
        <HeadLeft><span @click="hidePop" class="iconfont icon-shangyige"></span></HeadLeft>
        <div class="vol-bar"><Range :config="rangeConf"/></div>
      </Head>

      <Scroll :config="scrollConfig">
        <div class="play-pic-wrap" :style="{backgroundImage: `url(${getUrl})`}"></div>
        <div class="play-pic-wrap-animation" :style="{backgroundImage: `url(${getUrl})`}"></div>
      </Scroll>
      <Foot slot="footer">
        <div class="pro-bar"><Range :config="progressConf"/></div>
        <btns>
          <span class="iconfont icon-shoucang">喜欢</span>
          <span class="iconfont icon-xiazai-">收藏</span>
          <span class="iconfont icon-gengduo-">评论（999+）</span>
        </btns>
        <btns>
          <span class="iconfont icon-paixu-"></span>
          <span class="iconfont icon-zuojiantou"></span>
          <span class="iconfont icon-bofang1" @click="play"></span>
          <span class="iconfont icon-jiantouyou"></span>
          <span class="iconfont icon-gengduo-" @click="showLists"></span>
        </btns>
      </Foot>
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
    hidePop () {this.config.hide();},
    showLists () {
      this.$store.mutations.showPlayingMusic();
    },
    play(){
      const $ele = document.querySelector("#audio");
      if ($ele.paused) $ele.play();
      else $ele.pause();
    },
  },
  data(){
    const $ele = document.querySelector("#audio");
    $ele.ontimeupdate =  () => {
      this.progressConf.setPosi && this.progressConf.setPosi($ele.currentTime / $ele.duration);
    };
    $ele.onended =  () => {
      const index = this.list.indexOf(this.songDto);
      const songDto = this.list[index + 1];
      songDto && this.$store.mutations.showMusic(songDto);
    };
    return {
      progressConf: {
        min: 0,
        max: 100,
        isSingle: 'only-left',
        onChange (conf) {
          if (conf.type === "end"){
            try {
              const durT = $ele.duration;
              $ele.currentTime = conf.left * durT;
              $ele.play();
            } catch (e) {console.log(e)}
          }
        },
      },
      rangeConf: {
        min: 0,
        max: 100,
        isSingle: "only-right",
        howMuchRange: 20,
        onChange(conf){
          ($ele || document.querySelector("#audio")).volume = Math.abs(1 + conf.right);
        },
      },
      wrapConfig: new WrapConfig(),
      scrollConfig: {derction: "x",},
    }
  },
  // props: ["config"],
  computed: {
    config () {return this.$store.state.music.musicPlayConf;},
    show(){return this.config.show;},
    list(){return this.config.list;},
    songDto(){return this.config.songDto;},
    getUrl () {
      return (this.songDto && this.songDto.al && this.songDto.al.picUrl) ||
        (this.songDto && this.songDto.album && this.songDto.album.picUrl);
    },
    getTitle(){return this.songDto && this.songDto.name;},
    picUrl(){
      const songDto = this.songDto;
      return songDto && (
        songDto.album && songDto.album.blurPicUrl ||
        (songDto.al && songDto.al.picUrl)
      )
    }
  },
  mounted(){
    console.log(this.config)
  },
}
</script>

<style scoped>
  .music-play-title{
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    width: 100%;
    line-height: 2.5rem;
    color: #fff;
    border-bottom: 1px solid rgba(255,255,255, .5);
    white-space: nowrap;
    padding: 0 2.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .play-pic-wrap{
    width: 30rem;
    height: 30rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 30rem 30rem;
    filter: blur(1rem) brightness(100%) opacity(10);
  }
  .play-pic-wrap-animation{
    width: 9rem;
    height: 9rem;
    position: absolute;
    border-radius: 5rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 40rem 40rem;
    animation: rotates infinite linear 30s;
  }
  @keyframes rotates {
    0%{transform: translate(-50%, -50%) rotate(0deg);}
    100%{transform: translate(-50%, -50%) rotate(360deg);}
  }
  .vol-bar{
    position: absolute;
    top: 2.5rem;
    z-index: 2;
    width: 100%;
  }
  .pro-bar{
    position: absolute;
    bottom: 100%;
    width: 100%;
  }
</style>
