import Time from "./Time.js";

// Time 对象的收集者， 根据一定的需求生产一组满足条件的日期对象
class Timer{
	//12  //31 
	constructor(){}
	setSTime(startTime){
		if(startTime){
			this.startTime = startTime;
			this.sTime = {
				yea: startTime.getFullYear(),
				mon: startTime.getMonth(),
				dat: startTime.getDate(),
				hou: startTime.getHours(),
				min: startTime.getMinutes(),
				sec: startTime.getSeconds(),
			}
		}
	}
	isRun(yea){
		// 根据年份判断是否闰年
		if (yea % 400 === 0) return true;
		if (yea % 100 === 0) return false;
		if (yea % 4 === 0) return true;
		return false;
	}
	daysOfMonth(mon,yea){
		// 根据年月判断当月日期数
		return {0: 31, 1: null, 2: 31, 3: 30, 4: 31, 5: 30, 6: 31, 7: 31, 8: 30, 9: 31, 10: 30, 11: 31}[mon]||
		(this.isRun(yea) ? 29 : 28);
	}
	
	// 供日期组件使用
	getDateArr(yea, mon, len){
		// 根据开始年份和月份 获取渲染一定数量月份的日期数据
		// 当获取月数未定，或者长度为0 时，认为只需要渲染当月
		if(!len) {
			
			// 从字典中查找当月天数，如果没有（不确定）天数，则说明是二月 需要根据是否是闰年进一步判断
			let dateNum = this.daysOfMonth(mon,yea);
			
			// 创建一个长度等于天数的数组（填充的目的是防止数组在forEach遍历时跳过未填充的项，相当于是没有遍历）
			let ret = new Array(dateNum).fill(1);
			
			// 根据序号填充一个自定义时间对象 详情请参考 Time 类
			ret.forEach(
				(item, index) => ret[index] = new Time(new Date(yea, mon, index + 1))
			);
			
			// 当月的信息 ， 取当月第一天作为参考
			const stamp = ret[0].timeStamp;
			
			// 根据当前为周几 ，填充日期数组前n项，以便页面渲染
			const list = new Array(stamp.getDay()).fill({}).concat(ret);
			
			// 返回值 也是一个自定义时间对象
			ret = new Time(stamp);
			
			// 并且他应该包含整个月份的日期
			ret.list = list;
			return ret;
		}
		//多月情况处理 返回一个数组
		return new Array(len).fill(0).map((item, index) => this.getDateArr(yea, mon + index))
	}
	
	
	// 根据开始的数据，创建一个递增的数组
	getArr(start,len){
		return new Array(len).fill(0).map((item,index)=>{
			return {
				num:start+index,
				isActive:false,
			}
		})
	}
	
	getArrs(start,len,type){
		const ret = {};
		// 约定开始时间为Date对象
		// 获取某个数组时， 计算当前数组开始的日期，然后长度-1
		let sm= 0,sd=0;
		if (this.sTime) {
			if(start < this.sTime.yea)
				start = this.sTime.yea;
			else if (start === this.sTime.yea){
				sm = this.sTime.mon;
				sd = this.sTime.dat-1;
			};
		};
		const rets = new Array(len).fill(1).map((item,index) => Timer.getYeaObj(start + index));
		if(sm || sd) {
			const yeaObj = Timer.getYeaObj(start, true)
			if (sm) yeaObj.list = yeaObj.list.slice(sm);
			if (sd) yeaObj.list[0].list = yeaObj.list[0].list.slice(sd);
			rets.splice(0, 1, yeaObj);
		};
		return rets;
	}
	
	// 传入一个时间戳 和 期望数组长度，然后以此返回一个开始日期开始，包含传入长度的时间对象数组
	getTimeArr(len,start){
		let stamp;
		if(start){
			start.constructor === Time && (stamp = start);
			start.constructor === Date && (stamp = new Time(start));
		}
		stamp || (stamp = new Time());
		return new Array(len || 30).fill(0).map((item, index) => {
			return new Time(new Date(stamp.yea, stamp.mon, stamp.dat + index));
		})
	}
}
Timer.data={
	yea:{},
	monArr:{true: null, false: null,},
	datArr:{"28": null, "29": null, "30": null, "31": Timer.prototype.getArr(1,31),},	
}
Timer.getDatArr = (days, useNew) => {
	let ret = Timer.data.datArr[days];
	if (!ret || useNew) ret = Timer.data.datArr[31].slice(0,days);
	return ret;
};
Timer.getMonArr = (isRun, useNew) => {
	let ret = Timer.data.monArr[!!isRun];
	if(!ret || useNew) {	
		ret = Timer.prototype.getArr(0,12);
		ret.forEach(item=>{
			const datLen = Timer.getDaysOfMonthByisRun(item.num, isRun);
			item.list = Timer.getDatArr(datLen, useNew);
		});
		useNew || (Timer.data.monArr[!!isRun] = ret);
	}
	return ret;
};
Timer.getYeaObj = (yea,useNew)=>{
	return {
		num:yea,
		isActive:false,
		list: Timer.getMonArr(Timer.prototype.isRun(yea), useNew),
	}
}
Timer.getDaysOfMonthByisRun = (mon,isRun) => {
	return {0: 31, 1: null, 2: 31, 3: 30, 4: 31, 5: 30, 6: 31, 7: 31, 8: 30, 9: 31, 10: 30, 11: 31}[mon]||
	(isRun ? 29 : 28);
}

export default Timer;