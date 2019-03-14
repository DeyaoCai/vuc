<template>
  <div class="vuc-header-title"><slot></slot></div>
</template>

<script>
export default {
  name: 'vue-header-title',
  data(){return {}},

}
</script>

<style scoped>
  .vuc-header-title{
    padding: 0 2.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: .9rem;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #fff;
    background-color: #418dcb;
    text-shadow: 0 0 2px #1e3964;
  }
</style>
