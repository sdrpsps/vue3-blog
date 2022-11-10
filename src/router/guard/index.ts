import router from '@/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from '@/store'
import useUserStore from '@/store/modules/user'

nProgress.configure({
  showSpinner: false
})

const userStore = useUserStore(pinia)

// 全局前置守卫
router.beforeEach((to, from) => {
  if (to.name === 'Edit') {
    userStore.changeEditStatus(true)
  } else {
    userStore.changeEditStatus(false)
  }
})

// 全局后置钩子
router.afterEach(() => {

})
