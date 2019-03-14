<style scoped>
</style>
<template>
  <TemWrap :config="wrapConfig">
    <GameSetting slot="leftSlide"></GameSetting>
    <AuthorInfo slot="rightSlide"></AuthorInfo>
    <div slot="header">
      <HeadTitle>商店</HeadTitle>
      <HeadLeft><span @click="goBack" class="iconfont icon-fanhui"></span></HeadLeft>
    </div>
    <Content :type="['flex inner-wrap goods-list']">
      <Btns :type="['padding color']"><span>拥有金：{{game.money}}</span></Btns>

      <GameGoodsList :type="'title'"><span>名称</span><span>价格</span><span>拥有</span><span></span><span></span></GameGoodsList>
      <Scroll :config="scrollConfig">
        <GameGoodsList v-for="(item, index) in list" :key="index">
          <span>{{item.name}}</span>
          <span>{{item.cost}}</span>
          <span>{{howMuch(item)}}</span>
          <span @click="buy(item)">购买</span>
          <span @click="sell(item)">卖出</span>
        </GameGoodsList>
      </Scroll>
    </Content>
  </TemWrap>
</template>
<script>
import wrap from '@vuc/wrap';
import http from '@vuc/http';
const {WrapConfig, inputConf} = wrap;
export default {
  components: wrap,
  name: 'home',
  mounted(){},
  methods:{
    goBack(){this.cRouter.goBack();},
    showSlide(type) {this.wrapConfig.showSlide({type});},
    howMuch(item){return this.storeHouse.filter(key=>item.type===key.type&&item.lv===key.lv).length;},
    buy(item){
      this.storeHouse.push(JSON.parse(JSON.stringify(item)));
      this.game.money=this.game.money-item.cost;
    },
    sell(item){
      const key=this.storeHouse.filter(key=>item.type===key.type&&item.lv===key.lv)[0];
      if(key){
        const index=this.storeHouse.indexOf(key);
        this.storeHouse.splice(index,1);
        this.game.money=this.game.money+item.cost;
      }
    }
  },
  data(){
    return {
      game: this.$store.state.game,
      wrapConfig: new WrapConfig(),
      scrollConfig: {
        derction: "xy",
        onLeftEnd: () => this.showSlide("left"),
        onRightEnd: () => this.showSlide("right"),
      },
      storeHouse: this.$store.state.game.storeHouse
    }
  },
  computed: {
    list () {
      return this.$store.state.game.shop//.filter(item=>item.lv===1);
    }
  },
  watch: {

  },
}
</script>
