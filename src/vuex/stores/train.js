import {Time} from "cdy-utils";


const store = {
  state:{
    train:{
      go:{
        city:{name:localStorage.trainSearchHistort?JSON.parse(localStorage.trainSearchHistort)[0][0]:""},
        stations:[],
        timeRanges:[
          {type:1,name: "00:00 - 06:00",isActive:false},
          {type:2,name: "06:00 - 12:00",isActive:false},
          {type:3,name: "12:00 - 18:00",isActive:false},
          {type:4,name: "18:00 - 24:00",isActive:false},
        ]
      },
      to:{
        city:{name:localStorage.trainSearchHistort?JSON.parse(localStorage.trainSearchHistort)[0][1]:""},
        stations:[],
        timeRanges:[
          {type:1,name: "00:00 - 06:00",isActive:false},
          {type:2,name: "06:00 - 12:00",isActive:false},
          {type:3,name: "12:00 - 18:00",isActive:false},
          {type:4,name: "18:00 - 24:00",isActive:false},
        ]
      },
      time:[new Time()],
      transType:[
//        {type:0,name:"全部车型",isActive:true},
        {type:1,name:"城际、高铁、动车（G/D/C）",isActive:false},
        {type:2,name:"特快、直达（T/Z）",isActive:false},
        {type:3,name:"其他车型",isActive:false}
      ],
      seatTypes:[
        {type:"BUSINESSSEAT",name:"商务座",isActive:false},
        {type:"SUPERSEAT",name:"特等座",isActive:false},
        {type:"FIRSTCLASSSEAT",name:"一等座",isActive:false},
        {type:"SECONDCLASSSEAT",name:"二等座",isActive:false},
        {type:"HIGHGRADESOFTBERTH",name:"高级软卧",isActive:false},
        {type:"SOFTSLEEPER",name:"软卧",isActive:false},
        {type:"HARDSLEEPER",name:"硬卧",isActive:false},
        {type:"SOFTSEAT",name:"软座",isActive:false},
        {type:"HARDSEAT",name:"硬座",isActive:false},
        {type:"NOSEAT",name:"无座",isActive:false},
        {type:"OTHERS",name:"其他",isActive:false}
      ],
      isFilter:true,
    }
  },
  mutation:{
    setTrainStations(state,data){
      if(!data) return;
      data.go&&(state.train.go.stations=data.go);
      data.to&&(state.train.to.stations=data.to);
    },
    setTrainTime(state,time){
      time&&(state.train.time=time)
    },
  },
  action:{}
}
export default store;
//fromCity  String  Y    /* 出发城市 */
//toCity  String  Y    /* 到达城市 */
//travelTime  String  Y    /* 出发时间 */
//transType  Integer  N  0  /** * 根据车型类型进行过滤： * * <pre> * 0 全部车型 * 1 城际、高铁、动车（G/D/C） * 2 特快、直达（T/Z） * 3 其他车型 * </pre> */
//sortNum  Integer  N  1  /*火车票列表排序数： 1 最早出发， 2 最晚出发， 3 耗时最短*/
//seatTypes  String  N  ""  /** * 根据座位类型进行筛选： * * <pre> * "" : 不限 * 多个座位类型以“,”分割 * </pre> * * @return */ BUSINESSSEAT("商务座"), SUPERSEAT("特等座"), FIRSTCLASSSEAT("一等座"), SECONDCLASSSEAT("二等座"), HIGHGRADESOFTBERTH("高级软卧"), SOFTSLEEPER("软卧"), HARDSLEEPER("硬卧"), SOFTSEAT("软座"), HARDSEAT("硬座"), NOSEAT("无座"), OTHERS("其他");
//fromStations  String  N  ""  /** * 根据出发车站进行筛选 * * <pre> * "" : 不限 * 多个车站以“,”分割 * </pre> */
//toStations  String  N  ""  /** * 根据到达车站进行筛选 * * <pre> * "" : 不限 * 多个车站以“,”分割 * </pre> */
//fromTimeRanges  String  N  ""  /** * 根据出发时间段进行过滤 * * <pre> * "" : 不限 * 1 : （00:00 - 06:00） * 2 : （06:00 - 12:00） * 3 : （12:00 - 18:00） * 4 : （18:00 - 24:00） * 多个以“,”分割 * </pre> */
//toTimeRanges  String  N  ""  /** * 根据到达时间段进行过滤 * * <pre> * "" : 不限 * 1 : （00:00 - 06:00） * 2 : （06:00 - 12:00） * 3 : （12:00 - 18:00） * 4 : （18:00 - 24:00） * 多个以“,”分割 * </pre> */
//isFilter  Integer  N  1  是否根据差标过滤,默认过滤（0不过滤）
