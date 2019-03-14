class Role {
  constructor(hero) {
    this.hero = hero;
    this.exp = hero.exp;
    this.init();
  }

  init() {
    const hero = this.hero;
    const duty = dutys[hero.dutyType];
    this.name = hero.name;
    this.caculateLv();
    // 基础属性
    ["hp", "ap", "pow", "mag", "ski", "spe", "def", "res", "luc", "mov"].forEach(item => (this[item] = Math.round((hero[item] + duty[item]) * this.lv)));

    this.curHp = this.hp;
    this.roleImg = hero.roleImg;
    this.roleHeadImg = hero.roleHeadImg;

    this.weapeon = [];
    this.skill = [];
    this.items = [];
    this.commonSkill = [];
    this.injuring = false;
    return this;
  }

  // 这个可以在与玩家交互时重写 // 攻击时减生命，治疗时加生命
  action() {
    this.attack();
  }

  cure() {
    this.partner.recover(this);
  }

  recover(partner) {
    let cure = partner.mag;
    if (this.curHp + cure > this.hp) cure = this.hp - this.curHp;
    this.curHp = this.curHp + cure;
  }

  attack() {
    this.enemy.suffer(this);
  };

  suffer(enemy) {
    this.injuring = true;
    this.injuryValue = null;
    setTimeout(() => (this.injuring = false), 150);
    // （（魔|力）-（防|抗））*会心（1|1.5）*闪避（0|1）*次数（n）
    const isShanbi = (this.luc - enemy.luc) / 10 > Math.random();
    const isBaoji = (enemy.ski - this.ski) / 10 > Math.random();
    const hert = (enemy.pow - this.def) * (isBaoji ? 1.5 : 1) * (isShanbi ? 0 : 1);
    this.injuryValue = {
      val: hert > 0 ? hert : 0,
      isShanbi: isShanbi,
      isBaoji: isBaoji,
    };
    if (isShanbi) return;
    this.curHp = this.curHp - this.injuryValue.val;
  };

  useSkill() {
  }

  // 根据经验算等级
  caculateLv() {
    [100, 210, 331, 464, 610, 771, 948, 1143, 1357, 1593, 1852, 2137, 2451, 2796, 3176, 3594, 4053, 4558, 5114, 5726].some((item, i) => {
      this.lv = i;
      return this.exp < item;
    })
  }
}

/**
   关卡设置：

     在每关：
       创建总战场：
         包含所有地形
         包含所有角色
           初始化角色属性
           移动角色
           角色行动
             治疗|攻击
             待命
             物品// 交换|使用|存库

   伤害计算：

     攻击力：（魔 力）
     防御力：（防 抗）
     闪避：
     命中：
     会心：

     伤害： （（魔|力）-（防|抗））*会心（1|1.5）*闪避（0|1）*次数（n）

     ap 次数
     速 攻击顺序
     力魔 守抗
     运 闪避
     技 暴击

   职业：
     盾兵：
       持盾：可反击，防御随连续未移动的回合数增长，使用时取消盾墙，开盾墙时不可反击。
       盾墙：不可反击，增加20%防御，随等级增长可 可制造多个分身，共享生命值。
       坚毅：生命值低于50%时，提升防御力，每回合回复已损失生命值15%生命；
     弓手：
       连弩：中距离时攻击时，有几率触发连弩，追加一次攻击，追加攻击不触发连弩。
       强弩：增加射程，增加攻击力，增加破甲，只有在未移动回合使用，不可触发连弩。
       格挡：在受到近距离打击时，举弓格挡部分伤害。
     骑兵
       冲锋：随移动距离增加伤害，受地形影响；
       击退：在冲锋时，有几率发动击退效果，几率随移动距离增加，若不可退，造成二次伤害为原伤害的50%。
       一击逃脱：在攻击之后，可继续移动，移动次数为剩余移动次数/2；
     骑射：牺牲弓手的强力攻击，换成高机动性和灵活性，
       伺机：攻击未移动时攻击范围内的地方是，会心几率增加；
       完美逃脱：在攻击之后，可继续移动，不衰减移动次数；
       布衣杀手：对布衣角色造成伤害增加；

     术士
       法术护盾：己方每回合生成/刷新护盾；
       破盾：回合开始时，若上回合的护盾未被消耗完，则治疗周围友方
       春风：放弃护盾生成机会，可远距离为单一友方治疗等量血量，
     剑士
       骁勇：增加地形适应能力，移动力受损减半；
       善战：地形buff增加加倍；
       傲气：士可杀不可辱，生命值低时，属性大幅增加
 */
