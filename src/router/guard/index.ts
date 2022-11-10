import router from '@/router'
import { loadingScreen } from '@/utils/loading'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

nProgress.configure({
  showSpinner: false
})

// 全局前置守卫
router.beforeEach((to, from) => {

})

// 全局后置钩子
router.afterEach(() => {

})
