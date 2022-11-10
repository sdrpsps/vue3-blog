<template>
  <div class="home">
    <div class="article">
      <div class="skeleton">
        <el-skeleton :rows="5" animated :loading="loading" />
      </div>
      <div class="articleItem" v-for="item in articleList" :key="item.id">
        <router-link :to="{ name: 'Article', query: { id: item.id } }">
          <p class="title">{{ item.title }}</p>
          <p class="preview">{{ item.content }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getArticleList } from '@/api/index'
import { articleListDatum } from '@/api/article/types'

export default defineComponent({
  name: 'home',
  components: {},
  setup() {
    /* 加载状态 */
    const loading = ref(true)
    /* 文章列表 */
    const articleList = ref([] as articleListDatum[])
    /* 文章分页 */
    const articlePage = ref({ currPage: 1 })
    /* 获取文章列表 */
    const getArticleListHandler = async () => {
      try {
        const res = await getArticleList({ page: articlePage.value.currPage })
        articleList.value = res.data
        articlePage.value = res.meta
      } catch (error) {
        console.log(error)
      }
      /* 停止 Loading 状态 */
      loading.value = false
    }
    onMounted(() => {
      getArticleListHandler()
    })
    return {
      loading,
      articleList
    }
  }
})
</script>
<style lang="scss" scoped>
.home {
  max-width: 1100px;
  margin: 0 auto;
  .article {
    padding: 60px 20px 0px 20px;
    text-align: left;
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
