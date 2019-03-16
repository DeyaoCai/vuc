<template>
  <div class="vuc-btn" :class="type">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'vuc-btn',
  props:["type"],
  methods:{
  },
  computed:{},
}

</script>
<style type="text/css" scoped>
.vuc-btn{
  display: flex;
  text-align: center;
  padding: .75rem 3rem;
}
.vuc-btn>*{
  flex: 1;
  line-height: 2rem;
  font-size: .7rem;
  color: rgba(255,255,255,.8);
  position: relative;
  background-color: rgba(255,255,255,0);
  transition: all .3s;
}

.vuc-btn>*:active{
  color: rgba(255,255,255,1)
}
.vuc-btn.border>*{
  border: 1px solid rgba(255,255,255,.8);
  margin: 0 .2rem;
}
.vuc-btn.border>*:active{
  background-color: rgba(255,255,255,.3);
}
.vuc-btn.large>*{
  flex: 1;
  line-height: 2.5rem;
  font-size: .75rem;
  position: relative;
}
.vuc-btn.small>*{
  flex: 1;
  line-height: 1.6rem;
  font-size: .6rem;
  position: relative;
}
</style>
