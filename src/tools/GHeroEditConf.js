// ["id", "name", "hp", "ap", "pow", "mag", "ski", "spe", "def", "res", "luc", "mov", "dutyType", "srcName",];

function KeyMap(arr, scope) {
  const maps = {
    id: () => ({key: "id", hide: true, val: "", name: "id", code: null, inputType: "number"}),
    name: () => ({key: "name", hide: true, val: "", name: "name", code: null}),
    hp: () => ({key: "hp", hide: true, val: "", name: "hp", code: null, inputType: "number"}),
    ap: () => ({key: "ap", hide: true, val: "", name: "hp", code: null, inputType: "number"}),
    pow: () => ({key: "pow", hide: true, val: "", name: "pow", code: null, inputType: "number"}),
    mag: () => ({key: "mag", hide: true, val: "", name: "mag", code: null, inputType: "number"}),
    ski: () => ({key: "ski", hide: true, val: "", name: "ski", code: null, inputType: "number"}),
    spe: () => ({key: "spe", hide: true, val: "", name: "spe", code: null, inputType: "number"}),
    def: () => ({key: "def", hide: true, val: "", name: "def", code: null, inputType: "number"}),
    luc: () => ({key: "luc", hide: true, val: "", name: "luc", code: null, inputType: "number"}),
    res: () => ({key: "res", hide: true, val: "", name: "res", code: null, inputType: "number"}),
    mov: () => ({key: "mov", hide: true, val: "", name: "mov", code: null, inputType: "number"}),
    dutyType: () => ({
      key: "dutyType",
      hide: true,
      val: "",
      name: "dutyType",
      code: null,
      click: () => scope.showRadio()
    }),
    srcName: () => ({
      key: "srcName",
      hide: true,
      val: "",
      name: "srcName",
      code: null,
      click: () => scope.showSlide("right")
    }),
  };
  this.list = arr.map(item => maps[item] && maps[item]()).filter(item => item);
  this.maps = {};
  this.list.forEach(item => (this.maps[item.key] = item));
}

KeyMap.prototype.getVal = function () {
  const maps = {};
  this.list.forEach(item => (maps[item.key] = item.code || item.val));
  return maps;
};
export default KeyMap;
