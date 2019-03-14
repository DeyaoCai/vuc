<template>
  <div class="vuc-header-left"><slot></slot></div>
</template>

<script>
export default {
  name: 'vue-header-title',
  data(){return {}},

}
</script>

<style scoped>
  .vuc-header-left{
    position: absolute;
    top: 0;
    left: 0;
    font-size: 0;
    white-space: nowrap;
  }
  .vuc-header-left span{
    display: inline-block;
    font-size: .75rem;
    width: 2.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    color: #fff;
  }
</style>
