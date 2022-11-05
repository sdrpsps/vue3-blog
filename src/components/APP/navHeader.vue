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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'navHeader',
  setup() {
    const activeTab = ref('blog')
    const changeActiveTab = (tabName: any) => {
      activeTab.value = tabName
    }
    return {
      activeTab,
      changeActiveTab
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
