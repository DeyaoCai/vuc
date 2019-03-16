<style scoped>
  .mathine-content{
    position: relative;
    width: 12rem;
    height: 12rem;
    padding: 1rem;
    background-color: rgba(255,255,255,.3);
    margin: 0 auto;
    margin-top: 5rem;
    font-size: 0;
  }
  .mathine-content>ul{
    width: 1rem;
    height: 1rem;
    position: relative;
  }
  .mathine-content>ul>li{
    width: 100%;
    height: 100%;
    padding: .1rem;
    position: absolute;
  }
  .mathine-content>ul>li>span{
    display: block;
    width: 100%;
    height: 100%;
    border-radius: .5rem;
    background-color: #418dcb;
  }
  .mathine-content>ul>li.a>span{
    background-color: orange;
  }
  .mathine-content>ul>li.b>span{
    background-color: green;
  }
</style>
<template>
  <Wrap :config="wrapConfig">
    <Head>
      <HeadLeft><span class="iconfont icon-fanhui" @click="goBack"></span></HeadLeft>
    </Head>
    <Content>
      <Scroll :config="tabConfig">
        <div class="mathine-content">
          <ul>
            <li v-for="(item,index) in list" :style="posi(item,index)" :class="item.type"><span></span></li>
          </ul>
        </div>
      </Scroll>
    </Content>
  </Wrap>
</template>
<script>
import wrap from '@vuc/wrap';
import {Wrap} from 'vuc-ui';
const {WrapConfig, inputConf} = wrap;
const basearr=new Array(100).fill(0);
basearr.forEach((item,i)=>{
  basearr[i]={
    y:Math.floor(i/10),
    x:i%10,
  }
});
const oriArr=[];
new Array(20).fill(0).forEach((item,i)=>{
  const pushItem=basearr.splice(
    Math.floor(Math.random()*basearr.length),1
  )[0];
  pushItem.type=i<10?"a":"b";
  oriArr.push(pushItem);
});
export default {
  components: {Wrap, ...Wrap.relativeComp},
  name: 'train',
  data(){
    return {
      list:oriArr.map(item=>item),
      oriLen:oriArr.length,
      wrapConfig: new WrapConfig(),
      // 切换 tab 页面的配置
      tabConfig: {derction: "y", bgUrl: "./static/1.jpg"},
    }
  },
  mounted(){this.enter()},
  methods:{
    goBack(){this.$router.go(-1);},
    posi(item,index){return{
      left:`${item.x*100}%`,
      top:`${item.y*100}%`,
      background:index<this.oriLen?`rgba(0,0,0,.5)`:""
    }},
    enter(){
      const next=basearr.splice(Math.floor(Math.random()*basearr.length),1)[0];
      const ks=oriArr.map(item=>{return{
        item:item,
        dis: Math.sqrt( 3 * Math.pow(item.x-next.x,2) + 2 * Math.pow(item.y-next.y,2),2)
      }})
      ks.sort((a,b)=> a.dis > b.dis ? -1 : 1);
      const kss=new Array(this.oriLen/4).fill(1).map((item,i)=>ks[i]);
      next.type=kss.filter(item=>item.item.type==="a").length>kss.filter(item=>item.item.type==="b").length?"a":"b";
      this.list.push(next);
      setTimeout(()=>{ if(basearr.length) this.enter();},100);
    },
  },
  watch:{},
}
</script>

