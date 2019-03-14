<template>
  <temWrap :config="wrapConfig">
    <Head slot="header">
      <HeadLeft><span @click="goBack()" class="iconfont icon-fanhui"></span></HeadLeft>
    </Head>
    <Scroll :config="scrollConf" :full="true">
      <Content>
        <div class="logo">your-logo</div>
        <Tab :config="tabConf" :type="'login'"></Tab>
        <Scroll :config="tabConf">
          <div class="inner-wrap">
            <Scroll :config="innerConf">
              <LoginInputs v-for="(item,i) in loginList.list" :config="item" :key="i"></LoginInputs>
              <LoginBtns><span @click="loginCheck">登录</span></LoginBtns>
            </Scroll>
            <Scroll :config="innerConf">
              <LoginInputs v-for="(item,i) in registerList.list" :config="item" :key="i"></LoginInputs>
              <LoginBtns><span>注册</span></LoginBtns>
            </Scroll>
          </div>
        </Scroll>
        <div class="text"><span>第三方登录</span></div>
        <LoginBtns :type="'border small'"><span>微信</span><span>微博</span><span>QQ</span><span>百度</span></LoginBtns>
      </Content>
    </Scroll>
  </temWrap>
</template>
<script>
import wrap from '@vuc/wrap';
import http from '@vuc/http';
import $music from '@vuc/http/http.js';
console.log($music)
const {WrapConfig, inputConf} = wrap;
export default {
  components: wrap,
  name: 'home',
  data(){
    const loginList = inputConf(["phone","password"], this, {phone: "16621079485", password: "a13789"})
    const registerList = inputConf(["userNmae","password","repeatPassword","phone"], this, {});
    console.log(loginList,registerList)
    return {
      loginList,
      registerList,
      wrapConfig:new WrapConfig(),
      scrollConf:{derction:"y",bgUrl: "./static/login_bg.jpg"},
      innerConf:{derction:"y",},
      tabConf:{
        takeOneStepAtATime:true,
        derction:"x",
        itemNum:{x:2,y:1},
        index:{x:0,y:0},
        tabs:[
          {name:"登录", iconClass:""},
          {name:"注册", iconClass:""}
        ],
        keyPath:"name",
      }
    }
  },
  computed:{
    index(){return this.tabConf.index;}
  },
  watch:{
    index(){
      this.tabConf.setIndex(this.tabConf.index);
    }
  },
  methods:{
    loginCheck () {
      const verify = new wrap.verify(this);
      const loginDate = this.loginList.getVal();
      console.log(loginDate)
      if (verify.on([
        {val: loginDate.phone, title: "请输入手机号",content:""},
        {val: loginDate.password, title: "请输入密码",content:""},
      ]).check()) {
        $music.loginCellphone(loginDate)(res => {
          localStorage.userInfo = JSON.stringify(res);
          this.cRouter.replace({name:"index"})
        });
      };
    },
    check(){
      const verify = new comp.verify(this);
      verify.on(this.loginList().map(item=>{return {
        val: ()=> item.val || item.isActive !== undefined,
        title: item.name + "不能为空",
        content: ""
      }})).check();
    },
    goBack(){this.cRouter.goBack();},
  },
}
</script>

<style scoped>
  .logo{
    height: 6rem;
    line-height: 6rem;
    background-color: rgba(255,255,255,.2);
    text-align: center;
    font-size: 1.5rem;
    color: rgba(255,255,255,.6);
    text-shadow: 2px 3px 5px #465454;
    letter-spacing: 6px;
  }
  .text{
    width: 80%;
    margin: 0 auto;
    color: rgba(255,255,255,.8);
    text-align: center;
    display: flex;
  }
  .text:before,
  .text:after{
    content: "";
    flex: 1;
    display: inline-block;
    border-bottom: 1px solid rgba(255,255,255,.6);
    transform: translateY(-50%);
    margin: 0 .5rem;
  }
  .inner-wrap{

  }
  .inner-wrap{
    white-space: nowrap;
    font-size: 0;
    height: 100%;
    margin: .5rem 0;
  }
  .inner-wrap>.vuc-scroll{
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
