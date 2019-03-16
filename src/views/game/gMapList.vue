<style scoped>
  .inner-wrap{
    padding: .5rem;
    padding-top: 5rem;
    height: 100%;
    background-image: url(../../assets/game-home-bg.jpg);
    background-size: 120%;
    background-position: top center;
  }
  .map-list li{
    line-height: 2rem;
    background-color: #fff;
    text-align: center;
    margin-bottom: .5rem;
  }
</style>
<template>
  <Wrap :config="wrapConfig">
    <GameSetting slot="leftSlide"></GameSetting>
    <AuthorInfo slot="rightSlide"></AuthorInfo>
    <div slot="header">
      <HeadTitle>战场</HeadTitle>
      <HeadLeft><span @click="goBack" class="iconfont icon-fanhui"></span></HeadLeft>
    </div>
    <Content :type="['inner-wrap','flex']">
      <Scroll :config="scrollConfig">
        <ul class="map-list">
          <li v-for="item in list" @click="goEdit(item)">{{item.name}}</li>
        </ul>
      </Scroll>
      <Btns :type="['padding color']">
        <span @click="goEdit()">新建地图</span>
      </Btns>
    </Content>
  </Wrap>
</template>
<script>
import wrap from '@vuc/wrap';
import http from '@vuc/http';
import {Wrap} from 'vuc-ui';
const {WrapConfig, inputConf, GameSetting, AuthorInfo} = wrap;
export default {
  components: {Wrap, ...Wrap.relativeComp, GameSetting, AuthorInfo},
  name: 'home',
  mounted(){
    http.getMapList().then(res=>{
      res.data.data.forEach(item=>item.list=JSON.parse(item.list))
      this.list=res.data.data;
    }).catch(e=>console.log(e));
  },
  data(){
    const lsConf=[
      // 地形   // 行号  //  列号
      {ls:"ls-forest",y:6,x:[10,11,12,13]},
      {ls:"ls-river",y:7,x:[10,11,12,13]},
      {ls:"ls-sand",y:8,x:[10,13]},
      {ls:"ls-river",y:8,x:[9,14]},
      {ls:"ls-river",y:9,x:[8,13]},
      {ls:"ls-river",y:10,x:[7,13]},
      {ls:"ls-river",y:11,x:[6,]},
      {ls:"ls-sand",y:12,x:[5,6,7,8,9,10,11,12,13,14,15,16,19]},
    ];
    const wrap = new WrapConfig();
    return {
      list:[],

      wrapConfig: wrap,
      scrollConfig: {derction:"xy", isGetInnerSizeByChild:true},
  }
  },
  computed:{},
  methods:{
    goBack(){this.cRouter.goBack();},
    showSlide(type) {this.wrapConfig.showSlide({type});},
    goEdit(item){this.cRouter.push({name:"gmapedit",query:{id:item?item.id:""}});}
  },
  watch:{},
}
</script>
