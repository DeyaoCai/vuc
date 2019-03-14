<template>
  <div class="vuc-header-right"><slot></slot></div>
</template>

<script>
export default {
  name: 'vue-header-title',
  data(){return {}},

}
</script>

<style scoped>
  .vuc-header-right{
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0;
    white-space: nowrap;
  }
  .vuc-header-right span{
    display: inline-block;
    font-size: .75rem;
    width: 2.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    color: #fff;
  }
</style>
