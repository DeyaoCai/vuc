<template>
  <div class="vuc-timepicker" @click.stop="">
    <Btns :type="['','']"><span @click="hide">取消</span><span @click="onConfirm">确认</span></Btns>

    <ul class="vuc-timepicker-list">
      <div class="vuc-timepicker-view"></div>
      <li v-show="config.format.search('yea')+1">
        <Scroll :config="yeaConf" :height="'1.5rem'">
          <li v-for="(key,index) in list" :key="`a_${index}`" :class="{active: yeaConf.index.y===index}">{{key.num}}</li>
        </Scroll>
      </li>
      <li v-show="config.format.search('mon')+1">
        <Scroll :config="monConf" :height="'1.5rem'">
          <li v-for="(key,index) in currentYea && currentYea.list" :class="{active: monConf.index.y===index}">
            {{key.num+1}}
          </li>
        </Scroll>
      </li>
      <li v-show="config.format.search('dat')+1"><Scroll :config="datConf" :height="'1.5rem'">
        <li v-for="(key,index) in currentMon && currentMon.list" :class="{active: datConf.index.y===index}">{{key.num}}</li>
      </Scroll></li>
    </ul>
  </div>
</template>

<script>
import Scroll from "../Scroll.vue";
import Btns from "../Btns.vue";
import tools from "../../tools.js";
const {Timer, Time} = tools;
export default {
  components: tools.useComp({Scroll, Btns}),
  name: 'vuc-timepicker',
  mounted () {
    this.inits();
  },
  computed: {},
  data () {
    const today = new Date();
    const timer = new Timer();
    timer.setSTime(this.config.isValidty);
    const list = timer.getArrs(today.getFullYear(), this.config.yearNum);
    return {
      list,
      timer,
      yeaConf: {
        fullHeight: true,
        needShadow: true,
        derction: "y",
        itemNum: {x: 1, y: list.length},
        index: {x: 0, y: 0},
        onTouchEnd: (index, conf) => {
          conf.setIndex(index);
        }
      },
      monConf: {
        fullHeight: true,
        needShadow: true,
        derction: "y",
        itemNum: {x: 1, y: 0},
        index: {x: 0, y: 0},
        onTouchEnd: (index, conf) => {
          conf.setIndex(index);
        }
      },
      datConf: {
        fullHeight: true,
        needShadow: true,
        derction: "y",
        itemNum: {x: 1, y: 0},
        index: {x: 0, y: 0},
        onTouchEnd: (index, conf) => {
          conf.setIndex(index);
        }
      },
    }
  },
  props: ["config"],
  computed: {
    currentYea () {
      return this.list && this.list[this.yeaConf.index.y];
    },
    currentMon () {
      return this.currentYea && this.currentYea.list[this.monConf.index.y];
    },
    currentDat () {
      return this.currentMon && this.currentMon.list[this.datConf.index.y];
    },
  },
  watch: {
    "config.show" () {
      this.inits();
    },
    "config.startYea" () {
      this.inits();
    },
    "config.validityTermStartTime" () {
      this.inits();
    },
    currentYea () {
      this.currentYea && (this.monConf.itemNum.y = this.currentYea.list.length);
      this.monConf.setIndex(this.monConf.index);
      this.datConf.setIndex(this.datConf.index);
    },
    currentMon () {
      this.currentMon && (this.datConf.itemNum.y = this.currentMon.list.length);
      this.datConf.setIndex(this.datConf.index);
    },
  },
  methods: {
    inits () {
      const conf = this.config;
      const today = new Date();
      let startTime = this.config.isValidty;

      let args = [];
      if (startTime) {
        args.push(startTime.getFullYear());
      } else if (conf.startYea) {
        args.push(conf.startYea);
      } else {
        args.push(today.getFullYear());
      }

      args.push(conf.yearNum);

      // 设置开始日期
      this.timer.setSTime(startTime);
      // 获取渲染列表
      this.list = this.timer.getArrs.apply(this.timer, args);
      // 设置可以滚动的高度
      this.yeaConf.itemNum.y = this.list.length;

      let defaultTime = startTime;
      if (defaultTime && this.config.selectedTime && this.config.selectedTime.getTime() > startTime.getTime()) {
        defaultTime = this.config.selectedTime;
      }
      defaultTime || (defaultTime = this.config.selectedTime);
      defaultTime || (defaultTime = today);
      const defTime = {
        yea: defaultTime.getFullYear(),
        mon: defaultTime.getMonth(),
        dat: defaultTime.getDate(),
        hou: defaultTime.getHours(),
        min: defaultTime.getMinutes(),
        sec: defaultTime.getSeconds(),
      }
      // 默认选中今天
      this.list && this.yeaConf.setIndex({x: 0, y: this.list.findIndex(item => item.num === defTime.yea)});
      this.currentYea && this.monConf.setIndex({
        x: 0,
        y: this.currentYea.list.findIndex(item => item.num === defTime.mon)
      });
      this.currentMon && this.datConf.setIndex({
        x: 0,
        y: this.currentMon.list.findIndex(item => item.num === defTime.dat)
      });
    },
    onConfirm () {
      this.config.selectedTime = new Date(
        this.currentYea.num,
        this.currentMon.num,
        this.currentDat.num
      )
      this.config.onConfirm && this.config.onConfirm(new Time(this.config.selectedTime));
      this.hide();
    },
    hide () {
      this.config.show = false;
    },
  },
}
</script>
<style scoped>
  .vuc-timepicker {
    white-space: nowrap;
    font-size: 0;
    background-color: #fff;
  }

  .vuc-timepicker.full {
    white-space: normal;
    flex: 1;
  }

  .vuc-timepicker-list {
    height: 10.5rem;
    line-height: 10.5rem;
    vertical-align: top;
    white-space: normal;
    display: flex;
    overflow: hidden;
    position: relative;
  }

  .vuc-timepicker-list > li {
    position: relative;
    top: 42.85%;
    height: 1.5rem;
    line-height: 1.5rem;
    flex: 1;
    text-align: center;
  }

  .vuc-timepicker-list > li > .vuc-scroll {
    overflow: visible;
  }

  .vuc-timepicker-view {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 1.75rem;
    border-bottom: 1px solid #999;
    border-top: 1px solid #999;
  }

  .vuc-timepicker-list > li > .vuc-scroll li {
    color: #666;
    font-size: .75rem;
  }

  .vuc-timepicker-list > li > .vuc-scroll li.active {
    color: #3c91ca;
  }
</style>
