
<template>
  <div  @click.stop="" class="">
    <Content :type="['flex']">
      <input type="file" @change="imgChanged($event)" ref="input"/>
      <div :style="getStyle(size.small)">
        <Scroll :config="imgScroll" :height="'100%'"><img :src="srcs" /></Scroll>
        <canvas :width="size.small" :height="size.small" ref="canvas"></canvas>
      </div>
      <div :style="getStyle(size.large)">
        <Scroll :config="imgLScroll" :height="'100%'"><img :src="srcs" /></Scroll>
        <canvas :width="size.large.x" :height="size.large.y" ref="canvas1"></canvas>
      </div>
      <Btns><span @click="drawImg(srcs)">保存</span><span @click="choose(srcs)">选择</span></Btns>
    </Content>
  </div>
</template>
<script>
import {Wrap} from 'vuc-ui';
import http from '@vuc/http';
export default {
  components: {Wrap,...Wrap.relativeComp},
  name: 'train',
  props:["conf"],
  methods:{
    drawImg(dataImg){
      if (!this.val) return;
      const c = this.$refs.canvas;
      const ctx = c.getContext("2d");

      const c1 = this.$refs.canvas1;
      const ctx1 = c1.getContext("2d");
      const img = new Image();
      img.src = dataImg;
      img.onload = () => {
        const posi = this.imgScroll.getPosi();
        const posiL = this.imgLScroll.getPosi();
        ctx.drawImage(img, posi.x, posi.y, img.width, img.height);
        ctx1.drawImage(img, posiL.x, posiL.y, img.width, img.height);
        this.outPut.name = this.val.split(/\\/).pop().split(".")[0];
        this.outPut.large = c.toDataURL("image/png");
        this.outPut.small = c1.toDataURL("image/png");
        http.saveImg(this.outPut).then(res => {
          this.val = "";
          this.srcs = null;
          this.$refs.input.value = "";
        }).catch(e => console.log(e))

      }
    },
    imgChanged (ev) {
      var reader = new FileReader();
      this.val = ev.target.value;
      reader.readAsDataURL(ev.target.files[0]);
      reader.onload = e => {this.srcs = reader.result;}
    },
    getStyle (conf) {
      if (conf && conf.x && conf.y) return {width: conf.x + "px", height: conf.y + "px",}
      else if (conf) return {width: conf + "px", height: conf + "px",}
    },
    choose () {
      this.conf.onSelect && this.conf.onSelect(this.val.split(/\\/).pop().split(".")[0]);
    },
  },
  mounted () {},
  data () {
    return {
      val: null,
      size: {large:{x: 216, y: 384}, small: 150},
      outPut: {name: null, large: null, small: null},
      srcs: null,
      scrollConf: {derction: "y"},
      imgScroll: {isGetInnerSizeByChild: true},
      imgLScroll: {isGetInnerSizeByChild: true},
    }
  },
  computed: {},
  watch: {},
}
</script>
<style scoped>
  canvas{
    display: none;
  }
</style>
