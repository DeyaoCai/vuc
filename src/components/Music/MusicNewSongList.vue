<template>
  <ul class="music-sheet-list">
    <ScrollSlide :config="item" v-for="(item,index) in songList.list" :key="index"  :supConf="songList">
      <li @click="showMusic(item)" @touchstart="hideAll(item)">
        <img :src="getSrc(item)" v-if="showPics && getSrc(item)">
        <div>
          <span>{{getName(item)}} <i>{{getArtists(item)}}</i></span>
          <span>{{getReason(item)}}</span>
        </div>
        <span @click.stop="">
          <b class="iconfont icon-bofang-"  @click.stop="showMusic(item, true, config.list)"></b>
          <b class="iconfont icon-xuanze-4"></b>
          <b class="iconfont icon-gengduo-"></b>
        </span>
      </li>
      <div slot="btns" class="music-sheet-btn">
        <span class="c-b-like iconfont icon-shoucang" :class="{active: isLiked(item)}" @click.stop="liskThisSong(item)"> {{isLiked(item) ? "不喜欢" : "喜欢"}} </span>
        <span class="c-b-warn iconfont icon-shoucang active" @click.stop="deleteThis(item)"> 删除 </span>
      </div>
    </ScrollSlide>
  </ul>
</template>
<script>
import Vue from "vue";
import $music from '@vuc/http/http.js';
import ScrollSlide from "../ScrollSlide.vue";
export default {
  name: 'music-sheet-list',
  props: ["config"],
  components: {ScrollSlide},
  computed: {
    showPics () {return this.$store.state.music.shallShowPics},
  },
  watch:{
    "config.list" (val) {
      this.songList.list = this.initSongList(val);
    },
  },
  data(){
    this.config.list && this.config.list.forEach(item=>{
      item.isDeleted === undefined && Vue.set(item, "isDeleted", false);
    })
    return {
      songList: {
        list: this.initSongList(this.config.list),
        expandedItem: null,
      }
    }
  },
  methods: {
    deleteThis(item){
      item.isDeleted = true;
    },
    initSongList(list){
      list && list.forEach(item=>{
        item.isDeleted === undefined && Vue.set(item, "isDeleted", false);
      });
      return list;
    },
    isLiked (item) {
      const list = this.$store.state.music.likeLists;
      return list && list.find(key => {
        return item.id === key.id
      });
    },
    hideAll(item){
      this.config.list.forEach(key => {
        item !== key && key.hide && key.hide()
      })},
    showMusic (songDto, songs, needShowPop) {
      this.songList.expandedItem ||
      this.$store.mutations.showMusic({songDto, songs, needShowPop});
    },
    liskThisSong(item){
      $music.like({id: item.id, like: !this.isLiked(item)});
    },
    getName(item){
      if (!item) return "";
      return (
        item.name ||
        (item.song && item.song.name)
      );
    },
    getSrc(item){
      if (!item) return "";
      return (
        (item.song && item.song.al && item.song.al.picUrl) ||
        (item.song && item.song.album && item.song.album.picUrl) ||
        (item.album && item.album.blurPicUrl) ||
        (item.al && item.al.picUrl)
      )
    },
    getArtists(item) {
      if(this.getReason(item)) return (
        (item.song && item.song.artists && item.song.artists.map(key => key.name).join(" | ")) ||
        (item.ar && item.ar.map(item => item.name).join(" | ")) ||
        (item.song && item.song.ar && item.song.ar.map(key => key.name).join(" | ")) ||
        (item.artists && item.artists.map(key => key.name).join(" | "))
      );
      else return "";
    },
    getReason(item) {
      if (!item) return "";
      return (
        item.reason ||
        (item.song && item.song.artists && item.song.artists.map(key => key.name).join(" | ")) ||
        (item.ar && item.ar.map(item => item.name).join(" | ")) ||
        (item.song && item.song.ar && item.song.ar.map(key => key.name).join(" | ")) ||
        (item.artists && item.artists.map(key => key.name).join(" | "))
      );
    },
  },
}
</script>
<style scoped>
  .music-sheet-list{
    background-color: #fff;
    font-size: 0;
    padding: 0 .2rem;
    white-space: normal;
  }
  .music-sheet-list li{
    position: relative;
    padding: .6rem .2rem;
    border-bottom: 1px solid #eee;
    display: flex;
  }
  .music-sheet-list li>img{
    width: 2.5rem;
    height: 2.5rem;
    flex: 0 0 2.5rem;
  }
  .music-sheet-list li>div{
    flex: 1 1 0;
    overflow: hidden;
    padding: 0 .2rem;
  }
  .music-sheet-list li>span{
    flex: 0 0 0;
  }
  .music-sheet-list li>div>span{
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .music-sheet-list li>div>span>i{
    font-style: normal;
    padding: .2rem;
    font-size: .55rem;
    opacity: .6;
  }
  .music-sheet-list li>div>span:first-child{
    font-size: .65rem;
    line-height: 1.3rem;
    padding-bottom: .2rem;
  }
  .music-sheet-list li>div>span:last-child{
    font-size: .55rem;
    opacity: .6;
    line-height: 1rem;
  }
  .music-sheet-btn>span:active,
  .music-sheet-list li:active{
    background-color: rgba(65, 141, 203, .1);
  }
  .music-sheet-list li>*:last-child{
    display: flex;
  }

  .music-sheet-list li>*:last-child>b{
    flex: 1 1;
    padding: .2rem;
    font-weight: normal;
  }
  .music-sheet-btn{
    padding: .1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .music-sheet-btn>span{
    height: 100%;
    padding: 0 .6rem;
    vertical-align: middle;
    line-height: 2.6rem;
  }
  .music-sheet-btn>span.c-b-like{
    color: #999;
  }
  .music-sheet-btn>span.c-b-like.active{
    color: #55a532;
    font-weight: bold;
  }
  .music-sheet-btn>span.c-b-default{
    color: #418dcb;
  }
  .music-sheet-btn>span.c-b-delete{
    color: #f54;
  }
  .music-sheet-btn>span.c-b-warn{
    color: #fb4;
  }
</style>
