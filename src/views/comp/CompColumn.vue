<template>
  <Wrap :config="wrapConfig">
    <Head>
      <HeadTitle>column</HeadTitle>
      <HeadLeft><span @click="goBack()" class="iconfont icon-fanhui"></span></HeadLeft>
    </Head>
    <Content>
      <Scroll :config="scrollConfig">
        <Column :type="'b-top samll'"><div>一栏小号</div></Column>
        <Column :type="'b-top'"><div>一栏中号</div><div>二栏</div></Column>
        <Column :type="'b-top large'"><div>一栏大号</div><div>二栏</div><div>三栏</div></Column>

        <Column :type="'b-top'"><div class="iconfont icon-fenlei">带箭头</div><div class="more"></div></Column>
        <Column :type="'b-top'"><div>溢出折行</div><div class="space-normal">360727199306130512360727199306130512</div></Column>
        <Column :type="'b-top'"><div>溢出省略</div><div>360727199306130512360727199306130512</div></Column>
        <Column :type="'b-top m-bottom'"><div>输入框</div><div><input type="text" placeholder="请输入证件号"/></div></Column>
        <Column :type="'b-top m-bottom'">
          <div>swicth</div>
          <SSwitch :conf="switchConf">654</SSwitch>
        </Column>
      </Scroll>
    </Content>
    <Foot><Btns><span>这里是底部</span></Btns></Foot>
  </Wrap>
</template>
<script>
import wrap from '@vuc/wrap';
import {Wrap} from 'vuc-ui';
const {WrapConfig, inputConf} = wrap;
export default {
  name: 'compwrap',
  components: {Wrap, ...Wrap.relativeComp},
  data(){
    return {
      switchConf:{isActive: false},
      wrapConfig:new WrapConfig(),
      scrollConfig:{derction:"y"},
    }
  },
  methods:{
    goBack(){this.$router.go(-1);},
  },
  computed:{},
  watch:{},
}
</script>

