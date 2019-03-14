<template>
  <div class="vuc-input" :class="{'no-icon': conf.disable || !conf.click}">
    <span>{{conf.name}}</span>
    <span>
      <input :type="conf.inputType || 'text'"
             v-model="conf.val"
             :placeholder="conf.noNeedPlaceholder ? '' : conf.placeholder ? conf.placeholder : (conf.click ? '请选择' : '请输入') + conf.name"
             :disabled="conf.disable"
             :readonly="conf.click"
             @click="handelClick"
      >
      <Icon v-if="!conf.disable&&conf.click" :type="'arrow-right no absolute'" :config="{click: handleIconClick}"/>
    </span>
  </div>
</template>
<script>
import getClass from "../tools/compType.js";
import Icon from './Icon.vue';
export default {
  name: 'vuc-input',
  components: {Icon},
  props:["conf"],
  methods:{
    getClass(type){return getClass(type);},
    handleIconClick (ev) {
      const conf = this.conf;
      if (conf.disable) return;
      conf.click ? this.conf.click(ev) : this.$el.getElementsByTagName("input")[0].focus();
    },
    handelClick (ev) {
      this.conf.click && this.conf.click(ev);
    },
  },
  computed:{},
}

</script>
<style type="text/css" scoped>
  .vuc-input{
    display: flex;
    position: relative;
  }
  .vuc-input>span{
    flex: 1 1 auto;
    padding: 0 .65rem;
    border-bottom: 1px solid #eee;
    line-height: 2.5rem;
  }
  .vuc-input>span:last-child{
    padding-right: 1.6rem;
  }
  .vuc-input>span:last-child,
  .vuc-input>span:last-child>input{
    text-align: right;
    line-height: 2.5rem;
  }
  .vuc-input.no-icon{
    margin-right: -1rem;
  }
  .vuc-input input[disabled="disabled"]{
    color: #999;
    margin-right: -1rem;
  }
</style>
