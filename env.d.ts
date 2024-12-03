/// <reference types="vite/client" />
/**
 * 声明文件
 * vue3项目中，ts文件识别不了vue文件，加上下面代码
 * 修改后需要重启编辑器或某个文件重新打开，就没有标红报错了
 * declare关键字做前缀，类型申明
 */
// 写法一
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const vueComponent: DefineComponent<{}, {}, any>
  export default vueComponent;
}
// 写法二
/* declare module "*.vue" {
  import { Component } from "vue";
  const component: Component
  export default component
} */
