<style scoped>
  .arean-wrap{
    height: 100%;
    background-color: rgba(255,255,255,.9);
  }
  .arean{
    display: flex;
    position: relative;
    overflow: hidden;
  }
  .arean>*{
    flex: 1;
  }
  .role-img{
    padding: 1rem 0;
    margin: 0 1.5rem;
    transition: all .1s;
    transform: translate(.0rem);
  }
  .role-img>img{
    display: block;
    width: 100%;
  }
  .arean>div:first-child .role-img.active{
    transition: all .3s;
    transform: translate(-.2rem);
  }
  .arean>div:last-child .role-img.active{
    transition: all .3s;
    transform: translate(.2rem);
  }
  .base-info{
    margin: 0 .75rem;
    padding: 0 .75rem;
    line-height: 1.5rem;
    border: 1px dashed #ccc;
  }
  .base-info>li{
    border-bottom: 1px dashed #ccc;
  }
  .message{
    padding: 1.5rem;
  }
  .message>div{
    text-align: center;
    border-bottom: 1px dashed #ccc;
    line-height: 1.5rem;
    height: 1.5rem;
  }
  .over-btn{
    padding: 0 1.5rem;
  }
  .over-btn>div{
    border: 1px solid #418dcb;
    text-align: center;
    line-height: 2rem;
    border-radius: .2rem;
    color: #418dcb;
  }
</style>
<template>
  <div  @click.stop="" class="arean-wrap">
    <div class="arean">
        <div v-if="hero">
          <div class="role-img" :class="{active:hero.injuring}"><img :src="hero.roleImg"></div>
        <Scroll :config="scrollConf">
          <ul class="base-info">
            <li>{{hero.name}}</li>
            <li>hp:{{hero.curHp>0?hero.curHp:0}}/{{hero.hp}}</li>
            <li>ap:{{hero.ap}}</li>
          </ul>
        </Scroll>
      </div>
      <div v-if="enemy">
        <div class="role-img" :class="{active:enemy.injuring}"><img :src="enemy.roleImg"></div>
        <Scroll :config="scrollConf">
          <ul class="base-info">
            <li>{{enemy.name}}</li>
            <li>hp:{{enemy.curHp>0?enemy.curHp:0}}/{{enemy.hp}}</li>
            <li>ap:{{enemy.ap}}</li>
          </ul>
        </Scroll>
      </div>
    </div>
    <div v-if="battle" class="message">
      <div>{{battle.attackMsg}}</div>
      <div>{{battle.injuringMsg}}</div>
      <div>{{battle.dieMsg}}</div>
      <div>{{battle.expMsg}}</div>
    </div>
    <div class="over-btn" v-if="battle&&battle.isOver">
      <div @click="config.hide">结束</div>
    </div>
  </div>
</template>
<script>
// UI 组件
import Scroll from '../../components/Scroll.vue';

class battle{
  constructor(player,enemy,battleEnd){
//    player.init();
//    enemy.init();
    this.battleEnd=battleEnd;
    this.oriCurHp={
      player:player.curHp,
      enemy:enemy.curHp,
    }
    this.player=player;
    this.enemy=enemy;
//    this.player.curHp=player.hp;
//    this.enemy.curHp=enemy.hp;
    this.player.enemy=enemy;
    this.enemy.enemy=player;
    this.actList=[];
    this.attackMsg=null;
    this.injuringMsg=null;
    this.dieMsg=null;
    this.expMsg=null;
    this.isOver=false;
  };
  init(){
    const baseAp=15;
    const playerAtk=new Array(Math.ceil(this.player.ap/baseAp)).fill(this.player);
    const enemyAtk=new Array(Math.ceil(this.enemy.ap/baseAp)).fill(this.enemy);

    this.actList.push(playerAtk.pop());
    const time=this.player.spe-this.enemy.spe;
    const dre=time>0?0:1;
    const times=Math.floor(Math.abs(time/4));
    new Array(times).fill(1).forEach(item=>{
      const pop=[playerAtk,enemyAtk][dre].pop();
      pop&&this.actList.push(pop);
    });
    new Array(Math.max(playerAtk.length,enemyAtk.length)).fill(1).forEach(item=>{
      const pPop=playerAtk.pop();
      const aPop=enemyAtk.pop();
      pPop&&this.actList.push(pPop);
      aPop&&this.actList.push(aPop);
    });
    return this;
  }
  start(){
    if(this.actList.length){
      const actor=this.actList.shift();
      this.attackMsg=`${actor.name} attack`;
      actor.action();
      const enemy=actor.enemy;
      const injury=enemy.injuryValue;
      setTimeout(()=>{
        this.injuringMsg=`${injury.isBaoji?"暴击！":""}${enemy.name}受到${injury.val}伤害`;
        injury.isShanbi&&(this.injuringMsg=`${enemy.name}"闪避！没有收到伤害"`);
        const over=this.isSomeDie()
        if(over){
          this.end(over)
        }else setTimeout(()=>this.start(),500);
      },500)
    }else{
      this.end();
    }
  }
  isSomeDie(){
    return (this.player.curHp<=0?this.player:false)||(this.enemy.curHp<=0?this.enemy:false)
  }
  end(deadman){
    const oriExp=this.player.exp;
    this.player.exp+=Math.round((this.oriCurHp.enemy-this.enemy.curHp)/20*this.enemy.exp*.1);
    if (deadman){this.player===deadman&&(this.enemy.exp+=Math.round(this.player.exp*.5));
    this.dieMsg=`${deadman.name} 死亡!`;}
    this.expMsg=`${this.player.name}经验: ${oriExp} >> ${this.player.exp}`;
    setTimeout(res=>{
      this.isOver=true
      setTimeout(()=>{
        if(this.battleEnd){
          this.battleEnd(deadman);
        }
      },500)
    },500);
  }
}
export default {
  name: 'train',
  props:["config"],
  methods:{},
  mounted(){

  },
  data() {
    return {
      hero:null,
      enemy:null,
      battle:null,
      scrollConf:{derction:"y"},
    }
  },
  computed:{
    show(){return this.config.show},
  },
  watch:{
    show(){
      if(this.show){
        console.log(this.config.hero, this.enemy)
        this.hero=this.config.hero;
        this.enemy=this.config.enemy;
        this.battle=new battle(this.hero,this.enemy,(res)=>{
          this.config.hide()
          setTimeout(()=>{
            this.config.end&&this.config.end(res)
          },500)
        }).init();
        this.battle.start();
      }
    },
  },
  components:{Scroll},
}
</script>
