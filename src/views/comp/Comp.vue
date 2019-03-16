<template>
  <Wrap :config="wrapConfig">
    <div slot="leftSlide">65465</div>
    <div slot="rightSlide">65465</div>
    <div slot="header">
      <HeadTitle>组件</HeadTitle>
      <HeadLeft><span @click="goBack()" class="iconfont icon-fanhui"></span></HeadLeft>
      <HeadRight><span @click="showSlide('right')">456</span></HeadRight>
    </div>
    <Content>
      <Scroll :config="scrollConfig">
        <div class="scroll-demo">
          <Scroll :config="tabConfig">
            <ul class="home-func">
              <li @click="showRadio">单选弹窗</li>
              <li @click="showCheck">多选弹窗</li>
              <li @click="showAlert">提示</li>
              <li @click="showConfirm">确认</li>
              <li @click="showLoading">Loading</li>
            </ul>
          </Scroll>
          <Scroll :config="tabConfig">
            <ul class="home-func">
              <li @click="showDataPicker('')">全屏单选时间</li>
              <li @click="showTimePicker">选择日期</li>
            </ul>
          </Scroll>
          <Scroll :config="tabConfig">
            <Btns :type="'m-top v-divide b-top large'"><span disabled="disabled">564</span><span>456</span></Btns>
            <Btns :type="'m-bottom b-top b-bottom'"><span>564</span><span>456</span></Btns>
            <Btns :type="'m-top v-divide b-top b-bottom small'"><span>564</span><span>564</span><span>564</span><span>456</span>
            </Btns>
            <Btns :type="'padding color'"><span>564</span><span>456</span></Btns>
            <Btns :type="'color m-bottom'"><span disabled="disabled">564</span><span>456</span></Btns>
            <Btns :type="'random m-top m-bottom'"><span>564</span><span>456</span></Btns>
          </Scroll>
          <Scroll :config="tabConfig">
            <!--<Inputs v-for="(item,index) in inputList" :config="item" :key="index"/>-->
          </Scroll>
        </div>
      </Scroll>
    </Content>
    <Tab slot="out-footer" :config="scrollConfig"></Tab>
  </Wrap>
</template>
<script>
import wrap from '@vuc/wrap';
import {Wrap} from 'vuc-ui';
const {WrapConfig} = wrap;
export default {
  name: 'home',
  components: {Wrap, ...Wrap.relativeComp},
  methods: {
    goBack () {
      this.$router.go(-1);
    },
    showTimePicker () {
      this.wrapConfig.showTimePicker();
    },
    showSlide (type) {
      this.wrapConfig.showSlide({type});
    },
    showDataPicker () {
      this.wrapConfig.showDatePicker();
    },
    showRadio () {
      this.wrapConfig.showRadio();
    },
    showCheck () {
      this.wrapConfig.showCheck();
    },
    showAlert () {
      this.wrapConfig.showAlert({
        title: "alert标题",
        content: "内容",
      });
    },
    showConfirm () {
      this.wrapConfig.showConfirm({
        title: "confirm标题",
        content: "内容",
      });
    },
    showLoading () {
      this.wrapConfig.showLoading();
    },
    showFilter () {
      this.wrapConfig.showFilter();
    },
  },
  data () {
    return {
      wrapConfig: new WrapConfig(),
      // inputList,
      banner: [{src: "./static/1.jpg"}, {src: "./static/2.jpg"}, {src: "./static/3.jpg"}],
      scrollConfig: {
        derction: "x",
        takeOneStepAtATime: true,
        itemNum: {x: 3, y: 1},
        index: {x: this.$route.query.index, y: 0},
        tabs: [
          {name: "弹窗"},
          {name: "时间"},
          {name: "按钮"},
        ],
        keyPath: "name",
      },
      bannerConfig: {
        derction: "x",
        itemNum: {x: 3, y: 1},
        index: {x: 0, y: 0},
      },
      tabConfig: {
        noMore: false,
        derction: "y",
        loadMore (item, hide) {
          setTimeout(() => {
            hide();
          }, 300)
        },
        reflash (item, hide) {
          setTimeout(() => {
            hide();
          }, 300)
        }
      },
    }
  },
  computed: {
    index () {
      return this.scrollConfig.index;
    }
  },
  watch: {
    index () {
      this.$route.params.index = this.scrollConfig.index;
      this.scrollConfig.setIndex(this.scrollConfig.index);
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

  .home-func li {
    line-height: 2.5rem;
    font-size: .75rem;
    background-color: #fff;
    text-align: center;
    border-bottom: 1px solid #eee;
    text-shadow: 0 0 .125rem #ccc;
  }

  .home-title {
    line-height: 2rem;
    padding: 0 .75rem;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #418dcb;
  }

  .home-title:before {
    font-weight: bold;
    padding-right: .25rem;
    color: #666;
  }

  .ui-classify {
    font-size: 0;
    padding: .5rem .25rem;
    white-space: normal;
    border-bottom: 1px solid #418dcb;
  }

  .ui-classify > li {
    display: inline-block;
    width: 50%;
    padding: .25rem;
    font-size: .75rem;
  }

  .ui-classify > li > div {
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    background-color: #418dcb;
    color: #fff;
    border-radius: .25rem;
  }
</style>
