/*
 * @Author: nhsoft.wh
 * @Date: 2022-11-25 14:56:22
 * @LastEditors: nhsoft.wh
 * @LastEditTime: 2022-11-25 15:03:45
 * @Description:
 * 策略模式：将运算转化为配置，通过映射的方式获取多分支的结果
 */
function getPriceRangeByType(type) {
  if (type === "originalPrice") {
    return [1, 2];
  } else if (type === "exFactoryPrice") {
    return [2, 3];
  } else if (type === "crossedPrice") {
    return [4, 5];
  } else if (type === "limitedTimeDiscount") {
    return [3, 4];
  }
}

console.log(
  "通过if-else的方式获取出厂价的价格区间：",
  getPriceRangeByType("exFactoryPrice")
);

const priceRangeMapper = {
  originalPrice: [1, 2],
  exFactoryPrice: [2, 3],
  crossedPrice: [4, 5],
  limitedTimeDiscount: [3, 4],
};

console.log(
  "通过策略模式的方式获取出厂价的价格区间：",
  priceRangeMapper["exFactoryPrice"]
);
