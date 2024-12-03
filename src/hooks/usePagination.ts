/**
 * 自定义Hooks，
 * usePagination处理分页逻辑
 * useFetch用于发送异步请求并处理响应数据
 */
import { json } from 'stream/consumers'
import {ref, computed, isRef, onMounted, watch} from 'vue'
// endpoint: 分页请求的接口
export function usePagination(endpoint:String) {
  const currentPage = ref(1) // 当前页码，响应式引用ref
  // computed计算属性，根据当前页面和endpoint拼接出完整的接口url
  const paginationEndPoint = computed(()=>{
    return `${endpoint}?page=${currentPage.value}`
  })
  function nextPage(){
    currentPage.value++
  }
  function prevPage(){
    if(currentPage.value <= 1){
      return
    }
    currentPage.value--
  }
  return {
    endpoint: paginationEndPoint,
    nextPage,
    prevPage
  }
}

export function useFetch(endpoint:any){
  const data = ref(null)
  const loading = ref(true)
  const error: any =ref(null)
  function fetchData(){
    loading.value = true
    return fetch(isRef(endpoint) ? endpoint.value : endpoint,{
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      },
    }).then(res =>{
      if(!res.ok){
        const error = new Error(res.statusText)
        error.json = res.json()
        throw error
      }
      return res.json()
    }).then(json =>{
      data.value = json
    }).catch(err =>{
      error.value=err
      if(err.json){
        return err.json.then((json:any)=>{
          error.value.message = json.message
        })
      }
    }).finally(()=>{
      loading.value=false
    })
  }
  // 回调函数，组件挂载完成后执行
  onMounted(()=>{
    // 组件加载时发送请求
    fetchData()
  })
  if(isRef(endpoint)){
    // 监听变化
    watch(endpoint, ()=>{
      // 重新拉去数据
      fetchData()
    })
  }
}
