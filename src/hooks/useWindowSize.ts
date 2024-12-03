/**
 * 自定义Hooks，用于获取浏览器的窗口宽度和高度。
 */
import { ref,onMounted,onUnmounted } from 'vue'
export function useWindowSize() {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)
  const updateWindowSize = ()=>{
    width.value = window.innerWidth
    height.value = window.innerHeight
  }
  onMounted(()=>{
    window.addEventListener('resize', updateWindowSize)
  })
  onUnmounted(()=>{
    window.removeEventListener('resize', updateWindowSize)
  })
  return { width, height}
}