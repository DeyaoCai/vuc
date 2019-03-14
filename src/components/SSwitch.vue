<template>
  <div class="s-switch"  :class="{active:conf.isActive}" @click="conf.isActive=!conf.isActive">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'train-title',
  props:["conf"],
  mounted(){},
  computed:{},
}
</script>
<style type="text/css" scoped>
  .s-switch{
    display: inline-block;
    flex: 1;
    padding-right: 1.25rem !important;
    position: relative;
    height: 100%;
  }
  .s-switch:before,
  .s-switch:after{
    font-family: "iconfont" !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 1rem;
    width: 1rem;
    font-size: 1rem;
    text-align: center;
    line-height: 1rem;
    transition: all .3s;
  }
  .s-switch:after{
    content: "\e65f";
    opacity: 1;
  }
  .s-switch.active:after{
    opacity: 0;
  }
  .s-switch:before{
    content: "\E6C4";
    opacity: 0;
    color: #128bed;
  }
  .s-switch.active:before{
    opacity: 1;
  }
</style>
