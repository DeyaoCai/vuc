<template>
  <div class="vuc-laoding">
    <div class="vuc-laoding-inner">
      <span><i></i></span>
      <span><i></i></span>
      <span><i></i></span>
      <span><i></i></span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'vuc-checkbox',
  props:["list"],
  methods:{
    toggle(item){
      item.isActive=!item.isActive
    },
    toggleAll(){
      const isAllActive=this.isAllActive;
      this.list.forEach(item=>item.isActive=!isAllActive);
    },
  },
  computed:{
    isAllActive(){ return this.list.filter(item=>item.isActive).length===this.list.length; }
  },
  beforeCreate(){}
}
</script>
<style scoped>
  .vuc-laoding{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .vuc-laoding-inner{
    box-sizing: border-box;
    position: absolute;
    top: 35%;
    left: 50%;
    height: 2.5rem;
    width: 2.5rem;
    padding: .05rem;
    background-color: #1e3964;
    border: .2rem solid #fff;
    border-radius: 1.25rem;
    font-size: 0;
    animation:  150ms;
    animation-name: loading;
    animation-duration: 1s;
    animation-timing-function: cubic-bezier(0,.1,.4,0);
    animation-iteration-count: infinite;
    transform-origin: 50%;
  }
  .vuc-laoding-inner span{
    background-color: #fff;
    box-sizing: border-box;
    display: inline-block;
    height: 1rem;
    width: 1rem;
    border-left: 0 solid #418dcb;
    border-top: .25rem solid #418dcb;
    border-radius: 1.25rem 0 0 0;
  }
  .vuc-laoding-inner span:nth-child(2){
    transform: rotate(90deg);
  }
  .vuc-laoding-inner span:nth-child(3){
    transform: rotate(-90deg);
  }
  .vuc-laoding-inner span:nth-child(4){
    transform: rotate(180deg);
  }
  @keyframes loading{
    0%{transform: translate(-50%,-50%) rotate(0deg);}
    100%{transform: translate(-50%,-50%) rotate(360deg);}
  }
</style>
