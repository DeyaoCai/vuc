<template>
  <MusicWrap :config="wrapConfig">
    <AuthorInfo slot="leftSlide"></AuthorInfo>
    <div slot="rightSlide"><btns><span @click="">作者</span></btns>
    </div>
    <Head slot="header">
      <HeadTitle>MV</HeadTitle>
    </Head>
      <Scroll :config="scrollConfig">
        <ul>
          <li class="mv-list" v-for="item in list">
            <div class="mv-ar">{{item.name}} <i>{{item.artistName}}</i></div>
            <img v-if="showPics" :src="item.picUrl" alt="">
            <span>{{item.copywriter}}</span>
          </li>
        </ul>
      </Scroll>
  </MusicWrap>
</template>
<script>
import wrap from '@vuc/wrap';
import $music from '@vuc/http/http.js';
const {WrapConfig, inputConf} = wrap;
export default {
  components: wrap,
  name: 'musicvideo',
  methods:{},
  mounted () {
    $music.personalizedMv()(res => {
      this.list = res.result;
    })
  },
  data () {
    return {
      banner: [{src: "./static/1.jpg"}, {src: "./static/2.jpg"}, {src: "./static/3.jpg"}],
      wrapConfig: new WrapConfig(),
      scrollConfig: {
        derction: "y",
        onLeftEnd: () => this.showSlide("left"),
        onRightEnd: () => this.showSlide("right"),
      },
      list: [],
    }
  },
  computed: {
    index () {return this.scrollConfig.index;},
    showPics () {return this.$store.state.music.shallShowPics},
  },
  watch: {
    index () {
      this.cRouter.replace({name: "musichome", query: {index: this.index.x}})
    }
  },
}
</script>

<style scoped>
.mv-list{
  padding: .4rem;
}
.mv-list>img{
  width: 100%;
  border-radius: .4rem;
}
.mv-ar{
  font-size: .65rem;
  line-height: 1.2rem;
}
.mv-ar>i{
  font-size: .5rem;
  font-style: normal;
  color: #999;
}
.mv-list>span{
  display: block;
  font-size: .6rem;
  line-height: 1rem;
}
</style>
