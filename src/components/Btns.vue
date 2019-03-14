<template>
  <div class="vuc-btn" :class="getClass(type)">
    <slot></slot>
  </div>
</template>
<script>
/**
 按钮容器， 规定了一组在一行显示的按钮组， 影响按钮组slot第一层的元素样式
 @type: 用来加类的属性, 然后btn 根据不同的类来决定使用什么样式
 @v-divide: 按扭间添加一个分割线
 @large: 大一点
 @small: 小一点
 @color: 蓝色按钮
 @random: 白蓝按钮
 @[disabled] 仅用时的样式， 加载按钮上
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
.vuc-btn{
  background-color: #fff;
  display: flex;
  text-align: center;
}
.vuc-btn>*{
  flex: 1;
  line-height: 2.5rem;
  font-size: .75rem;
  position: relative;
}
/*大号*/
.vuc-btn.large>*{
  flex: 1;
  line-height: 3rem;
  font-size: .9rem;
  position: relative;
}
/*小号*/
.vuc-btn.small>*{
  flex: 1;
  line-height: 2rem;
  font-size: .6rem;
  position: relative;
}
/**
  color: 统一使用相同的颜色
  random：除第一个外，其余使用相同的颜色 // 设计是用来显示两个不同颜色的。当使用一个按钮时， 将使用第二种颜色
*/
.vuc-btn.random,
.vuc-btn.color{
  border-top: 0;
}
.vuc-btn.color>*{
  background-color: #418dcb;
  color: #fff;
}
.vuc-btn.random>*{
  background-color: #c0daff;
  color: #fff;
}
.vuc-btn.random>*:last-child{
  background-color: #418dcb;
  color: #fff;
}
/*
  v-divide: 中间会有一条灰色分割线 当只有一个按钮时失效；
*/
.vuc-btn.v-divide>*:before{
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: block;
  width: 1px;
  height: 40%;
  background-color: #ccc;
}
.vuc-btn.v-divide>*:first-child:before{
  display: none;
}
/*支持disabled 时的样式*/
.vuc-btn>*[disabled=disabled]{
  color: #999;
}
.vuc-btn.random>*[disabled=disabled],
.vuc-btn.color>*[disabled=disabled]{
  background-color: #ddd;
  color: #999;
}
</style>
