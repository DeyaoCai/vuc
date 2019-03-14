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
    background-color: #fff;
    font-size: 0;
    white-space: normal;
    position: relative;
  }
  .demos li,.map li{
    display: inline-block;
    width: 1rem;
    height: 1rem;
    text-align: center;
    background-size: 1rem 1rem;
    background-repeat: no-repeat;
  }
  .demos li:after,
  .map li:after{
    content: "";
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    height: 100%;
    border: 1px dashed #fff;
    transition: all .6s;
  }
  .map li.active:after{
    background-color: rgba(255,255,255,.3);
  }
  li.ls-sand{
    background-image: url(../../assets/ls-sand.jpg);
  }
  li.ls-glass{
    background-image: url(../../assets/ls-glass.jpg);
  }
  li.ls-forest{
    background-image: url(../../assets/ls-forest.jpg);
  }
  li.ls-river{
    background-image: url(../../assets/ls-river.jpg);
  }
  .demos li{
    opacity: .4;
    margin: .2rem;
    transition: all .3s;
  }
  .demos li.active{
    opacity: 1;
  }
  .demos li.active:after{
    border: 2px dashed #fff;
  }
  .set-size{
    display: flex;
  }
  .set-size input{
    flex: 1;
    width: 20%;
    margin: 0 1rem;
    padding: 0 .6rem;
    line-height: 1.2rem;
    font-size: .6rem;
  }
  .center{
    position: absolute;
    top: 50%;
    left: 50%;
    border: 2px dashed #fff;
    width: .8rem;
    height: .8rem;
    transform: translate(-.4rem,-.4rem);
  }
</style>
<template>
  <TemWrap :config="wrapConfig">
    <GameSetting slot="leftSlide"></GameSetting>
    <AuthorInfo slot="rightSlide"></AuthorInfo>
    <div slot="header">
      <HeadTitle>战场</HeadTitle>
      <HeadLeft><span @click="goBack" class="iconfont icon-fanhui"></span></HeadLeft>
    </div>
    <Content :type="['inner-wrap']">
      <Btns :type="['padding color']"><span @click="prevCanvas">撤销画布</span><span @click="nextCanvas">重做画布</span></Btns>
      <div class="set-size">
      <input type="text" placeholder="name" v-model="canvasName"/>
      <input type="text" placeholder="width" @change="changeSize" v-model="width"/>
      <input type="text" placeholder="height" @change="changeSize" v-model="height"/>
    </div>
      <div class="map-wrap">
        <Scroll :config="scrollConfig" :height="'100%'">
          <ul class="map" :style="{width:width+'rem'}">
            <div class="center"></div>
            <!--地图-->
            <li
              v-for="item in list"
              :class="[item.ls,{active:dots===item}]"
              @click="changeLs(item)"
            ></li>
          </ul>
        </Scroll>

      </div>
      <ul class="demos">
        <li
          v-for="item in lsType"
        :class="[item.ls,{active:item.isActive}]"
        @click="chooseLs(item)"
        ></li>
      </ul>
    </Content>
    <Btns slot="footer" :type="['color']">
      <span @click="saveMap">保存</span>
    </Btns>
  </TemWrap>
</template>
<script>
import wrap from '@vuc/wrap';
import http from '@vuc/http';
const {WrapConfig, inputConf} = wrap;
export default {
  components: wrap,
  name: 'home',
  mounted(){
    this.changeSize();
    const id=this.$route.query.id
    id&&http.getMap({id}).then(res=>{
    res.data.data.forEach(item=>item.list=JSON.parse(item.list))
    const datas=res.data.data[0]
    this.height=datas.height;
    this.width=datas.width;
    this.list=datas.list;
    this.canvasName=datas.name;
    this.id=datas.id;
  }).catch(e=>console.log(e))
  },
  data(){
    const wrap = new WrapConfig();
    return {
      lsType:[
        {ls: "ls-glass", isActive: true},
        {ls: "ls-forest", isActive: false},
        {ls: "ls-sand", isActive: false},
        {ls: "ls-river", isActive: false},
      ],
      id:"",
      width: 20,
      height: 20,
      canvasName:"",
      oriList:[],
      list:[],
      dots:null,
      wrapConfig: wrap,
      scrollConfig: {derction:"xy", isGetInnerSizeByChild:true},
  }
  },
  computed:{
    choosedLs(){return this.lsType.filter(item=>item.isActive)[0].ls},
  },
  methods:{
    goBack(){this.cRouter.goBack();},
    showSlide(type) {this.wrapConfig.showSlide({type});},
    chooseLs(item){
      this.lsType.forEach(items=>items.isActive=items===item);
      this.dots=null;
    },
    evPos(item){
      const index=this.list.indexOf(item);
      return {
        x:index%this.width,
        y:Math.floor(index/this.width),
      }
    },
    changeLs(item){
      // 上次点击 取消了 // 清空点
      // 上次点击 没取消 // 加入点
      //
      // 单词点击
      // 连续点击
      // 不同行
      if(this.dots){ // 如果之前选中位置 // 如果两次相同 则取消选中 // x 或 y 相同 绘制同行或者同列 // 否则相当于普通点击
        if(item!==this.dots) {
          const nwoPos = this.evPos(item);
          const prevPos = this.evPos(this.dots);
          if(nwoPos.x===prevPos.x){
            const x=this.list.indexOf(item)%this.width
            for(let i=Math.min(nwoPos.y,prevPos.y);i<=Math.max(nwoPos.y,prevPos.y);i++){
              this.list[i*this.width+x].ls=this.choosedLs;
            }
          }else if(nwoPos.y===prevPos.y){
            for(let i=Math.min(nwoPos.x,prevPos.x);i<=Math.max(nwoPos.x,prevPos.x);i++){
              this.list[nwoPos.y*this.width+i].ls=this.choosedLs;
            }
          }else{
            item.ls=this.choosedLs;
          }
          this.dots=item;
        }else{ // 两次点击同一个位置 // 取消连击
          this.dots=null;
        };

      }else{
        // 之前没选中任何位置  // 如果是设置地形 ，或者取消地形 // 取消地形默认当前点选中
        if(item.ls===this.choosedLs) item.ls="ls-glass";
        else{ // 如果是添加操作
          item.ls=this.choosedLs;
          this.dots=item;
        }
      }
    },
    changeSize(){
      this.list=new Array(this.width*this.height).fill("ls-glass").map(item=>{return{ls:"ls-glass"}});
      this.oriList.push(this.list);
    },
    prevCanvas(){
      const index=this.oriList.indexOf(this.list)-1;
      this.list=this.oriList[index%this.oriList.length];
    },
    nextCanvas(){
      const index=this.oriList.indexOf(this.list)+1;
      this.list=this.oriList[index%this.oriList.length];
    },
    saveMap(){
      const sentDate={
        id:this.id,
        list:this.list,
        name:this.canvasName,
        width:this.width,
        height:this.height
      }
      if(sentDate.list&&sentDate.name&&sentDate.width&&sentDate.height) http.saveMap(sentDate).then(res=>this.wrapConfig.showConfirm({
        title:"保存成功",
        content:"是否留在本页",
        onCancle:()=>this.goBack(),
        onConfirm:()=>res.data.data.id&&(this.id=res.data.data.id)

      })).catch(e=>console.log(e));
    },
  },
  watch:{},
}
</script>
