<template>
  <ul class="vuc-radio" @click.stop=""><li
    v-for="item in config.list"
    :class="{active:item.isActive}"
    @click="clickHandel(item)"
    @webkitTransitionEnd="transitionEnd()"
  >{{item.name}}</li></ul>
</template>

<script>
export default {
  name: 'vue-radio',
  props:["config"],
  methods:{
    clickHandel(item){
      if(item.isActive) return this.config.hide();
      this.config.list.forEach(items=>{items.isActive=items===item});
      this.config.onSelect&&this.config.onSelect(item);
    },
    transitionEnd(){
      setTimeout(()=>{this.config.hide();},0)
    }
  }
}
</script>

<style scoped>
  .vuc-radio{}
  .vuc-radio>li{
    line-height: 2.5rem;
    height: 2.5rem;
    padding: 0 .75rem;
    background-color: #fff;
    color: #999;
    transition: all .1s;
  }
  .vuc-radio>li.active{
    color: #333;
  }

</style>
