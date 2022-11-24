/*
 * @Author: nhsoft.wh
 * @Date: 2022-11-24 17:54:54
 * @LastEditors: nhsoft.wh
 * @LastEditTime: 2022-11-24 18:21:25
 * @Description:
 * 适配器模式：对旧逻辑的重构，添加一个适配器，保证 出入参不变★★★★★。
 * 将旧方法的入参转化为新方法的类型，将新方法的出参转化为旧方法的类型
 */
class OldClass {
  constructor(surname, name) {
    this.name = surname + name;
  }

  doSomethingWithName() {
    let result;

    // ...使用name进行的一系列处理，处理完赋值给result

    result = this.name;

    return result;
  }
}

const oldClassArgs = ["姓", "名"];

console.log(
  "旧的结果：",
  new OldClass(...oldClassArgs).doSomethingWithName()
);

class NewClass {
  constructor(name) {
    this.name = name;
  }

  doSomethingWithName() {
    let result;

    // ...使用了新的算法处理name，处理完赋值给result

    result = this.name.split();

    return result;
  }
}

// 适配器，使得旧的入参适配新的类
const adapter = (surname, name) => {
  console.log("旧的入参：", `${surname}, ${name}`);

  const NewClassArgs = surname + name;

  const newClassResult = new NewClass(
    NewClassArgs
  ).doSomethingWithName();

  console.log("新的出参：", newClassResult);

  return newClassResult.join();
};

console.log("使用了适配器的结果：", adapter(...oldClassArgs));
