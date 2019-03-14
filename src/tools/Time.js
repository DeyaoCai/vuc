// 时间对象 // 工厂

class Time{
  // 因为是用于日历组件，所以只考虑 年月日， 期望传入一个原生js的时间戳，（新事件对象将保留原生时间戳，毫秒数，以便对日期的各种计算）
  constructor(stamp){
    // 如果未传入时间戳，则默认为当前时间
    stamp || (stamp = new Date());
    this.yea = stamp.getFullYear();
    this.mon = stamp.getMonth() + 1;
    this.dat = stamp.getDate();
    this.time = stamp.getTime();
    this.timeStamp = stamp;
  }
  former(timeFormer, timeStamp){
    // 如果不想 创建自定义时间对象，也可以使用格式化方法
    const stamp = timeStamp || this.timeStamp;
    const week="日一二三四五六"
    const to00 = this._to00;
    return timeFormer
      .replace("yea", this.yea)
      .replace("mon", to00(this.mon))
      .replace("dat", to00(this.dat))
      .replace("hou", to00(stamp.getHours()))
      .replace("min", to00(stamp.getMinutes()))
      .replace("sec", to00(stamp.getSeconds()))
      .replace("day", week[stamp.getDay()])
  }
  isInSomeDays(timeObj, days){
    // 期望判断传入一个Time对象，返回传入对象是否在传入天数以内
    // 实现判断是否在时间区间内；
    // 根据今天的事件计算出传入天数的Time对象，然后用isBefore
    days||(days=30);
    return !timeObj.isLater(new Time(new Date(this.yea,this.mon-1,this.dat+days)));
  }
  isLater(time,sec){ // 计算时间前后 // 向下取整后计算是否在给定时间之后
    sec||(sec=24*60*60*1000);
    return Math.floor(this.time/sec)>Math.floor(time.time/sec);
  }
  yesterday(){
    return new Time(new Date(this.yea,this.mon-1,this.dat-1));
  }
	tomorrow(){
		return new Time(new Date(this.yea,this.mon-1,this.dat+1));
	}
	// 某天第一秒，来判断是否是同一天
	getFirSecOfDay(stamp){
		const stamps = stamp ? stamp : this.timeStamp;
		return new Date(stamps.getFullYear(),stamps.getMonth(),stamps.getDate()).getTime();
	}
	// 不是某天之前
	isNotPrev(stamp){
		const aim = stamp ? new Date(stamp) : new Date();
		return this.getFirSecOfDay() >= this.getFirSecOfDay(aim);
	}
	// 不是某天之后
	isNotNext(stamp){// end
		const aim = stamp ? new Date(stamp) : new Date();
		return this.getFirSecOfDay() <= this.getFirSecOfDay(aim);
	}
	// 是否为今天
	isToday(){
		return this.getFirSecOfDay() === this.getFirSecOfDay(new Date());
	}
	// 如果愿意，你可以对其进行扩展 //如在某个区间
	isBetween(start, end){
		//如果没有开始和结束时间 则均可以
		if (!(start||end)){ return true; }
		// 如果没有结束时间    则只不要不是某天之前就可以了
		if (!end ) { return this.isNotPrev(start) };
		// 如果没有开始时间    则只不要不是某天之后就可以了
		if (!start ) { return this.isNotNext(end) };
		return this.isNotPrev(start)&&this.isNotNext(end);
	}
	// 格式化辅助方法 ，将小于10的数 转化为 0x 的字符串
	_to00(num){
		return (num>9?"":"0")+num;
	}
}

export default Time;
