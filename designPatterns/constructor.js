/*
 * @Author: nhsoft.wh
 * @Date: 2022-11-24 09:37:09
 * @LastEditors: nhsoft.wh
 * @LastEditTime: 2022-11-24 09:50:44
 * @Description:
 * 构造器模式：将实例化类的过程封装起来，封装成一个构造函数
 * 每次只需要向构造函数传递参数，即可实例化出拥有共性的不同对象
 * 目的是封装对象的变与不变，不变的固定声明即可，变的通过参数传入
 */
const type = process.argv[2] || "class";

console.log(`当前实现构造器模式的方式为：${type}`);

class Coder {
  constructor(name, age, career, type) {
    this.name = name;
    this.age = age;
    this.career = career;
    this.job = "写代码";
    this.type = type;
  }
}

function FunctionCoder(name, age, career) {
  this.name = name;
  this.age = age;
  this.career = career;
  this.job = "写代码";
  this.type = type;
}

let constructor;

if (type === "class") {
  constructor = Coder;
} else {
  constructor = FunctionCoder;
}

const fe = new constructor("小明", 25, "前端工程师", type);

const be = new constructor("小红", 30, "后端工程师", type);

console.log("公司职员信息：", fe, be);
