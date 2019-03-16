<template>
  <Wrap :config="wrapConfig">
    <Head slot="header">
      <HeadLeft><span @click="goBack" class="iconfont icon-guanyanren"></span></HeadLeft>
    </Head>
      <Scroll :config="scrollConfig" :height="'100%'">
        <div class="scroll-demo">
            <div v-for="(item, index) in threadList" :key="index" v-if="index<nowIndex && item.list && item.list.length">
              <p></p>
              <ScrollToFull  :config="scrollConfig">
                <div class="tuyimm">
                  <Scroll :config="item.config">
                      <li v-for="(key,i) in item.list" v-if="i<item.config.listLen && i<=item.config.itemNum.x" @click="">
                        <PicScroll :config="key.picConfig"/>
                        <div class="slide-bar"></div>
                      </li>
                  </Scroll>
                  <span><b>{{item.id}}</b><b>{{item.config.index.x + 1}} / {{item.config.listLen}}</b></span>
                </div>
              </ScrollToFull>
            </div>
        </div>
      </Scroll>
    <Foot slot="footer"></Foot>
  </Wrap>
</template>
<script>
import wrap from '@vuc/wrap';
import {Wrap} from 'vuc-ui';
const {WrapConfig, inputConf} = wrap;
export default {
  components: {Wrap, ...Wrap.relativeComp},
  name: 'home',
  methods:{
    goBack () {this.cRouter.goBack();},
    getImgList (item, cb) {
      fetch(`http://47.104.252.208:8999/lol/jsons/${item.id}`).then(resp => {
        resp.json().then(res => {
          if (res) {
            res && res.forEach(item => {
              item.id = `http://47.104.252.208:8999/lolmin/` + item.id;
              item.picConfig = {src: item.id};
            });
            item.list = res;
            item.config.listLen = res.length
          }
          cb && cb();
        }).catch(e => {
          cb && cb();
          console.log(e);
        })
      });
    },
    getThreadList () {
      fetch("http://47.104.252.208:8999/getLolImgList").then(resp => {
        resp.json().then(res => {
          this.threadList = res.data.map(item => ({
            id: item,
            list: [],
            isActive: false,
            config: {
              derction: "x",
              listLen: 10,
              noHandelMove: false,
              itemNum: {x: 2, y: 1},
              index:{x: 0,y: 0},
              takeOneStepAtATime: true,
              onRightEnd () {
                let next = this.itemNum.x;
                next = next + 4;
                if (next > this.listLen) next = this.listLen;
                this.itemNum.x = next;
              },
            }
          }));
          this.threadList.some((item, index) => {
            this.getImgList(item);
            // if (index < this.nowIndex) this.getImgList(item);
            // else return true;
          })
        }).catch(e => console.log(e))
      })
    },
  },
  mounted () {
    this.getThreadList();
  },
  data () {
    return {
      selectItem: null,
      nowIndex: 6,
      banner:[{src: "./static/1.jpg"}, {src: "./static/2.jpg"}, {src: "./static/3.jpg"}],
      wrapConfig:new WrapConfig(),
      threadList: null,
      scrollConfig: {
        derction: "y",
        itemNum: {x: 1,y: 1},
        loadMore: (item, hide) => {
          setTimeout(() => {
            this.nowIndex = this.nowIndex + 5;
            setTimeout(() => hide() ,30)
          }, 100)
        },
      },
      bannerConfig:{
        derction: "x",
        itemNum: {x: 3, y: 1},
        index: {x: 0, y: 0},
        takeOneStepAtATime: true,
      },
      tabConfig:{derction: "y"},
    }
  },
  computed:{
  },
  watch:{
  },
}
</script>

<style scoped>
.scroll-demo{
  /*height: 100%;*/
}
.scroll-demo p{
  height: 1rem;
}
.scroll-demo>div{
  height: 12rem;
}
.home-banner{
  font-size: 0;
  white-space: nowrap;
}
.tuyimm{
  position: relative;
  height: 100%;
  border-radius: .8rem;
  background-color: transparent;
  transition: all .6s;
}
.tuyimm span{
  display: block;
  position: absolute;
  top: 50%;
  width: 100%;
  line-height: 2rem;
  color: #fff;
  text-align: center;
  background-color: rgba(0,0,0,.3);
  transition: all .6s;
}
.tuyimm span b{
  font-weight: normal;
  padding:  0 .6rem;
}
.tuyimm>.vuc-scroll{
  height: 100%;
}
.vucScrollFull .tuyimm span{
  top: 0%;
  background-color: rgba(255,255,255,.1);
  line-height: 2.5rem;
  transition: all .3s .3s;
}
.vucScrollFull .tuyimm{
  padding: 0;
  border-radius: 0;
  background-color: #000;
}
.vucScrollFull .tuyimm .vuc-scroll{
  /*height: 100%;*/
}
.tuyimm li{
  width: 100%;
  height: 100%;
  display: inline-block;
  overflow: hidden;
  position: relative;
  font-size: 0;
}
.tuyimm li > .slide-bar{
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  display: block;
}
.vucScrollFull .tuyimm li > .slide-bar{
  display: none;
}
.tuyimm li img{
  width: 100%;
  transform: translateY(-50%);
  top: 50%;
  display: block;
  position: absolute;
}
</style>
