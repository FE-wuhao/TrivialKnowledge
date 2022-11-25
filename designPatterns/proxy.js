/*
 * @Author: nhsoft.wh
 * @Date: 2022-11-24 18:32:13
 * @LastEditors: nhsoft.wh
 * @LastEditTime: 2022-11-25 14:47:11
 * @Description:
 * 代理模式：创建中间人，处理两个对象之间的读写，不局限于使用proxy做代理。
 * 常见的四种代理类型：
 * 事件代理：父节点代理子节点的点击事件
 * 虚拟代理：图片懒加载、预加载
 * 缓存代理：与useMemo类似，缓存计算结果，实现方式通过闭包实现
 * 保护代理：主要通过proxy，在get和set阶段做拦截，符合操作条件才会执行get、set操作，实现了对代理对象的保护
 */
// #region 事件代理
// 见目录下的eventProxy.html
// #endregion

// #region 虚拟代理
// 图片预加载：使用一个简单的占位图先展示出来，同步后台加载真实的图片。等到真实图片加载完毕，将占位图替换为真实图片
// 通过类代理的思路：
// 1.创建需要被代理的类
// 2.创建一个新的类作为代理类
// 3.创建与被代理的类同名的方法
// 4.实例化被代理的类，并将实例作为参数传递给代理类
// 5.代理中的同名方法被调用的同时，先经过需要代理的处理内容，
// 最后调用被代理的类实例的同名方法，将处理过的入参传递给被代理的类的实例，完成代理
class Image {
  constructor(targeDOM) {
    this.targeDOM = targeDOM;
  }

  setSrc(targetUrl) {
    this.targeDOM.src = targetUrl;
  }
}
// 真实的img dom
const dom = document.getElementById("xxx");
// 图片实例，通过setSrc方法改变真实dom的图片地址
const imageInstance = new Image(dom);
// 进行图片预加载的代理
class ImagePreloadingProxy {
  constructor(targetInstance) {
    this.targetInstance = targetInstance;

    this.placeholderImageUrl = "xxxxx";
  }

  setSrc(targetUrl) {
    // 创建后台图片实例
    const virtualImage = new Image();
    // 先展示占位图
    this.targetInstance.setSrc(this.placeholderImageUrl);
    // 图片实例加载完成后，将dom的src替换为目标图片
    // 这里onload前置的目的是：
    // 1.后置IE浏览器会有兼容性问题
    // 2.如果把url赋值语句写在前面，会出现bug，导致onload还未定义执行，图片已经加载完成c
    //
    image.onload(() => {
      this.targetInstance.setSrc(targetUrl);
    });
    // 图片实例加载目标图片
    virtualImage.src = targetUrl;
  }
}

const ImagePreloadingProxyInstance = new ImagePreloadingProxy(
  imageInstance
);

ImagePreloadingProxyInstance.setSrc("真正需要渲染的图片地址");
// #endregion

// #region 缓存代理
// 原理是通过闭包保存计算结果
// 计算函数，这里是简单的加法，也可以是复杂的运算
function computeFunc(a, b) {
  return a + b;
}

const cacheProxy = (function () {
  const cacheOBJ = {};

  return (a, b) => {
    const key = `${a}${b}`;

    if (cacheOBJ[key]) {
      console.log(`读取缓存：${a}+${b}=${cacheOBJ[key]}`);

      return cacheOBJ[key];
    }

    cacheOBJ[key] = computeFunc(a, b);

    console.log(`计算：${a}+${b}=${cacheOBJ[key]}`);

    return cacheOBJ[key];
  };
})();

cacheProxy(1, 2);

cacheProxy(3, 4);

cacheProxy(1, 2);

cacheProxy(3, 4);

cacheProxy(5, 6);

cacheProxy(5, 6);
// #endregion

// #region 保护代理
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

// #endregion
