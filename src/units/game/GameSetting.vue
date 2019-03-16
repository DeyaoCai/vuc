<template>
  <div class="anthor-info">
    <Scroll :config="scrollConf">
      <div class="setting-null"></div>
      <div class="setting-inner">
          <div v-for="item in list">
            <span>{{item.name}}</span>
            <span @click="item.isActive=!item.isActive">{{item.isActive?"开":"关"}}</span>
          </div>
        </div>
        <img :src="footImg"/>
    </Scroll>
  </div>
</template>
<script>
// UI 组件
import {Wrap} from 'vuc-ui';

export default {
  components: {Wrap, ...Wrap.relativeComp},
  name: 'train',
  methods:{

  },
  mounted(){},
  data(){
    return {
      footImg: "",
      list:[
        {name:"音乐",isActive:true},
        {name:"音效",isActive:true},
        {name:"震动",isActive:true},
        {name:"提醒",isActive:true},
      ],
      scrollConf:{derction:"y",bgUrl:"./slide-left-top-img.jpg", bgRate:.6},
    }
  },
  computed:{},
  watch:{},
}
</script>
<style scoped>
  .anthor-info{
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .setting-null{
    height: 12rem;
  }
  .setting-inner{
    background-color: #fff;
    height: 100%;
  }
  .setting-inner>div{
    display: flex;
    margin: 0 1.5rem;
    min-height: 1rem;
    border-bottom: 1px solid #eee;
  }
  .setting-inner>div:last-child{
    border-bottom: 0;
  }
  .setting-inner>div>span{
    display: inline-block;
    padding: 0 .3rem;
    line-height: 2rem;
  }
  .setting-inner>div>*{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .setting-inner>div>*:first-child{
    flex: 1;
    text-align: right;
    position: relative;
  }
  .setting-inner>div>*:first-child:after{
    content: "";
    display: block;
    position: absolute;
    width: 1px;
    height: 40%;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: #eee;
  }
  .setting-inner>div>*:last-child{
    flex: 2;
    text-align: center;
  }
  .setting-inner>div>*:last-child:before{
    content: "<";
    padding-right: .5rem;
  }
  .setting-inner>div>*:last-child:after{
    content: ">";
    padding-left: .5rem;
  }
  img{
    width: 100%;
  }
</style>

