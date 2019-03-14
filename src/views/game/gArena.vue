<style scoped>
  .inner-wrap{
    padding: .5rem;
    height: 100%;
    background-image: url(http://localhost:8999/game-home-bg.jpg);
    background-size: 120%;
    background-position: top center;
  }

  .inner-wrap li{
    padding: .5rem;
    display: flex;
    border-bottom: 1px dashed rgba(255,255,255,.1);
  }
  .inner-wrap li.active{
    color: #418dcb;
  }
  .inner-wrap li>span{
    flex: 1;
    text-align: center;
  }
  .item-list{
    padding: .5rem;
    font-size: 0;
  }
  .item-wrap{
    display: flex;
    padding-left: 1rem;
    height: 100%;
    color: #fff;
    padding-bottom: 3.5rem;
  }
  .item-list>span{
    background-color: rgba(0,0,0,.3);
    line-height: 1.5rem;
    flex-basis: .7rem;
    display: inline-block;
    width: 50%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .img-wrap{
    position: relative;
    height: 14rem;
    overflow: hidden;
    margin-bottom: .5rem;
  }
  .img-wrap img{
    width: 100%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
</style>
<template>
  <TemWrap :config="wrapConfig">
    <GameSetting slot="leftSlide"></GameSetting>
    <AuthorInfo slot="rightSlide"></AuthorInfo>
    <div slot="header">
      <HeadTitle>竞技场</HeadTitle>
      <HeadLeft><span @click="goBack" class="iconfont icon-fanhui"></span></HeadLeft>
    </div>
    <Content :type="['flex inner-wrap']">
    <div class="item-wrap">
      <Content :type="['flex']">
        <div class="img-wrap"><img v-if="hero" :src="hero.roleImg"/></div>
        <Scroll :config="scrollConfig">
            <ul class="goods">
              <li v-for="item in heros" :class="{active:item.isActive}" @click="chooseHero(item)">
                <span>{{item.name}}</span>
                <span>{{item.length}}</span>
              </li>
            </ul>
          </Scroll>
        </Content>
        <Content :type="['flex']">
          <div class="img-wrap"><img v-if="enemy" :src="enemy.roleImg"/></div>
          <Scroll :config="scrollConfig">
            <ul class="goods">
              <li v-for="item in enemys" :class="{active:item.isActive}" @click="chooseEnemy(item)">
                <span>{{item.name}}</span>
                <span>{{item.length}}</span>
              </li>
            </ul>
          </Scroll>
        </Content>
    </div>
    </Content>
    <div slot="footer" style="margin-top: -3.5rem;">
      <Btns :type="['padding color']"><span @click="showArena">开始战斗</span></Btns>
    </div>
  </TemWrap>
</template>
<script>
import wrap from '@vuc/wrap';
import http from '@vuc/http';
const {WrapConfig, inputConf} = wrap;
export default {
  name: 'home',
  components: wrap,
  mounted(){},
  data(){
    const heros=this.$store.state.game.heros;
    const enemys=this.$store.state.game.enemys;
//  items
    return {
      game:this.$store.state.game,
      wrapConfig:new WrapConfig(),
      scrollConfig:{
        derction:"xy",
        onLeftEnd:()=>this.showSlide("left"),
        onRightEnd:()=>this.showSlide("right"),
      },
      enemys,
      heros,
    }
  },
  computed:{
    hero(){return this.heros.filter(item=>item.isActive)[0]},
    enemy(){return this.enemys.filter(item=>item.isActive)[0]},
  },
  methods:{
    chooseEnemy(enemy){this.enemys.forEach(item=>item.isActive=item===enemy);},
    chooseHero(hero){this.heros.forEach(item=>item.isActive=item===hero);},
    goBack(){this.cRouter.goBack();},
    showSlide(type) {this.wrapConfig.showSlide({type});},
    showArena(){this.wrapConfig.showGameArena({
      hero:this.hero,
      enemy:this.enemy,
    });}
  },
  watch:{
  },
}
</script>
