import router from '@/router'
import { loadingScreen } from '@/utils/loading'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

nProgress.configure({
  showSpinner: false
})

// 全局前置守卫
router.beforeEach((to, from) => {
  console.log(to.name);
  const whiteList = ['Login']
  if (whiteList.includes(to.name as string)) {
    return
  } else {
    /* 开始 Loading 状态 */
    loadingScreen(true)
  }
})

// 全局后置钩子
router.afterEach(() => {

})
