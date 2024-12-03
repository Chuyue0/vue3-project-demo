// 根据浏览器大小判断缩放比例
export const getScale = (width=1920, height=1080)=>{
  let WW = window.innerWidth / width
  let WH = window.innerHeight / height
  return WW < WH ? WW : WH
}
// 浏览器监听窗口变化事件 dataScreenRef为整个大盒子DOM名
export const resize = (dataScreenRef)=>{
  if(dataScreenRef.value){
    dataScreenRef.value.style.transform = `scale(${getScale()}) translate: -50% -50%`
  }
}
