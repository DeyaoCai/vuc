<template>
  <Scroll :config="scrollConf"  :style="{height: '100%'}">
  <MusicNewSongList :config="songList"/>
  </Scroll>
</template>
<script>
// UI 组件
import MusicNewSongList from './MusicNewSongList.vue';
import {Wrap} from "vuc-ui";
export default {
  components: {Wrap,...Wrap.relativeComp, MusicNewSongList},
  name: 'train',
  data () {
    return {
      songList: {
        list: [],
      },
      scrollConf: {derction: 'y'},
      isFocused: false,
      searchTxt: "",
      lastInputTime: "",
    }
  },
  props: ["config"],
  computed: {
    list () {return this.config.list || []},
  },
  methods: {},
  watch: {
    list () {this.songList.list = this.list;}
  }
}
</script>
<style scoped>
  .music-search-result{
    padding: 0 .65rem;
    background-color: #fff;
  }
  .music-search-result>li{
    border-bottom: 1px dashed #eee;
    padding: .4rem;
  }
  .music-search-result>li>span{
    color: #333;
    display: block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .music-search-result>li>span:first-child{
    font-size: .7rem;
  }
  .music-search-result>li>span:last-child{
    font-size: .6rem;
    opacity: .7;
  }
</style>
