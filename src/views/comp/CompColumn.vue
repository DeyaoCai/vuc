<template>
  <TemWrap :config="wrapConfig">
    <Head>
      <HeadTitle>column</HeadTitle>
      <HeadLeft><span @click="goBack()" class="iconfont icon-fanhui"></span></HeadLeft>
    </Head>
    <Content>
      <Scroll :config="scrollConfig">
        <column :type="'b-top samll'"><div>一栏小号</div></column>
        <column :type="'b-top'"><div>一栏中号</div><div>二栏</div></column>
        <column :type="'b-top large'"><div>一栏大号</div><div>二栏</div><div>三栏</div></column>

        <column :type="'b-top'"><div class="iconfont icon-fenlei">带箭头</div><div class="more"></div></column>
        <column :type="'b-top'"><div>溢出折行</div><div class="space-normal">360727199306130512360727199306130512</div></column>
        <column :type="'b-top'"><div>溢出省略</div><div>360727199306130512360727199306130512</div></column>
        <column :type="'b-top m-bottom'"><div>输入框</div><div><input type="text" placeholder="请输入证件号"/></div></column>
        <column :type="'b-top m-bottom'">
          <div>swicth</div>
          <s-switch :conf="switchConf">654</s-switch></column>
      </Scroll>
    </Content>
    <Foot><Btns><span>这里是底部</span></Btns></Foot>
  </TemWrap>
</template>
<script>
import wrap from '@vuc/wrap';
import http from '@vuc/http';
const {WrapConfig, inputConf} = wrap;
export default {
  name: 'compwrap',
  components: wrap,
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

