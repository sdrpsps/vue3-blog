<template>
  <div class="home">
    <div class="skeleton">
      <el-skeleton :rows="5" animated :loading="loading" />
    </div>
    <div class="article">
      <div class="articleItem" v-for="item in articleList" :key="item.id">
        <router-link :to="{ name: 'Article', query: { id: item.id } }">
          <p class="title">{{ item.title }}</p>
          <p class="preview">{{ item.content }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { articleListDatum } from '@/api/article/types'
import { getArticleList } from '@/api/index'
import { onBeforeUnmount, onMounted, ref } from 'vue'

/* 加载状态 */
const loading = ref(true)
/* 文章列表 */
const articleList = ref([] as articleListDatum[])
/* 文章分页 */
const articlePage = ref(1)
/* 获取文章列表 */
const getArticleListHandler = async () => {
  try {
    const res = await getArticleList({ page: articlePage.value })
    articleList.value.push(...res.data)
    articlePage.value = res.meta.currPage
  } catch (error) {
    console.log(error)
  }
  /* 停止 Loading 状态 */
  loading.value = false
}

/* 触底函数 */
const touchBottom = () => {
  // 滚动条滚动高度
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  // 可视区域
  let clientHeight = document.documentElement.clientHeight
  // 页面的高度
  let scrollHeight = document.documentElement.scrollHeight
  // 判断高度
  if (scrollTop + clientHeight >= scrollHeight) {
    articlePage.value++
    getArticleListHandler()
  }
}

onMounted(() => {
  /* 获取第一屏数据 */
  getArticleListHandler()
  /* 添加滚动事件监听 */
  window.addEventListener('scroll', touchBottom)
})

onBeforeUnmount(() => {
  /* 移除滚动事件监听 */
  window.removeEventListener('scroll', touchBottom)
})
</script>
<style lang="scss" scoped>
.home {
  max-width: 1100px;
  margin: 0 auto;
  text-align: left;

  .article {
    padding: 60px 20px 0px 20px;
    .articleItem {
      background-color: #2e2e33;
      border-radius: 8px;
      font-weight: 300;
      margin-bottom: 50px;
      transition: box-shadow 0.5s, transform 0.5s;
      a {
        text-decoration: none;
        display: block;
        padding: 20px;
        .title {
          font-size: 26px;
          color: #dadadb;
        }
        .preview {
          font-size: 14px;
          color: #888;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2; // 2行
        }
      }
    }
    .articleItem:hover {
      box-shadow: 0 0 20px 4px #161718;
      transform: translateY(-10px);
    }
  }
}
</style>