const dutys = {
  prince: {name: "王子", hp: 18, ap: 14, pow: 8, mag: 6, ski: 10, spe: 10, def: 6, res: 6, luc: 10, mov: 7},
  princess: {name: "公主", hp: 18, ap: 14, pow: 8, mag: 6, ski: 10, spe: 10, def: 6, res: 6, luc: 10, mov: 40},
  thief: {name: "小偷", hp: 16, ap: 16, pow: 6, mag: 0, ski: 10, spe: 10, def: 4, res: 4, luc: 8, mov: 6},
  mauler: {name: "盾兵", hp: 20, ap: 10, pow: 6, mag: 0, ski: 6, spe: 6, def: 8, res: 2, luc: 4, mov: 5},
  cavalry: {name: "骑兵", hp: 18, ap: 12, pow: 8, mag: 0, ski: 8, spe: 8, def: 6, res: 4, luc: 6, mov: 8},
  archer: {name: "弓手", hp: 16, ap: 10, pow: 10, mag: 0, ski: 6, spe: 6, def: 4, res: 4, luc: 6, mov: 5},
  wizard: {name: "法师", hp: 16, ap: 10, pow: 0, mag: 6, ski: 6, spe: 6, def: 4, res: 6, luc: 6, mov: 5},
  swordman: {name: "剑兵", hp: 18, ap: 16, pow: 8, mag: 0, ski: 8, spe: 8, def: 6, res: 4, luc: 6, mov: 6},
};

const heros = {
  liubei: {
    name: "刘备",
    dutyType: "swordman",
    exp: 100,
    hp: 2.5, ap: 2, pow: 1, mag: .1, ski: .3, spe: .3, def: .3, res: .2, luc: .4, mov: 0,
    roleImg: "./guanyu.png",
    roleHeadImg: "./lolimg/Irelia.png",
  },
  guanyu: {
    name: "关羽",
    dutyType: "cavalry",
    exp: 100,
    hp: 2.5, ap: 2, pow: .8, mag: .1, ski: .3, spe: .3, def: .3, res: .2, luc: .4, mov: 0,
    roleImg: "./guanyu.png",
    roleHeadImg: "./lolimg/Irelia.png",
  },
  zhangfei: {
    name: "张飞",
    dutyType: "cavalry",
    exp: 100,
    hp: 2.5, ap: 2, pow: .8, mag: .1, ski: .3, spe: .3, def: .3, res: .2, luc: .4, mov: 0,
    roleImg: "./zhangfei.png",
    roleHeadImg: "./lolimg/Irelia.png",
  },
  zhaoyun: {
    name: "赵云",
    dutyType: "cavalry",
    exp: 100,
    hp: 2.5, ap: 2, pow: .8, mag: .1, ski: .3, spe: .3, def: .3, res: .2, luc: .4, mov: 0,
    roleImg: "./zhaoyun.jpg",
    roleHeadImg: "./lolimg/Irelia.png",
  },
  machao: {
    name: "马超",
    dutyType: "cavalry",
    exp: 100,
    hp: 2.5, ap: 2, pow: .8, mag: .1, ski: .3, spe: .3, def: .3, res: .2, luc: .4, mov: 0,
    roleImg: "./machao.png",
    roleHeadImg: "./lolimg/Irelia.png",
  },
  huangzhong: {
    name: "黄忠",
    dutyType: "cavalry",
    exp: 100,
    hp: 2.5, ap: 2, pow: .8, mag: .1, ski: .3, spe: .3, def: .3, res: .2, luc: .4, mov: 0,
    roleImg: "./huangzhong.png",
    roleHeadImg: "./lolimg/Irelia.png",
  }
};
const heros2 = {
  yueying: {
    name: "黄月英",
    dutyType: "swordman",
    exp: 1000,
    hp: 2.5, ap: 2, pow: 1, mag: .1, ski: .3, spe: .3, def: .3, res: .2, luc: .4, mov: 0,
    roleImg: "./yueying.png",
    roleHeadImg: "./lolimg/Irelia.png",
  },
  yunlu: {
    name: "马云禄",
    dutyType: "cavalry",
    exp: 350,
    hp: 2.5, ap: 2, pow: .8, mag: .1, ski: .3, spe: .3, def: .3, res: .2, luc: .4, mov: 0,
    roleImg: "./yunlu.jpg",
    roleHeadImg: "./lolimg/Ahri.png",
  },
  shangxiang: {
    name: "孙尚香",
    dutyType: "cavalry",
    exp: 350,
    hp: 2.5, ap: 2, pow: .8, mag: .1, ski: .3, spe: .3, def: .3, res: .2, luc: .4, mov: 0,
    roleImg: "./shangxiang.jpg",
    roleHeadImg: "./lolimg/Ashe.png",
  },
  wenji: {
    name: "蔡文姬",
    dutyType: "cavalry",
    exp: 350,
    hp: 2.5, ap: 2, pow: .8, mag: .1, ski: .3, spe: .3, def: .3, res: .2, luc: .4, mov: 0,
    roleImg: "./wenji.jpg",
    roleHeadImg: "./lolimg/MissFortune.png",
  },
};

const liubei = new Role(heros.liubei);
const guanyu = new Role(heros.guanyu);
const zhangfei = new Role(heros.zhangfei);
const zhaoyun = new Role(heros.zhaoyun);
const machao = new Role(heros.machao);
const huangzhong = new Role(heros.huangzhong);

const yueying = new Role(heros2.yueying);
const yunlu = new Role(heros2.yunlu);
const shangxiang = new Role(heros2.shangxiang);
const wenji = new Role(heros2.wenji);

export default {
  hero: [liubei, guanyu, zhangfei, zhaoyun, machao, huangzhong],
  hero2: [yueying, yunlu, shangxiang, wenji],
  dutys,
  Role,
};

/**
 人物属性 = 人物等级 *人物成长 +职业基础；
 */
