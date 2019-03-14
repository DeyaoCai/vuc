// 根据传入的值的值类型不同 返回一个用空格分割的字符串，类似于vue的class
import types from "../tools/type.js";

export default function getClass(type) {
  if (!type) return "";
  if (types.isString(type)) return type;
  if (types.isNumber(type)) return type + "";
  if (types.isObject(type)) return Object.keys(type).filter(item => type[item]).join(" ");
  if (types.isArray(type)) return type.map(item => getClass(item)).join(" ");
}
