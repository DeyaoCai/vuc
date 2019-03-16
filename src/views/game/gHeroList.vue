<template>
  <Wrap :config="wrapConfig">
    <GameSetting slot="leftSlide"></GameSetting>
    <AuthorInfo slot="rightSlide"></AuthorInfo>
    <div slot="header">
      <HeadTitle>战场</HeadTitle>
      <HeadLeft><span @click="goBack" class="iconfont icon-fanhui"></span></HeadLeft>
    </div>
    <Content>
      <Scroll :config="scrollConfig">
        <div>
          <GameGoodsList v-for="(item, index) in list" :key="index"><span @click="goEdit(item)">{{item.name}}</span></GameGoodsList>
        </div>
      </Scroll>
      <Btns :type="['padding color']">
        <span @click="goEdit()">新建英雄</span>
      </Btns>
    </Content>
  </Wrap>
</template>
<script>
import wrap from '@vuc/wrap';
import http from '@vuc/http';
import {Wrap} from 'vuc-ui';
const {WrapConfig, GameSetting, AuthorInfo, GameGoodsList} = wrap;
export default {
  components: {Wrap, ...Wrap.relativeComp, GameSetting, AuthorInfo, GameGoodsList},
  name: 'home',
  mounted(){
    http.getHeroList().then(res=>{
      this.list=res.data.data;
    }).catch(e=>console.log(e));
  },
  data(){
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
    goEdit(item){this.cRouter.push({name:"gheroedit",query:{id:item?item.id:""}});}
  },
  watch:{},
}
</script>
