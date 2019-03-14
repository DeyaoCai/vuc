/**
  战场代理

  分为两个团队

    分别为敌我

    敌方自动 我方手动/自动

  查找可以到达的位置 search 系列操作

  点击可以到达的位置 move

  点击操作列表中某项 // 攻击

  弹出攻击画面

  结束

  下一个英雄行动

  行动结束

  search()
  mvoe()

  end()|| -> nextTick
  attack()|| -> showArena();
  cancle()

 */
class filed {
  constructor(map, heros, enemys, wrapConfig) {
    this.map = map;
    this.heros = heros;
    this.heros.forEach(item => (item.roleType = "heros"));
    this.enemys = enemys;
    this.enemys.forEach(item => (item.roleType = "enemys"));
    this.wrapConfig = wrapConfig;
    this.roles = heros.concat(enemys);
    this.selectedRole = null;

    this.list = map.list;
    this.routeList = [];
    this.resultList = [];
    this.attackRangeList = [];

    this.turnType = "heros";
    this.autoList = [];
    this.enemys.forEach(item => (item.actioned = true));
    this.width = map.width;
    this.height = map.height;
  }

  startAuto(type) {
    const heros = this.heros.filter(item => item.curHp > 0);
    const enemys = this.enemys.filter(item => item.curHp > 0);
    this.autoList = type === "heros" ? heros : enemys;
    const sufferList = type === "heros" ? enemys : heros;
    if (!enemys.length) {
      this.wrapConfig.showAlert({
        title: "you win",
        content: "",
      })
    } else if (!heros.length) {
      this.wrapConfig.showAlert({
        title: "you lose",
        content: "",
      })
    } else if (sufferList.length) this.auto();
  };

  auto() {
    const role = this.autoList.shift();
    if (!role) return this.newTurn();
    setTimeout(() => {
      this.search(role);
      setTimeout(() => {
        if (!this.attackRangeList[0]) {
          this.hend();
          this.auto();
        } else {
          this.move(this.attackRangeList[0]);
          setTimeout(() => {
            this.hattack();
            setTimeout(() => {
              const suffer = this.attackRangeList[0].attackList[0];
              const pos = {
                x: suffer.pos.x - this.selectedRole.pos.x,
                y: suffer.pos.y - this.selectedRole.pos.y,
              };
              this.attack(pos, true);
            }, 500);
          }, 500);
        }
      }, 500);
    }, 500);
  };

  move(item) {
    const se = this.selectedRole;
    if (se) {
      if (item.showls) {
        se.prevPos = {x: se.pos.x, y: se.pos.y};
        se.pos = {x: item.pos.x, y: item.pos.y};
      } else {
        this.hcancle();
      }
    }
    this.clearRoute();
  }

  newTurn() {
    const heros = this.heros.filter(item => item.curHp > 0);
    const enemys = this.enemys.filter(item => item.curHp > 0);
    if (!enemys.length) {
      this.wrapConfig.showAlert({
        title: "you win",
        content: "",
      })
    } else if (!heros.length) {
      this.wrapConfig.showAlert({
        title: "you lose",
        content: "",
      })
    }

    if (this.turnType === "heros") {
      this.turnType = "enemys";
      this.startAuto("enemys");
      this.heros.forEach(item => (item.actioned = true));
      this.enemys.forEach(item => (item.actioned = false));
    } else {
      this.turnType = "heros";
      this.enemys.forEach(item => (item.actioned = true));
      this.heros.forEach(item => (item.actioned = false));
    }
  }

  showArena(hero, enemy, isAuto) {
    this.wrapConfig.showGameArena({
      hero: hero,
      enemy: enemy,
      end: (res) => {
        if (res) res.pos = {x: -5, y: -5};
        isAuto && this.auto(hero.roleType);
      }
    });
  }

  attack(item, isAuto) {
    const se = this.selectedRole;
    const suffer = this.roles.filter(keys => keys.pos.x === se.pos.x + item.x && keys.pos.y === se.pos.y + item.y)[0];
    if (!suffer || se.roleType === suffer.roleType) return;
    suffer && this.showArena(se, suffer, isAuto);
    suffer && this.hend();
  }

  // 角色操作 // 待命 攻击 取消 行动结束
  hstay() {
    this.selectedRole && this.hend();
  }

  // 显示可以攻击的位置
  hattack() {
    this.selectedRole && (this.selectedRole.attacking = true);
  }

