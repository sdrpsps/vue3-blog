<template>
  <div class="home">
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

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getArticleList } from '@/api/index'
import useLoadingStore from '@/store/modules/loading'

export default defineComponent({
  name: 'home',
  components: {},
  setup() {
    /* Loading 状态 */
    const loadingStore = useLoadingStore()
    /* 获取文章列表 */
    const getArticleListHandler = async () => {
      try {
        const res = await getArticleList({ page: 1 })
        articleList.value = res.data
      } catch (error: any) {
        console.log(error)
      }
      /* 停止 Loading 状态 */
      loadingStore.loadingScreen(false)
    }
    /* 文章列表 */
    const articleList = ref([] as any)
    onMounted(() => {
      getArticleListHandler()
    })
    return {
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
    padding: 60px 40px 0px 40px;
    .articleItem {
      text-align: left;
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
