<template>
  <div class="vuc-checkbox">
    <div class="vuc-checkbox-btn">
      <span @click.stop="toggleAll">{{isAllActive?"不选":"全选"}}</span>
      <span @click="onConfirm">确认</span>
      <span @click="onCancle">取消</span>
    </div>
    <ul>
      <li v-for="item in config.list" :class="{active:item.isActive}" @click.stop="toggle(item)">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'vuc-checkbox',
  props:["config"],
  data(){return {ori:[]}},
  mounted(){
    this.config.list.forEach(item=>item.oriActiveState=item.isActive)
  },
  methods: {
    onConfirm() {this.config.onSelect&&this.config.onSelect(this.config.list)},
    onCancle() {
      this.config.list.forEach(item=>{item.isActive=item.oriActiveState;delete item.oriActiveState;});
      this.config.onCancle&&this.config.onCancle(this.config.list);
    },
    toggle(item) {item.isActive = !item.isActive},
    toggleAll() {
      const isAllActive = this.isAllActive;
      this.config.list.forEach(item => item.isActive = !isAllActive);
    },
  },
  computed:{
    isAllActive(){ return this.config.list.filter(item => item.isActive).length === this.config.list.length; }
  },
}
</script>
<style scoped>
  .vuc-checkbox{
    background-color: #fff;
  }
  .vuc-checkbox ul{
    margin: 0;
    padding: 0;
    border: 0;
  }
  .vuc-checkbox-btn{
    line-height: 2.5rem;
    border-bottom: 1px solid #eee;
    font-size: .32rem;
    color: #333;
    display: flex;
  }
  .vuc-checkbox-btn span{
    flex: 1;
    text-align: center;
  }
  .vuc-checkbox ul li{
    list-style: none;
    line-height: 2.5rem;
    border-bottom: 1px solid #eee;
    font-size: .75rem;
    padding: 0 .75rem;
    color: #999;
  }
  .vuc-checkbox ul li.active{
    color: #333;
  }
</style>
