import router from '@/router'
import useLoadingStore from '@/store/modules/loading'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

nProgress.configure({
  showSpinner: false
})

// 全局前置守卫
router.beforeEach((to, from) => {
  nProgress.start()

  /* 开始 Loading 状态 */
  const loadingStore = useLoadingStore()
  loadingStore.loadingScreen(true)

  return true
})

// 全局后置钩子
router.afterEach(() => {
  nProgress.done(true)
})
