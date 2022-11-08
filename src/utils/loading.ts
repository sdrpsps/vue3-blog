import { ElLoading } from "element-plus"

export const loadingScreen = (status: Boolean) => {
    let loading = ElLoading.service({
        lock: true,
        text: 'Please wait :)',
        background: 'rgba(0, 0, 0, 0.4)',
    })
    if (!status) {
        loading.close()
    }
}