  // 回退到选择前的状态
  hcancle() {
    const se = this.selectedRole;
    if (se) {
      se.prevPos && (se.pos = se.prevPos);
      se.attacking = false;
      se.prevPos = null;
      this.selectedRole = null;
    }
    this.clearAttackList();
  }

  // 行动结束
  hend() {
    const se = this.selectedRole;
    se.attacking = false;
    se.actioned = true;
    se.prevPos = null;
    this.selectedRole = null;
    this.clearRoute();
    this.clearAttackList();
  }

  // 开始查找
  search(oriItem) {
    if (oriItem.actioned) return;
    if (this.selectedRole === oriItem) {
      return this.move(this.list[oriItem.pos.x + oriItem.pos.y * this.width]);
    } else this.move({});

    this.selectedRole = oriItem;
    const item = this.list[oriItem.pos.x + oriItem.pos.y * this.width];
    // 清除上次搜索后的路径；
    this.clearRoute();

    // 初始化搜索
    item.rest = 10;
    this.resultList.push(item);
    this.startSearch(item);

    // 展示搜索结果 //正常使用
    this.resultList.forEach(item => (item.showls = true));
  };

  startSearch(item) {
    Array.from("urdl", key => item.reached[key] || this.tryDer(item, key));
    const next = this.routeList.shift();
    if (next) this.startSearch(next); // 非展示使用
  };

  // 查找可以攻击的位置
  tryAttackRange(prev, der) {
    // 获取之后的位置
    let y = prev.pos.y;
    let x = prev.pos.x;
    const se = this.selectedRole;
    if (der === "u") y++;
    if (der === "d") y--;
    if (der === "l") x--;
    if (der === "r") x++;
    if (y < 0 || y > this.height - 1 || x < 0 || x > this.width - 1) return;
    // 下一个位置
    const next = this.list[x + y * this.width];
    // 查看是否有敌方角色位于下个位置
    const attackList = this.roles.filter(item =>
      item !== se &&
      item.roleType !== se.roleType &&
      next.pos.x === item.pos.x &&
      next.pos.y === item.pos.y
    );
    // 判断当前位置是否是其他英雄的位置 // 选中英雄是否可以移动到这个位置
    const isAttackPosRolePos = this.roles.some(item =>
      item !== se &&
      item.pos.x === prev.pos.x &&
      item.pos.y === prev.pos.y
    );
    // 如果当前位置可以到达该位置， 并且下个位置有其他英雄 // 则压入可攻击列表
    if (!isAttackPosRolePos && attackList.length && !this.attackRangeList.includes(prev)) {
      prev.attackList = attackList;
      this.attackRangeList.push(prev);
    }
  }

  tryDer(prev, der) { // 查找可以到达的位置
    // 从之前位置向上查找，进入到上面的位置时，说明之前的位置已经查找过其上面的位置了
    prev.reached[der] = true;
    // 获取之后的位置
    let y = prev.pos.y;
    let x = prev.pos.x;
    if (der === "u") y++;
    if (der === "d") y--;
    if (der === "l") x--;
    if (der === "r") x++;
    // 防止越界
    if (y < 0 || y > this.height || x < 0 || x > this.height) return;
    // 下个位置
    const next = this.list[x + y * this.width];
    // 如果存在 该位置 则
    if (next) {
      // 查看剩余步数
      const rest = prev.rest - next.damp;
      // 如果还有剩余步数，
      if (rest >= 0) {
        // 压入结果集；
        if (!this.resultList.includes(next)) {
          this.resultList.push(next);
          Array.from("urdl", key => this.tryAttackRange(next, key))
        }
        // 查找及中没有该项，压入查找集
        if (!this.routeList.includes(next)) this.routeList.push(next);
        // 如果 剩余步数大于之前到这个位置时的步数，则其他方向要重新查找
        if (rest > next.rest) {
          next.rest = rest;
          next.reached = {u: false, r: false, d: false, l: false};
          next.reached[{u: "d", r: "l", l: "r", d: "u"}[der]] = true;
        }
      }
    }
  }

  clearRoute() { // 清除查找到的路径
    // 清除上次搜索后的残留属性；
    this.resultList.forEach(item => {
      item.showls = null;
      item.reached = {u: false, r: false, d: false, l: false};
      item.rest = null;
      item.attack = false;
    });
    this.attacking = false;
    // 清除上次的残留结果
    this.routeList = [];
    this.resultList = [];
  }

  clearAttackList() { // 清除可攻击位置上的攻击列表
    this.attackRangeList.forEach(item => (item.attackList = null));
    this.attackRangeList = [];
  }
}

export default filed;
