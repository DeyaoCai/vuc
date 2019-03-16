<template>
  <Wrap :config="wrapConfig">
    <Head slot="header">
      <HeadTitle>蔡德瑶的简历</HeadTitle>
      <HeadLeft><span @click="goBack()" class="iconfont icon-guanyanren"></span></HeadLeft>
    </Head>
      <Scroll :config="scrollConfig">

        <div class="resume-title">
          <div><ScrollToFull  :config="scrollConfig"><div class="resume-title-inner">
            <div>个人资料</div>
            <Scroll :config="scrollConfig1">
              <div>
                <Column v-for="(item, index) in baseInfo.list" :key="'b_'+index"><div>{{item.name}}</div><div><input type="text" readonly="readonly" :value="item.val" @click.stop="copyThis($event)"></div></Column>
              </div>
            </Scroll>
          </div></ScrollToFull></div>
        </div>
        <div class="resume-title">
          <div><ScrollToFull  :config="scrollConfig"><div class="resume-title-inner">
            <div>工作经验</div>
            <Scroll :config="scrollConfig2">
            <div v-for="(item, index) in duty.list" :key="'d_'+index" class="duty-list" @click.stop="">
              <ScrollToFull  :config="scrollConfig2">
                <div class="duty-list-inner">
                  <div>{{item.name}} / {{item.money}}</div>
                  <div>{{item.startTime}} - {{item.endTime}}</div>
                  <ul>
                    <Scroll :config="item.scrollConfig" :height="'100%'">
                    <div v-for="(items, index) in item.products" :key="'p_'+index">
                      <div>{{items.name}}</div>
                      <li v-for="(key, index) in items.desc.split('::')" :key="'id_'+index">{{key}}</li>
                    </div>
                    </Scroll>
                  </ul>
                </div>
              </ScrollToFull>
            </div>
            </Scroll>
          </div></ScrollToFull></div>
        </div>
        <div class="resume-title">
          <div><ScrollToFull  :config="scrollConfig"><div class="resume-title-inner">
            <div>自我评价</div>
            <Scroll :config="scrollConfig3">
              <Column v-for="(item, index) in introduce.list" :key="'i_'+index"><div>{{item.name}}</div><div>{{item.val}}</div></Column>
              <ul>
                <li v-for="(item, index) in introduce.desc.split('::')" :key="'id_'+index">{{item}}</li>
              </ul>
            </Scroll>
          </div></ScrollToFull></div>
        </div>
      </Scroll>
    <Foot slot="footer"></Foot>
  </Wrap>
