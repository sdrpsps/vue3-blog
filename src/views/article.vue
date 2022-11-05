<template>
  <div class="container">
    <p class="title">{{ articleDetail.title }}</p>
    <div class="content">
      <v-md-preview :text="articleDetail.content"></v-md-preview>
    </div>
  </div>
</template>

<script lang="ts">
import { getArticleDeatil } from '@/api/article'
import { ElMessage } from 'element-plus'
import { onMounted, ref, toRaw } from 'vue'
import { useRouter } from 'vue-router'

export default {
  components: {},
  setup() {
    const router = useRouter()
    const articleID = ref(0)
    const articleDetail = ref({ title: '', content: '' })

    /* 获取路由参数 */
    const getArticleID = () => {
      const id = toRaw(router).currentRoute.value.query.id as any
      if (+id === NaN) {
        ElMessage.error('参数有误!')
        return
      }
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
    :deep(.vuepress-markdown-body) {
      color: #c4c4c5;
      background-color: #1d1e20;
    }
    :deep(.vuepress-markdown-body code) {
      background-color: rgba($color: #fff, $alpha: 0.05);
    }
    :deep(.vuepress-markdown-body pre code) {
      background-color: initial;
    }
    :deep(.vuepress-markdown-body:not(.custom)) {
      padding: 0;
    }
    .vuepress-markdown-body h2 {
      border-bottom: 1px solid #545454;
    }
  }
}
</style>
