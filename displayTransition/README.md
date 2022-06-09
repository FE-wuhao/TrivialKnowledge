<!--
 * @Author: nhsoft.wh
 * @Date: 2022-06-09 13:55:33
 * @LastEditors: nhsoft.wh
 * @LastEditTime: 2022-06-09 14:00:48
 * @Description: file content
-->

- 大前提：display 是不能出现过渡动画的
- 什么属性有过渡动画：
  - 有数字的变化，例如透明度，从 0-1
  - 初始化有渲染展示的
  - 在 transition 里面包含的属性
- 如何让不能出现过渡动画的属性展示过渡动画：向浏览器请求一些 style 信息，强制更新浏览器的 flush 队列。比如：
  - offsetTop, offsetLeft, offsetWidth, offsetHeight
  - scrollTop/Left/Width/Height
  - clientTop/Left/Width/Height
  - width,height
- 当读取 offsetHeight 属性后，我们清空了渲染队列，那么此时 dom 重新渲染完成后，此时 display 已经是 block 了。而且展示在界面上面了，我们再操作 dom 属性就会出现过渡动画了
