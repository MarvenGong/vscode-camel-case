const fs = require('fs');
const path = require('path');
/**
 * 将横线分割的字符串装换成驼峰式
 * @param {*} str 被转换的字符串
 * @param {*} pascal 是否大驼峰
 */
const toCamelCase = (str, pascal = false) => {
  const s =    str
    && str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('');
  if (pascal) {
    return s.slice(0, 1).toUpperCase() + s.slice(1);
  }
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};
const toKebabCase = (str) => {
  let newStr = str.replace(/([A-Z])/g, '-$1').toLowerCase();
  if (newStr.charAt(0) === '-') {
    newStr = newStr.substr(1);
  }
  return newStr;
};
/**
 * 去掉空格
 * @param {*} str
 */
const trim = str => str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');
const isEmpty = (str) => {
  if (str === null || typeof str === 'undefined' || trim(str) === '') {
    return true;
  }
  return false;
};
const generateUUID = () => {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + (Math.random() * 16)) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
  });
  return uuid;
};
// 查表得知：
// 数字0~9对应的ASCII码值是 48-57
// 大写字母A-Z对应的ASCII码值是 65-90
// 小写字母a-z对应的ASCII码值是 97-122
const getScopedCode = (legnth) => {
  // 定义一个空数组保存我们的密码
  const passArrItem = [];
  // 定义获取密码成员的方法
  const getNumber = () => Math.floor(Math.random() * 10); // 0~9的数字
  // const getUpLetter = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65); // A-Z
  const getLowLetter = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97); // a-z
  // 将获取成员的方法保存在一个数组中方便用后面生成的随机index取用
  const passMethodArr = [getNumber, getLowLetter, getLowLetter];
  // 随机index
  const getIndex = () => Math.floor(Math.random() * 3);
  // 从0-9，a-z，A-Z中随机获取一项
  const getPassItem = () => passMethodArr[getIndex()]();
  // 不多解释
  Array(legnth - 3).fill('')
    .forEach(() => {
      passArrItem.push(getPassItem());
    });
  const confirmItem = [getNumber(), getLowLetter(), getLowLetter()];
  // 加上我们确认的三项，从而使生成的密码，大写字母、小写字母和数字至少各包含一个
  passArrItem.push(...confirmItem);
  // 转为字符串返回
  return passArrItem.join('');
};
const readDir = (dir) => {
  const dirList = fs.readdirSync(dir);
  const ret = [];
  dirList.forEach((children) => {
    const stat = fs.statSync(path.join(dir, children));
    if (stat.isDirectory()) {
      ret.push(...readDir(path.join(dir, children)));
    } else {
      ret.push(path.join(dir, children));
    }
  });
  return ret;
};
module.exports = {
  toCamelCase,
  isEmpty,
  toKebabCase,
  readDir,
  generateUUID,
  getScopedCode,
};
