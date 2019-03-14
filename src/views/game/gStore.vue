<template>
  <TemWrap :config="wrapConfig">
    <div slot="header">
      <HeadTitle>仓库</HeadTitle>
      <HeadLeft><span @click="goBack" class="iconfont icon-fanhui"></span></HeadLeft>
    </div>
    <Content :type="['flex inner-wrap goods-list']">
    <div><Scroll :config="heroConfig" :height="'2rem'"><div class="hero">
      <span
        v-for="item in heros"
        :class="{active:item.isActive}"
        @click="chooseHero(item)"
      >{{item.name}}</span>
    </div></Scroll></div>
    <div class="item-wrap">
      <div class="img-wrap"><img :src="hero.roleImg"/></div>
      <div class="item-list">
        <span v-for="key in heroItems" @click="removeOwner(key)">{{key.name}}</span>
      </div>
    </div>
      <Scroll :config="scrollConfig">
        <ul class="goods">
          <li v-for="item in list" @click="setOwnner(item[0])">
            <span>{{item[0].name}}</span>
            <span>{{item.length}}</span>
          </li>
        </ul>
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
  mounted () {
    http.getHeroList().then(res => {
      res.data.data.forEach((item, index) => {
        item.isActive = !index;
        item.roleImg = "http://47.104.252.208:8999/lolimg/" + item.srcName + "-s.png";
        item.roleHeadImg = "http://47.104.252.208:8999/lolimg/" + item.srcName + "-l.png";
      });
      this.heros = res.data.data;

    }).catch(e => console.log(e));

    this.getList();
  },
  data(){
    const heros = this.$store.state.game.heros;
    const storeHouse = this.$store.state.game.storeHouse;
    return {
      game: this.$store.state.game,
      wrapConfig: new WrapConfig(),
      heroConfig: {
        derction: "x",
        isGetInnerSizeByChild: true,
      },
      scrollConfig: {
        derction: "xy",
      },
      storeHouse,
      heros,
      list: [],
      heroItems: [],
    }
  },
  computed: {
    hero () { return this.heros.filter(item => item.isActive)[0];},
  },
  methods: {
    getList () {
      const ret = {};
      this.storeHouse.filter(item => !item.owner).forEach(item => {
        const id = item.type + "" + item.lv;
        ret[id] || (ret[id] = []);
        ret[id].push(item);
      })
      this.list = Object.keys(ret).map(item => ret[item]);
      this.heroItems = this.storeHouse.filter(key => key.owner === this.hero.name);
    },
    removeOwner (item) {item.owner = ""; this.getList()},
    setOwnner (item) {item.owner = this.hero.name;this.getList()},
    chooseHero (hero) {this.heros.forEach(item => (item.isActive = item === hero));},
    goBack () {this.cRouter.goBack();},
    canShow (item) {return this.storeHouse.filter(key => item.type === key.type && item.lv === key.lv && !item.owner).length;},
    howMuch (item) {return this.storeHouse.filter(key => item.type === key.type && item.lv === key.lv).length;},
    buy (item) {
      this.storeHouse.push(JSON.parse(JSON.stringify(item)));
      this.game.money = this.game.money - item.cost;
    },
    sell (item) {
      const key = this.storeHouse.filter(key => item.type === key.type && item.lv === key.lv)[0];
      if (key) {
        const index = this.storeHouse.indexOf(key);
        this.storeHouse.splice(index, 1);
        this.game.money = this.game.money + item.cost;
      }
    }
  },
  watch: {
    hero () {this.getList();}
  },
}
</script>
<style scoped>
  .inner-wrap{
    padding: .5rem;
    height: 100%;
    background-size: 120%;
    background-position: top center;
  }
  .hero{display: inline;}
  .hero span{
    display: inline-block;
    line-height: 2rem;
    padding: 0 .5rem;
  }
  .hero span.active{
    color: #418dcb;
  }
  .goods-list{
    padding: .5rem;
    font-size: .3rem;
    color: #fff;
  }
  .goods-list li{
    padding: .5rem;
    display: flex;
    border-bottom: 1px dashed rgba(255,255,255,.1);
  }
  .goods-list li>span{
    flex: 1;
    text-align: center;
  }

  .goods{
    margin: 0 1rem;
    background-color: rgba(0,0,0,.3);
  }
  .item-list{
    padding: .5rem;
    font-size: 0;
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
  .item-wrap{
    display: flex;
    padding-left: 1rem;
  }
  .item-wrap>.img-wrap{
    width: 30%;
  }
  .item-wrap>.img-wrap>img{
    width: 100%;
  }
  .item-wrap>.item-list{
    flex: 2;
  }
</style>
