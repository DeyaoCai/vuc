<template>
  <PopUp :config="config">
    <div @click.stop="">
      <Scroll :config="scrollConfig" :height="'15rem'">
        <MusicNewSongList :config="songList"/>
      </Scroll>
    </div>
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
    play(){
      const $ele = document.querySelector("#audio");
      if ($ele.paused) $ele.play();
      else $ele.pause();
    },
  },
  mounted(){},
  data(){
    const _t = this;
    return {
      songList: {list: this.list},
      scrollConfig:{
        derction: "y",
        reflash(item, hide){ setTimeout(() => {
          _t.config.hide();
          hide();
        }, 300) }
      },
    }
  },
  // props: ["config"],
  computed: {
    config () {return this.$store.state.music.musicPlayingConf;},
    list () {return this.$store.state.music.musicPlayConf.list;},
    show(){return this.config.show;},
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
  watch:{
    list () {
      this.songList.list = this.list;}
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
