import { defineStore } from 'pinia'
import { ref } from 'vue'

const useUserStore = defineStore('user', () => {
  /* 是否登录 */
  const isLogin = ref(false)
  const getToken = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      isLogin.value = false
    } else {
      isLogin.value = true
    }
  }
  const changeLoginStatus = (status: Boolean) => {
    if (status) {
      isLogin.value = true
    } else {
      isLogin.value = false
      localStorage.removeItem('token')
      /* 刷新页面 */
      location.reload()
    }
  }

  /* 是否在编辑 */
  const isEdit = ref(false)
  const changeEditStatus = (status: Boolean) => {
    if (status) {
      isEdit.value = true
    } else {
      isEdit.value = false
    }
  }
  return {
    isLogin,
    getToken,
    changeLoginStatus,
    isEdit,
    changeEditStatus
  }
}, {
  persist: {
    key: 'user',
    storage: localStorage
  }
})

export default useUserStore
