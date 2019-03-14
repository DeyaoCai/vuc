<template>
  <PopUp :config="config">
    <MusicWrap :config="wrapConfig">
      <Head slot="header">
        <HeadTitle v-if="sheetDto">{{sheetDto.name}}</HeadTitle>
        <HeadLeft><span @click="hidePop" class="iconfont icon-shangyige"></span></HeadLeft>
        <HeadRight><span @click="()=>{}" class="iconfont icon-bianji-"></span></HeadRight>
      </Head>
      <div class="banner-wrap" v-if="sheetDto">
        <img :src="sheetDto.picUrl || sheetDto.coverImgUrl">
        <div>
          <span>{{sheetDto.copywriter}}</span>
          <span>{{sheetDto.creator.nickname}}</span>
        </div>
      </div>
      <Scroll :config="scrollConfig">
        <MusicNewSongList v-for="(items, index) in list" :config="{list: items}" :key="index"/>
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
  },
  mounted(){},
  data(){
    return {
      nowListIndex: 0,
      banner:[{src: "./static/1.jpg"}, {src: "./static/2.jpg"}, {src: "./static/3.jpg"}],
      wrapConfig:new WrapConfig(),
      list: [],
      scrollConfig:{
        derction:"y",
        itemNum:{x:1,y:1},
        loadMore: (item, hide) => {
          if(this.list.length > this.nowListIndex + 1) {this.nowListIndex ++;};
          setTimeout(()=>{ hide(); }, 300);
        }
      },
      bannerConfig:{
        derction:"x",
        itemNum:{x:3,y:1},
        index:{x:0,y:0},
        takeOneStepAtATime:true,
      },
    }
  },
  // props: ["config"],
  computed:{
    config () {return this.$store.state.music.musicDailySheetDetailConf;},
    show(){return this.config.show;},
    sheetDto(){return this.config.sheetDto;},
  },
  watch:{
    show(){
      this.show && $music.playlistDetail({id: this.sheetDto.id, trackCount: 20})(res => {
        const tracks = res.playlist.tracks
        this.list = [];
        this.nowListIndex = 0;
        while(tracks.length){
          this.list.push(tracks.splice(0, 20))
        }
      })
    }
  },
}
</script>

<style scoped>
  .banner-wrap{
    flex: 0;
    font-size: 0;
    background-color: #fff;
    padding: .4rem;
  }
  .banner-wrap>*{
    vertical-align: middle;
  }
  .banner-wrap>img{
    width: 40%;
  }
  .banner-wrap>div{
    display: inline-block;
    width: 60%;
  }
  .banner-wrap>div>span{
    font-size: .65rem;
    display: block;
    padding: .4rem
  }
  .banner-wrap>div>span:first-child{
    font-size: .65rem;;
  }
  .banner-wrap>div>span:last-child{
    font-size: .55rem;
    opacity: .8;
  }
</style>
