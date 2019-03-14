<style scoped>
  .goods{
    font-size: .65rem;
    color: #333;
    padding: .5rem;
    display: flex;
  }
  .goods.title{
    display: flex;
  }
  .goods>span{
    flex: 1 1 0;
    text-align: center;
  }
  .goods.title{
    border-bottom: 1px solid #eee;
  }
</style>
<template>
    <li class="goods" :class="type"><slot/></li>
</template>
<script>

export default {
  name: 'gamegoodslist',
  props: ["type"],
}
</script>
