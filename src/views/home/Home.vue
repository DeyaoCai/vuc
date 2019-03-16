<template>
  <Wrap :config="wrapConfig">
    <AuthorInfo slot="leftSlide"></AuthorInfo>
    <div slot="rightSlide">
      <Btns><span @click="loginOut">退出登录</span></Btns>
    </div>
    <Head slot="header">
      <HeadTitle>主页</HeadTitle>
      <HeadLeft><span @click="showSlide('left')" class="iconfont icon-guanyanren"></span></HeadLeft>
      <HeadRight><span @click="showSlide('right')" class="iconfont icon-bianji-"></span></HeadRight>
    </Head>
    <Scroll :config="scrollConfig">
      <div class="scroll-demo">
        <Scroll :config="tabConfig">
          <Scroll :config="bannerConfig" :height="'6rem'">
            <ul class="home-banner">
              <li v-for="(item, index) in banner" :key="index"><img :src="item.src"/></li>
            </ul>
          </Scroll>
          <Column>
            <div class="home-title iconfont icon-fenlei">lol部分原画预览，图片查看器</div>
          </Column>
          <Btns :type="'color padding large'">
            <div @click="goLolYH">yh</div>
            <div @click="goLolYHMin">yhmin</div>
          </Btns>

          <Column>
            <div class="home-title iconfont icon-fenlei">简历</div>
          </Column>
          <Btns :type="'color padding large'">
            <div @click="goResume">简历</div>
          </Btns>
          <Column>
            <div class="home-title iconfont icon-fenlei">测试新页面，开发方便</div>
          </Column>
          <Btns :type="'color padding large'">
            <div @click="goTestnew">testnew</div>
          </Btns>
          <Column>
            <div class="home-title iconfont icon-fenlei">网易云音乐，侵权请通知作者</div>
          </Column>
          <Btns :type="'color padding large'">
            <div @click="goMusic">网易云音乐</div>
          </Btns>
          <Column>
            <div class="home-title iconfont icon-fenlei">瞎玩游戏</div>
          </Column>
          <Btns :type="'color padding large'">
            <div @click="goGame">回合制？</div>
          </Btns>
          <Column>
            <div class="home-title iconfont icon-fenlei">机器学习</div>
          </Column>
          <Btns :type="'color padding large'">
            <div @click="goMathine(0)">k临近算法</div>
          </Btns>
          <Column>
            <div class="home-title iconfont icon-fenlei">组件分类</div>
          </Column>
          <Btns :type="'color padding m-top large'">
            <div @click="goComp(0)">弹窗</div>
            <div @click="goComp(1)">时间</div>
          </Btns>
          <Btns :type="'color padding m-bottom large'">
            <div @click="goComp(2)">按钮</div>
          </Btns>
        </Scroll>
        <Scroll :config="tabConfig">
          <Btns :type="'b-bottom'"><span @click="cRouter.push('compwrap')">wrap</span></Btns>
          <Btns :type="'b-bottom'"><span @click="cRouter.push('compscroll')">scroll</span></Btns>
          <Btns :type="'b-bottom'"><span @click="cRouter.push('compcolumn')">column</span></Btns>
        </Scroll>
      </div>
    </Scroll>
    <Foot slot="footer">
      <Tab :config="scrollConfig"></Tab>
    </Foot>
  </Wrap>
</template>
<script>

import {Wrap} from 'vuc-ui';
import wrap from '@vuc/wrap';
try {
  const fs = window.require("fs");
  console.log(fs);
  const imges = fs.readdirSync("./img");
  console.log(imges);
} catch (e) {
  console.log(`now runing in web env!`)
}
const {WrapConfig} = wrap;
const {AuthorInfo} = wrap;
export default {
  components: {Wrap, ...Wrap.relativeComp, AuthorInfo},
  name: 'home',
  methods: {
    loginOut() {
      sessionStorage.login = "";
      this.cRouter.userRouterList();
      this.cRouter.replace({name: "login"})
    },
    goLolYH() {
      this.cRouter.push({name: "lolyh"});
    },
    goLolYHMin() {
      this.cRouter.push({name: "lolyhmin"});
    },
    goComp(index) {
      this.cRouter.push({name: "comp", query: {index}});
    },
    goMathine(index) {
      this.cRouter.push({name: "mathine", query: {index}});
    },
    goGame() {
      this.cRouter.push({name: "game"});
    },
    goBack() {
      this.cRouter.goBack();
    },
    goResume() {
      this.cRouter.push({name: "resume"});
    },
    goTestnew() {
      this.cRouter.push({name: "testnew"});
    },
    goMusic() {
      this.cRouter.push({name: "musichome"});
    },
    showSlide(type) {
      this.wrapConfig.showSlide({type});
    },
  },
  mounted() {
  },
  data() {
    return {
      banner: [{src: "http://47.104.252.208:3000/static/1.jpg"}, {src: "http://47.104.252.208:3000/static/2.jpg"}, {src: "http://47.104.252.208:3000/static/3.jpg"}],
      wrapConfig: new WrapConfig(),
      scrollConfig: {
        takeOneStepAtATime: true,
        derction: "x",
        itemNum: {x: 2, y: 1},
        index: {x: this.$route.query.index || 0, y: 0},
        tabs: [
          {name: "首页", iconClass: "icon-shouye"},
          {name: "组件", iconClass: "icon-fenlei"}
        ],
        keyPath: "name",
        onLeftEnd: () => this.showSlide("left"),
        onRightEnd: () => this.showSlide("right"),
      },
      bannerConfig: {
        derction: "x",
        itemNum: {x: 3, y: 1},
        index: {x: 0, y: 0},
        takeOneStepAtATime: true,
      },
      tabConfig: {derction: "y"},
    }
  },
  computed: {
    index() {
      return this.scrollConfig.index;
    }
  },
  watch: {
    index() {
      this.cRouter.replace({name: "index", query: {index: this.index.x}})
    }
  },
}
</script>

<style scoped>
  .scroll-demo {
    white-space: nowrap;
    font-size: 0;
    height: 100%;
  }

  .scroll-demo > .vuc-scroll {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 100%;
    border: 1px solid #fff;
    overflow: hidden;
  }

  .home-banner {
    font-size: 0;
    white-space: nowrap;
  }

  .home-banner li {
    width: 100%;
    height: 7.5rem;
    display: inline-block;
    overflow: hidden;
    font-size: 0;
  }

  .home-banner li img {
    width: 100%;
    display: block;
  }
</style>
