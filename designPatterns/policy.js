/*
 * @Author: nhsoft.wh
 * @Date: 2022-11-25 14:56:22
 * @LastEditors: nhsoft.wh
 * @LastEditTime: 2022-11-25 15:02:43
 * @Description:
 * 策略模式：将运算转化为配置，通过映射的方式获取多分支的结果
 */
function getPriceRangeByType(type) {
  if (type === "原价") {
    return [1, 2];
  } else if (type === "出厂价") {
    return [2, 3];
  } else if (type === "划线价") {
    return [4, 5];
  } else if (type === "限时折扣") {
    return [3, 4];
  }
}

console.log(
  "通过if-else的方式获取出厂价的价格区间：",
  getPriceRangeByType("出厂价")
);

const priceRangeMapper = {
  原价: [1, 2],
  出厂价: [2, 3],
  划线价: [4, 5],
  限时折扣: [3, 4],
};

console.log(
  "通过策略模式的方式获取出厂价的价格区间：",
  priceRangeMapper["出厂价"]
);
