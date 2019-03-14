<style scoped>
  .anthor-info{
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .author-info-null{
    height: 12rem;
  }
  .author-info-inner{
    background-color: #fff;
    height: 100%;
  }
  .author-info-inner>div{
    display: flex;
    margin: 0 1.5rem;
    min-height: 1rem;
    border-bottom: 1px solid #eee;
  }
  .author-info-inner>div:last-child{
    border-bottom: 0;
  }
  .author-info-inner>div>span{
    display: inline-block;
    padding: 0 .3rem;
    line-height: 2rem;
  }
  .author-info-inner>div>*{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .author-info-inner>div>*:first-child{
    flex: 1;
    text-align: right;
    position: relative;
  }
  .author-info-inner>div>*:first-child:after{
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
  .author-info-inner>div>*:last-child:after{
    content: "";
    display: none;
  }
  .author-info-inner>div>*:last-child{
    flex: 2;
    text-align: left;
  }
  .author-info-inner>div>*:only-child{
    text-align: center;
  }
  img{
    width: 100%;
    border-top: 1rem solid #fff;
  }
</style>
<template>
  <div class="anthor-info">
    <Scroll :config="scrollConf" :height="'100%'">
      <div class="author-info-null"></div>
      <div class="author-info-inner">
          <div><span>作者</span><span>蔡德瑶</span></div>
          <div><span>职业</span><span>前端开发</span></div>
          <div><span>毕业</span><span>2017-1</span></div>
          <div><span>学校</span><span>南昌大学</span></div>
          <div><span>学历</span><span>本科</span></div>
          <div><span>材料成型及控制工程</span></div>
          <div><span></span></div>

          <div><span>360867514@qq.com</span></div>
          <div><span>18179085273</span></div>
          <div><span>https://github.com/</span></div>
        </div>
        <img :src="footImg"/>
    </Scroll>
  </div>
</template>
<script>
// UI 组件
import comps from '@vuc/comps';

export default {
  name: 'train',
  methods:{

  },
  mounted(){},
  data(){
    return {
      scrollConf:{derction:"y", bgUrl:"./static/slide-left-top-img.jpg", bgRate:.6},
      footImg: "",
    }
  },
  computed:{},
  watch:{},
  components: comps,
}
</script>
