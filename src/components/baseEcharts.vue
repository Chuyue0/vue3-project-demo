<template>
  <div ref="mainEcharts" :style="{width: width, height: height}">
  </div>
</template>
<script lang="ts" setup>
import * as eCharts from 'echarts';
// import echarts from 'echarts/types/dist/echarts';
import { onMounted, onUnmounted, ref } from 'vue';
/**
 * 定义接口的情况：
 * 1、数据结构较为复杂，有多个属性且有具体的类型时，能清晰的描述数据形状和类型检查
 * 2、团队协作更方便了解数据结构
 * 3、方便管理
 */
interface IProps{
  width?: string;
  height?: string;
  chartOption: eCharts.EChartsOption
}
/**
 * withDefaults 编译器宏，帮助程序为默认值提供类型检查，确保返回的props类型删除了已声明默认值的属性的可选标志
 * defineProps<>() 宏函数，通过泛型参数来定义props的类型 =》“基于类型的声明”
 */
const props = withDefaults(defineProps<IProps>(),{
  width: '100%',
  height: '100%'
})
/**
 * ref() 接受一个内部值，返回一个响应式的、可更改的 ref 对象，此对象只有一个指向其内部值的属性 .value
 * 深层响应式 ref()
 * ref的浅层作用形式 shallowRef()
 */
const mainEcharts=ref(null)
// myCharts为空判断
let myCharts: eCharts.ECharts | null = null

onMounted(() => {
  myCharts = eCharts.init(mainEcharts.value, 'dark', { renderer: 'svg'})
  const options = props.chartOption
  myCharts.setOption(options)
})
onUnmounted(() => {
  // 销毁实例，释放资源
  myCharts?.dispose()
}),
</script>
