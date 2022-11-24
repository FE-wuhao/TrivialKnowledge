/*
 * @Author: nhsoft.wh
 * @Date: 2022-11-24 18:32:13
 * @LastEditors: nhsoft.wh
 * @LastEditTime: 2022-11-24 20:53:52
 * @Description:
 * 代理模式
 */
// 被代理对象
const girl = {
  name: "小妹",
  sex: "female",
  age: 22,
  avatar: "xxx",
  photo: "xxx",
  /** 打赏，测试代理setter的时候使用 */
  rewards: [],
};

// 追求者
const man = {
  name: "小明",
  sex: "male",
  age: 30,
  avatar: "yyy",
  photo: "yyy",
  vip: false,
  realNameAuthentication: false,
};

// 代理者
const womanMatchmaker = new Proxy(girl, {
  // 下面是媒婆作为中间人代理的事情
  get: (target, property) => {
    if (property === "age" && !man.realNameAuthentication) {
      console.log("媒婆：没有实名认证不给问年龄！");

      return;
    }

    if (property === "photo" && !man.vip) {
      console.log("媒婆：不是vip不给看照片！");

      return;
    }

    console.log(property, ":", target[property]);

    return target[property];
  },
  set: (target, property, value) => {
    if (property !== "rewards") {
      console.log("媒婆：除了打赏啥事儿也不给干！");

      return;
    }

    target[property] = value;

    console.log(property, ":", target[property]);
  },
});
// 问年龄
womanMatchmaker.age;

man.realNameAuthentication = true;

womanMatchmaker.age;

// 要照片
womanMatchmaker.photo;

man.vip = true;

womanMatchmaker.photo;

womanMatchmaker.age = 20;

womanMatchmaker.rewards = ["感谢大哥送上的一发火箭！"];
