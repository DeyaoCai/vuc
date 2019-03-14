<template>
  <div class="vuc-confirm">
    <div class="vuc-confirm-title">{{config.title}}</div>
    <div class="vuc-confirm-content">{{config.content}}</div>
    <Btns :type="['b-top']"><span @click="onCancle" v-show="config.type==='confirm'">取消</span><span @click="onConfirm($event)">确认</span></Btns>
  </div>
</template>

<script>
import Btns from "../Btns.vue"
export default {
  name: 'vuc-checkbox',
  data() {return {type: ""}},
  props:["config"],
  methods:{
    onConfirm(ev) {
      this.config.onConfirm && this.config.onConfirm();
    },
    onCancle(){
      this.config.onCancle && this.config.onCancle();
    },
  },
  components:{Btns},
}
</script>
<style scoped>
  *{
    box-sizing: border-box;
    padding: 0;
    border: 0;
    margin: 0;
  }
  .vuc-confirm{
    position: absolute;
    top: 25%;
    width: 70%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    padding: 0;
    border-radius: .25rem;
    overflow: hidden;
  }
  .vuc-confirm-title{
    line-height: 2.5rem;
    font-size: .8rem;
    padding: 0 .75rem;
    text-align: center;
  }
  .vuc-confirm-content{
    line-height: 1.25rem;
    font-size: .7rem;
    padding: .375rem 1rem;
    color: #999;
    width: 100%;
    word-break: break-all;
    max-height: 4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: center;
  }
</style>
