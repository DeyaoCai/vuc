<template>
  <Wrap :config="wrapConfig">
    <Head slot="header">
      <HeadTitle>设置</HeadTitle>
    </Head>
      <Scroll :config="scrollConfig">
        <div class="avatar-wrap"><ScrollToFull  :config="scrollConfig">
          <div class="avatar" v-if="userDto">
            <img :src="userDto && userDto.profile && userDto.profile.avatarUrl">
            <div>
              <span>{{userDto && userDto.profile && userDto.profile.nickname}}</span>
              <i>level {{userDto && userDto.level}}</i>
            </div>
            <i>签到</i>
          </div>
        </ScrollToFull></div>
        <Column>
          <div class="home-title iconfont icon-yonghutouxiang"> 用户昵称 </div>
          <div><input type="text" placeholder="464"></div>
        </Column>
        <Column><div class="home-title iconfont icon-dingdan"> 用户签名 </div><div><input type="text"></div></Column>
        <Column :type="'b-top m-bottom'"><div class="home-title iconfont icon-guanbi-"> 性别 </div><div>nan</div></Column>
        <Column><div class="home-title iconfont icon-yanchurili"> 出生日期 </div><div>nan</div></Column>

        <Column :type="'m-top m-bottom'"></Column>
        <Btns :type="'color padding small'"><div class="home-title iconfont icon-shezhi"> 退出登录 </div><div>nan</div></Btns>
      </Scroll>
    <Foot slot="footer"></Foot>
  </Wrap>
</template>
<script>
import wrap from '@vuc/wrap';
import {Wrap} from 'vuc-ui';
import $music from '@vuc/http/http';
const {WrapConfig, inputConf} = wrap;

export default {
  components: {...wrap, Wrap, ...Wrap.relativeComp},
  name: 'musicmy',
  methods:{},
  mounted () {
    const account = this.userInfo.account;
    $music.userDetail({uid: account.id})(res => {
      this.userDto = res;
    })
  },
  data () {
    return {
      userDto: null,
      userInfo: localStorage.userInfo && JSON.parse(localStorage.userInfo) || {},
      banner: [{src: "./static/1.jpg"}, {src: "./static/2.jpg"}, {src: "./static/3.jpg"}],
      wrapConfig: new WrapConfig(),
      scrollConfig: {derction: "y", },
    }
  },
  computed: {},
  watch: {},
}
</script>

<style scoped>
.scroll-demo{
  white-space: nowrap;
  font-size: 0;
  height: 100%;
}
.scroll-demo>.vuc-scroll{
  display: inline-block;
  vertical-align: top;
  width: 100%;
  height: 100%;
  border: 1px solid #fff;
  overflow: hidden;
}
.home-banner{
  font-size: 0;
  white-space: nowrap;
}
.home-banner li{
  width: 100%;
  height: 7.5rem;
  display: inline-block;
  overflow: hidden;
  font-size: 0;
}
.home-banner li img{
  width: 100%;
  display: block;
}
.avatar-wrap{
  height: 3.7rem;
  margin-bottom: .4rem;
  border-bottom: 1px solid #eee;
}
.avatar{
  padding: .6rem;
  display: flex;
  position: relative;
  background-color: rgba(255,255,255,0);
  height: 100%;
  transition: all .6s;
  margin: 0rem;
  border-radius: 0;
  border: 1px solid #eee;
}
.avatar *{
  transition: all .6s;
}
.avatar>img{
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 1.5rem;
  flex: 0 0 0;
  vertical-align: middle;
}
.avatar>div{
  flex: 1 1 0;
  padding: 0 .4rem;
  vertical-align: middle;
}
.avatar>div>span{
  display: block;
  font-size: .65rem;
  padding-top: .2rem;
}
.avatar i{
  display: inline-block;
  padding: 0 .4rem;
  border-radius: .5rem;
  border: 1px solid #ccc;
  color: #aaa;
  font-size: .4rem;

}
.avatar>i{
  position: absolute;
  line-height: 1rem;
  top: 1rem;
  right: 1rem;
}


.vucScrollFull .avatar{
  padding: 2rem;
}

.vucScrollFull .avatar>img{
  width: 8rem;
  height: 8rem;
  border-radius: .2rem;
  flex: 0 0 0;
  vertical-align: middle;
}
.vucScrollFull .avatar>i{
  top: 2rem;
}
.vucScrollFull .avatar>div{
  padding: 0 .4rem;
  vertical-align: middle;
}
</style>