</template>
<script>
import wrap from '@vuc/wrap';
import {Wrap} from 'vuc-ui';
const {WrapConfig} = wrap;
export default {
  components: {Wrap, ...Wrap.relativeComp},
  name: 'home',
  methods: {
    copyThis(ev) {
      ev.target.select();
      if (document.execCommand("copy")) {
        console.log(`copy success! ${ev.target.value}`)
      }
    },
    goBack () {this.cRouter.goBack();},
  },
  mounted () {},
  data () {
    return {
      wrapConfig: new WrapConfig(),
      scrollConfig: {derction: "y",},
      scrollConfig1: {derction: "y",},
      scrollConfig2: {derction: "y",},
      scrollConfig3: {derction: "y",},
      baseInfo: {
        name: "个人资料",
        list: [
          {name: "性别", val: "男"},
          {name: "毕业学校", val: "南昌大学（211 本科）"},
          {name: "毕业时间", val: "2017-1（延长学制一学期）"},
          {name: "手机号", val: "16621079485"},
          {name: "邮箱", val: "360867514@qq.com"},
        ]
      },
      introduce: {
        list: [
          {name: "工作经验", val: "2年"},
          {name: "期望薪资", val: "16k"},
        ],
        desc: `
        1.熟练掌握js（es6）、html（5）、css(3)。
        2.熟练掌握photoshop，可自行切图
        3.熟悉Html5和css3，掌握基于HTML5的webapp开发及移动端适配。::
        4.熟练原生JavaScript和jquery，能够灵活运用，熟悉JavaScript中的原型链，面向对象，闭包等原理，熟悉JavaScript单线程、异步操作、ajax。::
        5.熟练使用npm包管理工具，了解webpack模块化打包工具。::
        6.熟练使用vue（全家桶（主技术栈）），运用过react、redux(某练习项目使用)，angular(任职中软时，使用的技术栈)。::
        7.熟练移动端布局，对各种设备兼容性调试具有一定经验，对代码bug修复具有一定经验。::
        8.熟悉node.js，能使用node开发简单的命令行工具。::
        9.简单了解electron。::
        10.简单了解数据库。`
      },
      duty: {
        list: [
          {
            scrollConfig: {derction: "y",},
            name: "上海凌程航空票务有限公司/在途科技",
            startTime: "2018-5",
            endTime: "至今",
            money: "12000",
            products: [
              {
                name: "在途app",
                desc: "",
              }, {
                name: "管理服务",
                desc: "",
              },
            ],
          },
          {
            scrollConfig: {derction: "y",},
            name: "中软国际科技服务有限公司",
            startTime: "2017-10",
            endTime: "2018-5",
            money: "8000",
            products: [
              {
                name: "在途app",
                desc: "这是一款为商业出行定制的软件，（和携程等类似但针对用户群体为公司员工），包含机票、火车票、酒店、用车、费控模块。",
              }, {
                name: "管理服务",
                desc: "",
              },
            ],
          },{
            scrollConfig: {derction: "y",},
            name: "深圳四方精创有限公司",
            startTime: "2017-5",
            endTime: "2017-9",
            money: "4000",
            products: [
              {
                name: "中国银行（香港）企业手机银行",
                desc: `1.该项目属于中国银行（香港）针对企业用户使用的手机端产品，包含转账、授权/复核、交易详情/结余、通知、设定、首页、登录等::
                  2.方便企业用户实现对单一账户、多账户的普通转账、电汇、特快转账等功能（比如公司公司之间，公司与员工之间的转账交易）::
                  3.每笔转账可设置相应的授权/复核及通知人员`,
              }, {
                name: "中国银行缤纷生活-跨境专区",
                desc: `该项目是中国银行缤纷生活app中跨境专区部分::
                  该项目包括‘境外用卡提示’、‘实用工具’、‘热门地区’、‘酒店’、‘三步学海淘’，‘活动详情’页面`,
              }, {
                name: "易惠通（中国银行江西）财富通",
                desc: `该项目是易惠通（中国银行江西）app中财富通模块::
                  升级后将原有功能分类为‘贵金属’、‘资讯服务’、‘跨境服务’、‘增值服务’以及其他扩展功能。`,
              }, {
                name: "江西流量银行",
                desc: `江西流量银行是一款银行项目的活动专题web app::
                  该项目采用公司框架 buildpack::
                  该框架用于熟悉公司前端单页面应用框架以及了解公司的代码规范，特别是h5和css3以及jquery的书写规范::
                  通过这个项目学习了很多公司很好的代码风格和一些常用插件的使用，方便以后开发`,
              },
            ],
          }
        ]
      }
    }
  },
}
</script>

<style scoped>
  .resume-title{
    padding: .3rem .6rem;
  }
  .resume-title>div{
    height: 2.5rem;
  }
  .duty-list{
    height: 4rem;
  }
  .duty-list-inner{
    height: 100%;
    display: flex;
    flex-direction: column;
    box-orient: vertical;
    background-color: #418dcb;
    color: #fff;
    border-bottom: .3rem solid #fff;
    padding: .3rem;
  }
  .duty-list-inner>div{
    padding: .3rem;
  }
  .duty-list-inner ul{
    flex: 11 0;
    opacity: 0;
    transform: translateX(100%);
    transition: all .6s .1s;
    background-color: #fff;
    color: #333;
    padding: .3rem;
  }
  .vucScrollFullInner > .duty-list-inner ul{
    opacity: 1;
    transform: translateX(0);
  }

  .resume-title-inner{
    display: flex;
    flex-direction: column;
    box-orient: vertical;
    height: 100%;
    transition: all .6s;
    color: #fff;
    overflow-y: hidden;
    overflow-x: hidden;
    padding: 0;
  }
  .resume-title-inner>div:first-child{
    width: 100%;
    left: 0;
    top: 0;
    height: 2.5rem;
    text-align: center;
    line-height: 2.5rem;
    background-color: #418dcb;
    border-bottom: 1px solid #fff;
    transition: all .6s;
    color: #fff;
  }
  .vucScrollFull .resume-title-inner>div:first-child{
    background-color: #fff;
    z-index: 2;
    color: #333;
    border-bottom: 1px solid #418dcb;
  }
  .vucScrollFull .resume-title-inner{
    background-color: #fff;
    color: #333;
    padding: .6rem;
    overflow-y: scroll;
  }
  .resume-title-inner li{
    padding: .3rem .6rem;
    line-height: 1.6rem;
    opacity: 0;
    transition: all .6s;
    transform: translateX(100%);
    color: #fff;
  }
  .vucScrollFull .resume-title-inner li{
    opacity: 1;
    transform: translateX(0);
    color: #333;
    transition: all .6s .3s;
  }
  input{
    background-color: transparent;
    width: 100%;
  }
</style>
