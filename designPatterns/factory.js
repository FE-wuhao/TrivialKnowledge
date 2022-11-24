/*
 * @Author: nhsoft.wh
 * @Date: 2022-11-24 09:54:57
 * @LastEditors: nhsoft.wh
 * @LastEditTime: 2022-11-24 10:06:31
 * @Description:
 * 工厂模式：构造器模式的进一步抽象。
 * 将构造对象的过程进行封装，从原来的纯纯的传参构造，转变为传参后经过一些处理变成新的参数进行构造
 */
const type = process.argv[2] || "class";

console.log(`当前实现工厂模式的方式为：${type}`);

class Coder {
  constructor(name, age, career, type) {
    this.name = name;
    this.age = age;
    this.career = career;
    this.job = "写代码";
    this.type = type;
  }
}

class CoderInfoFactory {
  static generateCoderInfoObject(career, type) {
    switch (career) {
      case "前端工程师":
        return new Coder("小明", 25, "前端工程师", type);
      case "后端工程师":
        return new Coder("小红", 25, "后端工程师", type);
      case "架构师":
        return new Coder("小芳", 30, "架构师", type);
      default:
        return "请传入正确的参数";
    }
  }
}

function FunctionCoderInfoFactory(career, type) {
  switch (career) {
    case "前端工程师":
      return new Coder("小明", 25, "前端工程师", type);
    case "后端工程师":
      return new Coder("小红", 25, "后端工程师", type);
    case "架构师":
      return new Coder("小芳", 30, "架构师", type);
    default:
      return "请传入正确的参数";
  }
}

let obj;

if (type === "class") {
  obj = CoderInfoFactory.generateCoderInfoObject("前端工程师", type);
} else {
  obj = FunctionCoderInfoFactory("前端工程师", type);
}

console.log("公司职员信息：", obj);
