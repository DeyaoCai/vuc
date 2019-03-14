<template>
  <div class="vuc-column" :class="getClass(type)">
    <slot></slot>
  </div>
</template>

<script>
/**
  左右布局的一种方案， 左侧原始此村， 右侧填充剩余
  目前实现，大中默认边距，字体大小。后期准备取消，因为耦合严重
 */
import getClass from "../tools/compType.js";
export default {
  name: 'vuc-btn',
  props:["type"],
  methods:{
    getClass(type){return getClass(type);}
  },
}
</script>
<style type="text/css" scoped>
  .vuc-column{
    display: flex;
    padding: .5rem .75rem;
    background-color: #fff;
    line-height: .9rem;
  }
  .vuc-column>*{
    font-size: .65rem;
  }
  .vuc-column.small{
    padding: .3rem .75rem;
  }
  .vuc-column.small>*{
    line-height: .8rem;
    font-size: .6rem
  }
  .vuc-column.large{
    padding: .5rem .75em;
  }
  .vuc-column.large>*{
    line-height: 1rem;
    font-size: .75rem
  }
  .vuc-column>*{
    min-width: 25%;
    color: #333;
    overflow: hidden;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: .5rem;
  }
  .vuc-column>*.space-normal{
    white-space: normal;
    word-break: break-all;
  }
  .vuc-column>*:last-child{
    flex: 1 1 0;
    text-align: right;
    padding-right: 0;
  }
  .vuc-column>*:last-child>input{
    background-color: transparent;
    width: 100%;
    text-align: right;
  }
  .vuc-column>*:first-child{
    color: #666;
    text-align: left;
  }
</style>
