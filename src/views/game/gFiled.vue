<template>
  <Wrap :config="wrapConfig">
    <GameSetting slot="leftSlide"></GameSetting>
    <AuthorInfo slot="rightSlide"></AuthorInfo>
    <div slot="header">
      <HeadTitle>战场</HeadTitle>
      <HeadLeft><span @click="goBack" class="iconfont icon-fanhui"></span></HeadLeft>
    </div>
    <Content :type="['inner-wrap']">
      <div class="map-wrap" v-if="filed">
        <Scroll :config="scrollConfig" :height="'100%'">
          <ul class="map" :style="{width:filed.width+'rem',height:filed.height+'rem'}">
            <!--地图-->
            <li
              v-for="item in list"
              :class="[{'ls-route':item.showls},item.ls]"
              @click="filed.move(item)"
            ></li>
            <!--英雄-->
            <li
              v-for="item in heros"
              @click="filed.search(item,$event)"
              class="hero"
              :class="heroStyle(item)"
              :style="heroPosi(item)"
              v-if="item.curHp>0"
            >
              <!--攻击-->
              <span v-for="(key, index) in item.attackList" :style="attackPos(key)" @click.stop="attack(key)" :key="index"></span>
            </li>
            <!--敌方-->
            <li
              v-for="(item, index) in enemys"
              :key="index"
              @click="filed.search(item,$event)"
              class="hero"
              :class="heroStyle(item)"
              :style="heroPosi(item)"
              v-if="item.curHp>0"
            >
              <!--攻击-->
              <span v-for="(key, index) in item.attackList" :style="attackPos(key)" @click.stop="attack(key)" :key="index"></span>
            </li>
          </ul>
        </Scroll>
        <btns v-if="selectHero&&selectHero.prevPos">
          <span @click="end">stay</span>
          <span @click="hattack">atk</span>
          <span @click="cancle">cancle</span>
        </btns>
        <btns><span @click="newTurn">newTurn</span></btns>

        <div class="hero-info" v-if="selectHero">
          <div>
            <div>{{selectHero.name}}</div>
            <div>hp:{{selectHero.curHp}}/{{selectHero.hp}}</div>
            <div>exp:{{selectHero.exp}}</div>
          </div>
          <ul>
            <li>ap:{{selectHero.ap}}</li>
            <li>力:{{selectHero.pow}}</li>
            <li>魔:{{selectHero.mag}}</li>
            <li>技:{{selectHero.ski}}</li>
            <li>速:{{selectHero.spe}}</li>
            <li>守:{{selectHero.def}}</li>
            <li>防:{{selectHero.res}}</li>
            <li>运:{{selectHero.luc}}</li>
            <li>移:{{selectHero.mov}}</li>
          </ul>
        </div>
      </div>
    </Content>
    <Foot><btns>

    </btns></Foot>
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
  mounted () {
    // 设置地形限制行动的强度
    const lsMap = {"ls-glass": 1, "ls-forest": 2, "ls-sand": 3, "ls-river": 20}

    http.getMapList().then(res => {
      res.data.data.forEach(item => (item.list = JSON.parse(item.list)));
      const lsConf = res.data.data[3];
      http.getHeroList().then(res => {
        const heros = res.data.data.map(item => {
          item.roleImg = "http://47.104.252.208:8999/lolimg/" + item.srcName.replace("-s", "") + "-s.png";
          item.roleHeadImg = "http://47.104.252.208:8999/lolimg/" + item.srcName.replace("-s", "") + "-l.png";
          item.exp = 300;
          return new wrap.roles.role(item);
        }).slice(0,4);
        this.enemys.forEach(item => {
          item.roleImg = "http://47.104.252.208:8999/lolimg/Classic_MissFortune_Splash-s.png";
          item.roleHeadImg = "http://47.104.252.208:8999/lolimg/Classic_MissFortune_Splash-l.png";
        })
        heros.concat(this.enemys).forEach(item => {
          item.attacking = false;
          item.actioned = false;
          item.attackList = new Array(4).fill(1).map((key,i)=>{
            return {x: [0, 1, 0, -1][i % 4], y: [-1, 0, 1, 0][i % 4]}
          })
        })

        heros[0].pos = {x: 19, y: 19};
        heros[1].pos = {x: 19, y: 20};
        heros[2].pos = {x: 20, y: 19};
        heros[3].pos = {x: 20, y: 20};
        this.heros = heros;
        this.maps = new wrap.maps(lsConf.width, lsConf.height, lsMap).init(lsConf.list);
        this.filed = new wrap.filedProxy(this.maps, heros, this.enemys, this.wrapConfig);
        this.list = this.filed.list;
        this.filed.startAuto("heros");
      }).catch(e => console.log(e));

    }).catch(e => console.log(e));

  },

  data(){
    const wrap = new WrapConfig();
    const enemys = this.$store.state.game.enemys;
    enemys[0].pos = {x: 6, y: 7}
    enemys[1].pos = {x: 7, y: 7}
    enemys[2].pos = {x: 8, y: 7}
    enemys[3].pos = {x: 9, y: 7}
    enemys[4].pos = {x: 10, y: 7}
    enemys[5].pos = {x: 11, y: 7}

    return {
      filed: null,
      list: null,
      heros: null,
      enemys,
      wrapConfig: wrap,
      scrollConfig: {derction: "xy", isGetInnerSizeByChild: true},
    }
  },
  computed: {
    selectHero () {return this.filed ? this.filed.selectedRole: null;}
  },
  methods: {
    attackPos (item) {return {left: `${item.x * 100}%`, top: `${item.y * 100}%`};},
    heroStyle (item) {return {attack: item.attacking, actioned: item.actioned}},
    heroPosi (item) {
      return `
        left: ${item.pos.x}rem;
        top: ${item.pos.y}rem;
        background-image: url(${item.roleHeadImg});
      `
    },
    newTurn () {
      const filed = this.filed;
      filed.newTurn();
    },
    goBack () {this.cRouter.goBack();},
    showSlide (type) {this.wrapConfig.showSlide({type});},
    attack (item) {
      const filed = this.filed;
      filed.attack(item);
    },
    end (item) {
      const filed = this.filed;
      filed.hend();
    },
    cancle () {
      const filed = this.filed;
      filed.hcancle();
    },
    hattack (item) {
      const filed = this.filed;
      filed.hattack(item);
    }
  },
  watch: {},
}
</script>
<style scoped>
  .inner-wrap{
    padding: .5rem;
    padding-top: 5rem;
    height: 100%;
    background-image: url(../../assets/game-home-bg.jpg);
    background-size: 120%;
    background-position: top center;
  }
  .map-wrap{
    height: 12rem;
  }
  .map{
    width: 20rem;
    height: 20rem;
    background-color: #fff;
    font-size: 0;
    white-space: normal;
  }
  .map li{
    display: inline-block;
    width: 1rem;
    height: 1rem;
    text-align: center;
    background-size: 1rem 1rem;
    background-repeat: no-repeat;
  }
  .map li:after{
    content: "";
    box-sizing: border-box;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 1px dashed #fff;
    transition: all .6s;
  }
  .map li.ls-sand{
    background-image: url(../../assets/ls-sand.jpg);
  }
  .map li.ls-glass{
    background-image: url(../../assets/ls-glass.jpg);
  }
  .map li.ls-forest{
    background-image: url(../../assets/ls-forest.jpg);
  }
  .map li.ls-river{
    background-image: url(../../assets/ls-river.jpg);
  }
  .map li.ls-route:after{
    background-color: rgba(0,0,0,.5);
  }
  .map li.ls-attack:after{
    background-color: rgba(191,3,25,.5);
  }
  .hero{
    position: absolute;
    background-color: rgba(255,255,255,.3);
    transition: all .3s;
  }
  .hero span{
    position: absolute;
    background-color: rgba(191,3,25,1);
    width: 100%;
    height: 100%;
    display: none;
  }
  .hero.attack{
    z-index: 2;
  }
  .hero.attack span{
    display: block;
    opacity: .5;
  }
  .hero.actioned:after{
    background-color: rgba(0,0,0,.4);
  }
  .hero .attack{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(191,3,25,.5);
  }
  .hero-info{
    background-color: #fff;
  }
  .hero-info ul{
    font-size: 0;
  }
  .hero-info li{
    font-size: .75rem;
    line-height: 1.2rem;
    display: inline-block;
    width: 25%;
  }
</style>
