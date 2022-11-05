import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElLoading, ElStep } from 'element-plus'


const useLoadingStore = defineStore('loading', () => {

    const loadingScreen = (status: Boolean) => {
        let loading = ElLoading.service({
            lock: true,
            text: 'Loading... Please wait :)',
            background: 'rgba(0, 0, 0, 0.4)',
        })
        if (!status) {
            loading.close()
        }
    }

    return {
        loadingScreen
    }
}, {
    persist: {
        key: 'loading',
        storage: sessionStorage
    }
})

export default useLoadingStore
