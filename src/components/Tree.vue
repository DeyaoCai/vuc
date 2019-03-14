<template>
  <ul>
    <li v-for="(item, index) in treeData" :key="index" @click.stop="toggle(item)">
      <h1>{{item.name}} <p> {{ item.abstract}}</p></h1>
      <tree :treeData="item.children" v-if="item.children.length" v-show="item.isActive"></tree>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'tree',
  props: ["treeData"],
  methods: {
    toggle(item) {
      item.isActive = !item.isActive
    },
  },
  beforeCreate() {
  }
}
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
    border: 0;
    list-style: none;
  }

  li {
    line-height: 26px;
    white-space: nowrap;
  }

  h1 {
    font-size: 16px;
    color: #333;
    font-weight: normal;
  }

  p {
    font-size: 14px;
    color: #999;
    display: inline;
    padding-left: 4px;
  }

  ul {
    padding-left: 10px;
  }
</style>
