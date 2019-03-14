export default function (keyArr, scope, oriDate) {
  const fns = {
    userNmae() {
      return {
        key: "userNmae",
        val: "",
        code: "",
        name: "姓名",
        placeholder: "请输入姓名",
        isMustFill: true,
        noNeedPlaceholder: false,
        icon: "yonghutouxiang",
        showFlag: true,
        onclick() {
        },
        disableReg() {
        },
        submitReg() {
        },
        showReg() {
        },
      }
    },
    password() {
      return {key: "password", val: oriDate.password, code: "", name: "密码", type: "password", icon: "mima"}
    },
    repeatPassword() {
      return {key: "repeatPassword", val: "", code: "", name: "密码", type: "password", icon: "mima"}
    },
    phone() {
      return {key: "phone", icon: "shoujihao", name: "手机号", val: oriDate.phone, isMustFill: true, type: "tel", submitReg: val => !!val}
    },
    mail() {
      return {icon: "youxiang", name: "邮箱", val: "", isMustFill: true}
    },
  };
  const map = {};
  const list = keyArr.map(item => (map[item] = fns[item] && fns[item]()));

  function getVal() {
    const ret = {};
    list.forEach(item => (ret[item.key] = item.code || item.val));
    return ret;
  }

  return {map, list, getVal}
}
