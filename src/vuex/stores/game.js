import unit from "cdy-utils"

/*
 物品 类型
 typeCode:
 a剑
 b枪
 c盾
 d书
 e杖
 f弓
 g药
 h种子
 * */

const heros = unit.roles.hero2;
heros.forEach((item, index) => item.isActive = !index);


const enemys = unit.roles.hero;
enemys.forEach((item, index) => item.isActive = !index);

const shop = [
  {name: "铜剑", val: 14, num: 5, type: "a", lv: 2, cost: 300},
  {name: "铜枪", val: 16, num: 45, type: "b", lv: 2, cost: 300},
  {name: "铜盾", val: 16, num: 40, type: "c", lv: 2, cost: 300},
  {name: "铜弓", val: 12, num: 40, type: "d", lv: 2, cost: 300},
  {name: "手稿", val: 16, num: 30, type: "e", lv: 2, cost: 300},
  {name: "铜杖", val: 26, num: 20, type: "f", lv: 2, cost: 300},
  {name: "药剂", val: 30, num: 5, type: "g", lv: 2, cost: 300},

  {name: "铁剑", val: 10, num: 5, type: "a", lv: 1, cost: 100},
  {name: "铁枪", val: 10, num: 45, type: "b", lv: 1, cost: 100},
  {name: "铁盾", val: 12, num: 40, type: "c", lv: 1, cost: 100},
  {name: "铁弓", val: 12, num: 40, type: "d", lv: 1, cost: 100},
  {name: "抄本", val: 10, num: 30, type: "e", lv: 1, cost: 100},
  {name: "木杖", val: 18, num: 20, type: "f", lv: 1, cost: 100},
  {name: "草药", val: 20, num: 5, type: "g", lv: 1, cost: 100},
]
shop.forEach(item => (item.owner = null));
const store = {

  state: {
    game: {
      money: 10000,
      storeHouse: [],
      heros,
      enemys,
      shop,
    },
  },
  mutation: {},
  action: {}
}
export default store;
