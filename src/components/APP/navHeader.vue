<template>
  <div class="navHeader">
    <div class="container">
      <ul class="tab">
        <a href="https://hchow.icu">
          <li>首页</li>
        </a>
        <router-link to="/">
          <li @click="changeActiveTab('blog')" :class="activeTab === 'blog' ? 'active' : ''">众乐乐博客</li>
        </router-link>
      </ul>
      <div class="btn">
        <el-button color="#3BA293" plain :dark="true" @click="gotoLogin" v-if="!isLogin">登录</el-button>
        <el-button color="#4978C3" plain :dark="true" @click="gotoRegister" v-if="!isLogin">注册</el-button>
        <el-popconfirm title="确定退出吗?" confirm-button-text="是" cancel-button-text="否" @confirm="logOut" v-else>
          <template #reference>
            <el-button color="#F06367" plain :dark="true">退出登录</el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'navHeader',
  setup() {
    const router = useRouter()
    const activeTab = ref('blog')
    const changeActiveTab = (tabName: any) => {
      activeTab.value = tabName
    }
    /* 跳转到登录 */
    const gotoLogin = () => {
      router.push({ name: 'Login', query: { type: 'login' } })
    }
    /* 跳转到注册 */
    const gotoRegister = () => {
      router.push({ name: 'Login', query: { type: 'register' } })
    }
    /* 是否登录 */
    const userStore = useUserStore()
    const { isLogin } = storeToRefs(userStore)
    const logOut = () => {
      userStore.changeLoginStatus(false)
    }
    return {
      activeTab,
      changeActiveTab,
      gotoLogin,
      gotoRegister,
      isLogin,
      logOut
    }
  }
})
</script>

<style lang="scss" scoped>
.navHeader {
  background-color: #2e2e33;
  width: 100%;
  height: 100%;
  .container {
    max-width: 1100px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tab {
      list-style: none;
      display: flex;
      padding: 0;
      a {
        color: #c4c4c5;
        text-decoration: none;
        li {
          padding: 10px 25px;
          border-radius: 8px;
          margin-right: 5px;
          font-weight: lighter;
          transition: background 0.3s;
        }
        li.active {
          background-color: #3a3a41;
        }
        li:hover {
          background-color: #3a3a41;
        }
      }
    }
  }
}

@font-face {
  font-family: '思源宋体 CN VF Regular';
  src: url('//at.alicdn.com/wf/webfont/sL4UCYfS7v16/C-5uOkgYYgG0f0kMaCpMh.woff2') format('woff2'),
    url('//at.alicdn.com/wf/webfont/sL4UCYfS7v16/yK42PL0SxgjqngDVRJhYG.woff') format('woff');
  font-display: swap;
}
</style>
