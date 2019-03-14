<template>
  <temWrap :config="wrapConfig">
    <Head slot="header">
      <HeadLeft><span @click="goBack" class="iconfont icon-guanyanren"></span></HeadLeft>
    </Head>
      <Scroll :config="scrollConfig" :height="'100%'">
        <div class="scroll-demo">
            <div>
            <ScrollToFull  :config="scrollConfig">
              <div class="tuyimm">
                    <li><img :src="imgUrl"/></li>
                <span>缩略图</span>
              </div>
            </ScrollToFull>
            </div>
        </div>
      </Scroll>
    <Foot slot="footer"></Foot>
  </temWrap>
</template>
<script>
import wrap from '@vuc/wrap';
import http from '@vuc/http';
const {WrapConfig, inputConf} = wrap;
function downloadImg(data,call) {
  fetch(
    "http://vuc.cn:8999/downloadImg",
    {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    },
  ).then((res) => {
    res.json().then(res => call && call(res)).catch(e => console.log(e));
  }).catch(e => console.log(e));
};
function getBase64Image(img) {
  const canvas = document.createElement("canvas");
  const rate = 375 / img.width
  canvas.width = 375;
  canvas.height = img.height * rate;
  console.log(canvas.width, canvas.height)
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  var dataURL = canvas.toDataURL();
  return dataURL;
}
function getCanvasBase64(url, callback) {
  var image = new Image();
  image.setAttribute("crossOrigin", "Anonymous");
  image.src = url;
  image.onload = function () {
    const base64 = getBase64Image(image);
    downloadImg({
      src: url.replace(/http:\/\/vuc\.cn:8999\/lol\//,""),
      data: base64,
      type: "min"
    }, res => {
      callback && callback(base64);
    })
  }
}

export default {
  components: wrap,
  name: 'home',
  methods:{
    goBack () {this.cRouter.goBack();},
    minifyImg () {
      if (this.list && this.list.length) {
        const id = encodeURI("http://vuc.cn:8999/" + this.list.shift());
        // this.imgUrl = id;
        getCanvasBase64(id, res => {
          this.imgUrl = res;
          this.minifyImg();
        })
      }
    },
    getThreadList () {
      fetch("http://vuc.cn:8999/getDiffLolList").then(resp => {
        resp.json().then(res => {
          this.list = res.data;
          this.minifyImg();
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
      wrapConfig:new WrapConfig(),
      imgUrl: null,
      scrollConfig: {
        derction: "y",
        itemNum: {x: 1,y: 1},
      },
      bannerConfig: {
        derction:"x",
        itemNum:{x:3,y:1},
        index:{x:0,y:0},
        takeOneStepAtATime:true,
      },
      tabConfig:{derction:"y"},
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
}
.scroll-demo>div{
  height: 20rem;
}
.home-banner{
  font-size: 0;
  white-space: nowrap;
}
.tuyimm{
  position: relative;
  height: 100%;
  padding: 2rem 0;
  background-color: transparent;
  transition: all .6s;
}
.tuyimm>span{
  line-height: 2rem;
  width: 100%;
  background-color: rgba(0,0,0,.3);
  color: #fff;
  top: 50%;
  text-align: center;
  display: block;
  position: absolute;
}
.tuyimm>.vuc-scroll{
  height: 100%;
}
.tuyimm li{
  width: 100%;
  height: 100%;
  display: inline-block;
  overflow: hidden;
  position: relative;
  font-size: 0;
}
.tuyimm li img{
  width: 100%;
  transform: translateY(-50%);
  top: 50%;
  display: block;
  position: absolute;
}
</style>
