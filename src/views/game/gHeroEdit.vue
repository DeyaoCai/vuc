<style scoped>
</style>
<template>
  <TemWrap :config="wrapConfig">
    <GameSetting slot="leftSlide"></GameSetting>
    <GameImage slot="rightSlide" :conf="ImageConf"></GameImage>
    <div slot="header">
      <HeadTitle>战场</HeadTitle>
      <HeadLeft><span @click="goBack" class="iconfont icon-fanhui"></span></HeadLeft>
    </div>
    <Content :type="['inner-wrap']">
      <Scroll :config="scrollConfig">
        <VucInput v-for="(item, index) in inputList.list" :conf="item" :key="index" v-if="item.key!=='id'"/>
      </Scroll>
    </Content>
    <btns slot="footer" :type="['color']">
      <span @click="saveHero">保存</span>
    </btns>
  </TemWrap>
</template>
<script>
import wrap from '@vuc/wrap';
import http from '@vuc/http';
const {WrapConfig, inputConf} = wrap;
export default {
  components: wrap,
  name: 'home',
  mounted () {
    const id = this.$route.query.id;
    id && http.getHero({id}).then(res =>
      this.inputList.list.forEach(item => (item.val = res.data.data[0][item.key]))
    ).catch(e => console.log(e))
  },
  data () {
    const dutys = Object.keys(wrap.roles.dutys).map(item => {
      const items = wrap.roles.dutys[item];
      items.enName = item;
      return items;
    })

    console.log(this);
    dutys.forEach(item => (item.isActive = false));
    const info = {};
    const attrList = ["id", "name", "hp", "ap", "pow", "mag", "ski", "spe", "def", "res", "luc", "mov", "dutyType", "srcName",]
    attrList.forEach(item => (info[item] = null));
    const inputList = new wrap.GHeroEditConf(attrList, this);
    return {
      inputList,
      dutys,
      info,
      ImageConf: {
        onSelect: (val) => {this.inputList.maps.srcName.val = val;},
      },
      wrapConfig: new WrapConfig(),
      scrollConfig: {
        onLeftEnd: () => this.showSlide("left"),
        onRightEnd: () => this.showSlide("right"),
        derction: "y",
      },
    }
  },
  computed: {
    list () {return Object.keys(this.info)},
  },
  methods: {
    goBack () {this.cRouter.goBack();},
    showSlide (type) {this.wrapConfig.showSlide({type});},
    showRadio () {
      this.wrapConfig.showRadio({
        list: this.dutys,
        onSelect: item => (this.inputList.maps.dutyType.val = item.enName),
      })
    },
    saveHero () {
      const sentDate = this.inputList.getVal();
      console.log(sentDate);
      if (Object.keys(sentDate).every(item => item === "id" ? true : sentDate[item])) http.saveHero(sentDate).then(res => {
        this.wrapConfig.showConfirm({
          title: "保存成功",
          content: "是否留在本页",
          onCancle: () => this.goBack(),
          onConfirm: () => {
            console.log(res)
            res.data.data.id && (this.id = res.data.data.id)
          }
        })
      }).catch(e => console.log(e));
    },
  },
  watch: {},
}
</script>
