export default {
  timePickerPop: {
    show: false,
    full: false,
    onConfirm(res) {
      console.log(res)
    }
  },
  slidePop: {show: false, type: ""},
  loadingPop: {
    show: false,
    stop: false
  },
  alertPop: {
    show: false,
    title: "alert",
    content: "alert tip",
    onConfirm() {
    }
  },
  confirmPop: {
    type: "confirm",
    show: false,
    title: "alert",
    content: "alert tip",
    onConfirm() {
    }
  },
  radioPop: {
    show: false,
    list: [{name: "最早触发", isActive: false}, {name: "最晚触发", isActive: false}, {name: "最低价格", isActive: false}],
  },
  checkPop: {
    show: false,
    list: [{name: "最早触发", isActive: false}, {name: "最晚触发", isActive: false}, {
      name: "最低价格",
      isActive: false
    }, {name: "最早触发", isActive: false}, {name: "最晚触发", isActive: false}, {name: "最低价格", isActive: false}],
  },

  // 全屏单选
  datePickerPop: {
    full: true,
    renderConf: [2018, 5, 3],
    show: false,
    num: 1,
    time: [],
    onSelect() {
    }
  },
  // 全屏限制单选
  datePickerPop1: {
    full: true,
    renderConf: [2018, 5, 3],
    show: false,
    num: 1,
    time: [],
    start: new Date(2018, 4, 25),
    end: new Date(2018, 5, 15),
    onSelect() {
    }
  },

  // 全屏区间
  datePickerPop2: {
    full: true,
    renderConf: [2018, 5, 3],
    show: false,
    num: 2,
    time: [],
    onSelect() {
    }
  },
  // 全屏限制区间
  datePickerPop3: {
    full: true,
    renderConf: [2018, 5, 3],
    show: false,
    num: 2,
    time: [],
    start: new Date(2018, 4, 25),
    end: new Date(2018, 5, 15),
    onSelect() {
    }
  },

  // 半屏单选
  datePickerPop4: {
    full: false,
    renderConf: [2018, 5, 3],
    show: false,
    num: 1,
    time: [],
    onSelect() {
    }
  },
  // 半屏限制单选
  datePickerPop5: {
    full: false,
    renderConf: [2018, 5, 3],
    show: false,
    num: 1,
    time: [],
    start: new Date(2018, 4, 25),
    end: new Date(2018, 5, 15),
    onSelect() {
    }
  },
  // 半屏区间
  datePickerPop6: {
    full: false,
    renderConf: [2018, 5, 3],
    show: false,
    num: 2,
    time: [],
    onSelect() {
    }
  },
  // 半屏限制区间
  datePickerPop7: {
    full: false,
    renderConf: [2018, 5, 3],
    show: false,
    num: 2,
    time: [],
    start: new Date(2018, 4, 25),
    end: new Date(2018, 5, 15),
    onSelect() {
    }
  },
  filterPop: {
    show: false,
    full: false,
    data: [
      {
        type: "radio",
        withAll: true,
        title: "",
        list: [{name: "", isActive: true}, {name: "", isActive: false}]
      }, {
        type: "radio",
        withAll: true,
        title: "",
        list: [{name: "", isActive: true}, {name: "", isActive: false}]
      }, {
        type: "radio",
        withAll: true,
        title: "",
        list: [{name: "", isActive: true}, {name: "", isActive: false}]
      }
    ],
    oncancle() {
    },
    onConfirm(res) {
      console.log(res)
    },
  },

};
