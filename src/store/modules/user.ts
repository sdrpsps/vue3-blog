import { defineStore } from 'pinia'
import { ref } from 'vue'

const useUserStore = defineStore('user', () => {
  const isLogin = ref(false)

  const changeLoginStatus = (status: Boolean) => {
    if(status){
      isLogin.value = true
    }else{
      isLogin.value = false
      localStorage.removeItem('token')
    }
  }

  return {
    isLogin,
    changeLoginStatus
  }
}, {
  persist: {
    key: 'user',
    storage: localStorage
  }
})

export default useUserStore
