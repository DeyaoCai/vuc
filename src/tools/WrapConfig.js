const today = new Date();
/**
 * @show 如果是弹窗，则未展开弹窗， 其余情况大多是无用的（弹窗必须）
 * @hide 如果是弹窗， 则会在弹窗组件初始化后 实现这个方法，用来关闭弹窗， 不建议直接show = false；
 * @direction 如果是弹窗， 则表明弹窗弹出方向
 * @full 如果是弹窗，
 * @showxxxxx 等方法， 除特殊几个外， 均是先判断是否已经关闭弹窗，然后关闭所有其他弹窗，然后拷贝当前的传入对象的的属性到对应的组件配置中；然后开启选择器
 * */
class WrapConfig {
  constructor() {
    this.slidePop = {show: false, type: ""};
    this.loadingPop = {show: false, stop: false, full: true};
    /**
      @title 弹窗标题
     @content 弹窗内容
     */
    this.alertPop = {
      show: false,
      direction: "bottom",
      full: true,
      title: "",
      content: "",
    };
    /**
     @title 弹窗标题
     @content 弹窗内容
     @type confirm 与alert 使用相同组件实现， 故这里如果需要两个按钮则需要一个type = "confirm"
     */
    this.confirmPop = {
      show: false,
      full: true,
      type: "confirm",
      direction: "bottom",
      title: "",
      content: "",
    };
    /**
     @list 待选项
     @ListItem.name 待选项显示的名称
     @ListItem.isActive 待选项选中标识（true 未选中状态）
     */
    this.radioPop = {
      show: false,
      list: [
        {name: "条件一", isActive: false},
        {name: "条件二", isActive: false}
      ],
    };
    /**
     @list 待选项
     @ListItem.name 待选项显示的名称
     @ListItem.isActive 待选项选中标识（true 未选中状态）
     */
    this.checkPop = {
      show: false,
      list: [
        {name: "条件一", isActive: false},
        {name: "条件二", isActive: false}
      ],
    };
    /**
     @show: 展开选择器；(必须)
     @renderConf [时间组件可选的开始年份, 月份， 需要渲染的月份数] 接收数组。 0 1 2  顺序传入；(必须)
     @num 可选的数量；当不为1 时， 将不会自动隐藏并调用回调, 可手动获取@time(可选)
     @start 可选区见的开始日期 （可选）
     @end 可选区间的结束日期（可选）
     @full: 是否全屏；(可选,)
     @selectedTime  可选 // 选中的时间 // 暂时没做回选  存在bug；(可选)
     @isValidty 时间组件可以选的最早的时间；(可选)
     @onSelect 确认回调；(可选)
     @time 已选的值；
     * */
    this.datePickerPop = {
      show: false,
      full: false,
      renderConf: [today.getFullYear(), today.getMonth(), 2],
      num: 1,
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 29),
      onSelect: res => {console.log(res);},
      time: [],
    };
    /**
      @show: 展开选择器；(必须)
     @startYea 时间组件可选的开始年份；(必须)
     @yearNum 需要渲染的年数；(必须)
     @format 要展示的时间 // 目前支持 到  年月日 yea mon dat（可以年月）；(必须)
     @full: 是否全屏；// 暂未实现(可选,)
     @selectedTime  可选 // 选中的时间 // 暂时没做回选  存在bug；(可选)
     @isValidty 时间组件可以选的最早的时间；(可选)
     @onConfirm 确认回调；(可选)
     * */
    this.timePickerPop = {
      show: false,
      full: false,
      format:"yea-mon-dat",
      yearNum: 40,
      startYea: new Date().getFullYear(),
      isValidty: new Date(2019,3,10),
      selectedTime: new Date(2019,4,15),
      onConfirm(res){console.log(res.former("yea-mon-dat"))},
    };
    this.gameArenaPop = {
      show: false,
      full: true,
    }
  }
  // 将 this.上的属性的 show 改为false； 即关闭所有的弹窗；
  hideAll() {
    Object.keys(this).forEach(item => {
      this.hasOwnProperty(item) && (this[item].show = false);
    });
  }

  showTimePicker(conf) {
    if (this.timePickerPop.show) return (this.timePickerPop.show = false);
    this.hideAll();
    conf && Object.keys(conf).forEach(item => (this.timePickerPop[item] = conf[item]));
    this.timePickerPop.show = true;
  }

  showLoading(conf) {
    this.hideAll();
    conf && Object.keys(conf).forEach(item => (this.loadingPop[item] = conf[item]));
    this.loadingPop.show = true;
  }

  showConfirm(conf) {
    if (this.confirmPop.show) return (this.confirmPop.show = false);
    this.hideAll();
    this.alertPop.content = "";
    this.alertPop.title = "";
    conf && Object.keys(conf).forEach(item => (this.confirmPop[item] = conf[item]));
    this.confirmPop.show = true;
  }

  showSlide(conf) {
    if (this.slidePop.show) return (this.slidePop.show = false);
    this.hideAll();
    conf && Object.keys(conf).forEach(item => (this.slidePop[item] = conf[item]));
    this.slidePop.show = true;
  }

  showAlert(conf) {
    if (this.alertPop.show) return (this.alertPop.show = false);
    this.hideAll();
    this.alertPop.content = "";
    this.alertPop.title = "";
    conf && Object.keys(conf).forEach(item => (this.alertPop[item] = conf[item]));
    this.alertPop.show = true;
  }

  showRadio(conf) {
    if (this.radioPop.show) return (this.radioPop.show = false);
    this.hideAll();
    conf && Object.keys(conf).forEach(item => (this.radioPop[item] = conf[item]));
    this.radioPop.show = true;
  }

  showCheck(conf) {
    if (this.checkPop.show) return (this.checkPop.show = false);
    this.hideAll();
    conf && Object.keys(conf).forEach(item => (this.checkPop[item] = conf[item]));
    this.checkPop.show = true;
  }

  showDatePicker(conf) {
    if (this.datePickerPop.show) return (this.datePickerPop.show = false);
    this.hideAll();
    conf && Object.keys(conf).forEach(item => (this.datePickerPop[item] = conf[item]));
    this.datePickerPop.show = true;
  }

  showGameArena(conf) {
    if (this.gameArenaPop.show) return (this.gameArenaPop.show = false);
    this.hideAll();
    conf && Object.keys(conf).forEach(item => (this.gameArenaPop[item] = conf[item]));
    this.gameArenaPop.show = true;
  }
}

export default WrapConfig;
