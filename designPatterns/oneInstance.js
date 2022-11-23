/*
 * @Author: nhsoft.wh
 * @Date: 2022-11-23 09:43:18
 * @LastEditors: nhsoft.wh
 * @LastEditTime: 2022-11-23 10:34:43
 * @Description: 单例模式
 */
const type = process.argv[2] || "class";

console.log(`当前实现单例模式的方式为：${type}`);

// #region class版本
class Modal {
  constructor(name) {
    this.name = name;
  }

  static getInstance(name) {
    if (!Modal.instance) {
      Modal.instance = new Modal(name);
    }

    return Modal.instance;
  }

  show() {
    console.log(`${this.name} show function`);
  }

  close() {
    console.log(`${this.name} close function`);
  }
}

if (type === "class") {
  const modal1 = Modal.getInstance("小红");

  const modal2 = Modal.getInstance("小蓝");

  console.log("两个modal实例是否相等：", modal1 === modal2);

  modal1.show();

  modal2.show();

  modal1.close();

  modal2.close();
}
// #endregion

// #region function版本
function FunctionModalBase() {}

FunctionModalBase.prototype.show = () => {
  console.log("show");
};

FunctionModalBase.prototype.close = () => {
  console.log("end");
};

const generateModalInstance = (function () {
  let instance;

  return () => {
    if (!instance) {
      instance = new FunctionModalBase();
    }

    return instance;
  };
})();

if (type === "function") {
  const modal1 = generateModalInstance();

  const modal2 = generateModalInstance();

  console.log("两个modal实例是否相等：", modal1 === modal2);
}
// #endregion
