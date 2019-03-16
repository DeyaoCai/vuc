<template>
  <ul class="music-sheet-list">
    <ScrollSlide v-for="(item, index) in sheetList.list" :key="index" :config="item" :supConf="sheetList">
      <li @click="showSheetDetail(item)">
        <img v-if="showPics" :src="item.picUrl || item.coverImgUrl">
        <div>
          <span>{{item.name}}<i>{{item.creator.nickname}}</i></span>
          <span>{{item.copywriter || item.description}}</span>
        </div>
      </li>
      <div slot="btns" class="music-sheet-btn">
        <span class="c-b-default iconfont icon-xiazai-"> 播放全部 </span>
        <span class="c-b-like iconfont icon-shoucang" @click.stop="like(item)"> 喜欢 </span>
      </div>
    </ScrollSlide>
  </ul>
</template>
<script>
import $music from '@vuc/http/http.js';
import {Wrap} from "vuc-ui";
export default {
  name: 'music-sheet-list',
  components: {Wrap, ...Wrap.relativeComp},
  props: ['config'],
  data(){
    return {
      sheetList: {
        list: this.config.list,
        expandedItem: null,
      },
    }
  },
  methods: {
    showSheetDetail(item){
      this.sheetList.expandedItem ||
      this.$store.mutations.showDailySheetDetail(item);
    },
    like (item) { // t = 1 取消收藏
      $music.playlistSubscribe({id: item.id, t: 1})(res=>{})
    }
  },
  computed:{
    showPics () {return this.$store.state.music.shallShowPics},
  },
  watch:{
    "config.list" (val) {
      this.sheetList.list = val;
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
    padding: .2rem;
    border-bottom: 1px dashed #eee;
    font-size: 0;
    display: flex;
  }
  .music-sheet-list li>img{
    height: 6rem;
    width: 6rem;
    vertical-align: middle;
  }
  .music-sheet-list li>div{
    padding: .2rem;
    display: inline-block;
    flex: 1 1 0;
    vertical-align: middle;
  }
  .music-sheet-list li>div>span{
    display: block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .music-sheet-list li>div>span{
    padding: .4rem 0;
    white-space: normal;
  }
  .music-sheet-list li>div{
    display: inline-block;
  }
  .music-sheet-list li>div>span>i{
    display: block;
    padding: .4rem 0 0 0;
  }
  .music-sheet-list li>div>span>i{
    font-style: normal;
    padding: .2rem;
    font-size: .55rem;
    opacity: .6;
  }
  .music-sheet-list li>div>span:first-child{
    font-size: .65rem;
  }

  .music-sheet-list li>div>span:last-child{
    font-size: .55rem;
    opacity: .6;
  }
  .music-sheet-list li:active{
    background-color: rgba(65,141,203,.1);
  }
  .music-sheet-list li>span{
    right: 0;
    top: 0;
    position: absolute;
    line-height: 2.5rem;
    color: #666;
  }
  .music-sheet-list li>span>*{
    display: inline-block;
    padding: 0 .2rem;
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
    color: #55a532;
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
