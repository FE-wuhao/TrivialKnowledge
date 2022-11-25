/*
 * @Author: nhsoft.wh
 * @Date: 2022-11-25 15:23:05
 * @LastEditors: nhsoft.wh
 * @LastEditTime: 2022-11-25 15:35:16
 * @Description:
 * 状态模式：个人理解像是策略模式的变种，区别在于策略模式是纯净的，无需关注外部状态的，而状态模式则需要引入外部的状态。
 */

// #region 策略模式例子
const stateToProcessor = {
  american() {
    console.log("我只吐黑咖啡");
  },
  latte() {
    this.american();
    console.log("加点奶");
  },
  vanillaLatte() {
    this.latte();
    console.log("再加香草糖浆");
  },
  mocha() {
    this.latte();
    console.log("再加巧克力");
  },
};

class PolicyModeCoffeeMaker {
  constructor() {
    // 初始化状态，没有切换任何咖啡模式
    this.state = "init";
  }

  // 关注咖啡机状态切换函数
  changeState(state) {
    // 记录当前状态
    this.state = state;
    // 若状态不存在，则返回
    if (!stateToProcessor[state]) {
      return;
    }

    stateToProcessor[state]();
  }
}

const mk = new PolicyModeCoffeeMaker();

mk.changeState("latte");
// #endregion

// #region 状态模式例子
class StatusModeCoffeeMaker {
  constructor() {
    // 初始化状态，没有切换任何咖啡模式
    this.state = "init";
    // 初始化牛奶的存储量
    this.leftMilk = "500ml";
  }
  stateToProcessor = {
    that: this,
    american() {
      // 尝试在行为函数里拿到咖啡机实例的信息并输出
      console.log("咖啡机现在的牛奶存储量是:", this.that.leftMilk);
      console.log("我只吐黑咖啡");
    },
    latte() {
      this.american();
      console.log("加点奶");
    },
    vanillaLatte() {
      this.latte();
      console.log("再加香草糖浆");
    },
    mocha() {
      this.latte();
      console.log("再加巧克力");
    },
  };

  // 关注咖啡机状态切换函数
  changeState(state) {
    this.state = state;
    if (!this.stateToProcessor[state]) {
      return;
    }
    this.stateToProcessor[state]();
  }
}

const mk1 = new StatusModeCoffeeMaker();

mk1.changeState("latte");
// #endregion

/**
 * 通过上面的例子可以看到，策略模式的stateToProcessor是写在PolicyModeCoffeeMaker外面的，
 * 而状态模式的stateToProcessor是写在StatusModeCoffeeMaker内部的，
 * 且状态模式的stateToProcessor内部用到了StatusModeCoffeeMaker类的内部变量。
 * 当然，这样的理解还是太过狭义了，还需要再参考一些文献，深入一下理解。
 *  */
