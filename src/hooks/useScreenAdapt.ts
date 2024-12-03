/**
 * 屏幕适配，缩放scale方式
 * @param dWidth 设计稿宽度
 * @param dHeight 设计稿高度
 */
import _ from 'lodash'
import { onMounted, onUnmounted } from 'vue'
export default function useScreenAdapt(dWidth: number = 1920, dHeight: number = 1080){
  // 节流，为避免频繁触发缩放故使用throttle()
  const throtterAdjustZoom = _.throttle(()=>{
    AdjustZoom()
  }, 1000)
  onMounted(()=>{
    AdjustZoom()
    // 窗口变化响应
    window.addEventListener('resize', throtterAdjustZoom)
  })
  onUnmounted(()=>{
    // 移除监听
    window.removeEventListener('resize', throtterAdjustZoom)
  })
  function AdjustZoom(){
    // 设计稿尺寸及宽高比
    const designWidth = dWidth
    const designHeight = dHeight
    const designRatio = dWidth / dHeight
    // 屏幕尺寸及宽高比
    const deviceWidth = window.innerWidth
    const deviceHeight = window.innerHeight
    const deviceRatio = deviceWidth / deviceHeight
    // 计算缩放比
    let scaleRatio = 1 // window.devicePixelRatio
    // 如果屏幕宽高大于设计稿宽高，以高度作为缩放比
    if(deviceRatio > designRatio){
      scaleRatio = deviceHeight / designHeight
    }else{
      // 否则以宽度作为缩放比
      scaleRatio = deviceWidth / designWidth
    }
    document.body.style.transform=`scale(${scaleRatio}) translateX(-50%);`
  }
}
