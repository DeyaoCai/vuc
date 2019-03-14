<template>
  <div class="vuc-page"><div><slot></slot></div></div>
</template>
<script>
  export default {
    name: 'vue-page',
    props:["type"]
  }
</script>
<style scoped>
.vuc-scroll-wrap.full>.vuc-page{
  height: 100%;
}
.vuc-page{
  flex: 1 1 0;
  position: relative;
}
.vuc-page>div{
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  box-orient: vertical;
  flex-direction: column;
}
</style>
