<template>
  <div class="container">
    <p class="title">{{ articleDetail.title }}</p>
    <div class="content">
      <MdEditor v-model="articleDetail.content" preview-only theme="dark" />
    </div>
  </div>
</template>

<script lang="ts">
import { getArticleDeatil } from '@/api/article'
import { ElMessage } from 'element-plus'
import { onMounted, ref, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import useLoadingStore from '@/store/modules/loading'
/* MarkDown 渲染组件 */
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

export default {
  components: { MdEditor },
  setup() {
    const router = useRouter()
    const loadingStore = useLoadingStore()
    const articleID = ref(0)
    const articleDetail = ref({ title: '', content: '' })

    /* 获取路由参数 */
    const getArticleID = () => {
      const id = toRaw(router).currentRoute.value.query.id as any
      articleID.value = +id
    }
    /* 获取文章详情 */
    const getArticleDeatilHanlder = async () => {
      try {
        const res = await getArticleDeatil(articleID.value)
        articleDetail.value = res.data
      } catch (error) {
        console.log(error)
      }
      /* 停止 Loading 状态 */
      loadingStore.loadingScreen(false)
    }
    onMounted(() => {
      getArticleID()
      getArticleDeatilHanlder()
    })

    return {
      articleDetail
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  text-align: left;
  .title {
    font-size: 32px;
    font-weight: 600;
    color: #c4c4c5;
  }
  .content {
    .md-dark {
      --md-bk-color: #1d1e20;
    }
  }
}
</style>
