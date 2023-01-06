/*
 * @Author: nhsoft.wh
 * @Date: 2023-01-06 17:06:01
 * @LastEditors: nhsoft.wh
 * @LastEditTime: 2023-01-06 17:50:29
 * @Description: file content
 */
/** 基于reduce手动实现一个pipe
 * 思路：将各个工序的func塞入数组，循环数组调用上一工序的结果，最终循环完成后整个工序也走完了
 */

// +1
const add1 = (a) => {
  return a + 1;
};

// *2
const multiply2 = (a) => {
  return a * 2;
};

// -3
const minus3 = (a) => {
  return a - 3;
};

const pipe = (...functions) => {
  return (initValue) => {
    return functions.reduce((result, curFunction) => {
      return curFunction(result);
    }, initValue);
  };
};

const compute = pipe(add1, multiply2, minus3);

console.log("(5 + 1) * 2 - 3的结果是：", compute(5));
