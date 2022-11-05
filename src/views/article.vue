<template>
  <div class="content">
    <div>{{ articleDetail.content }}</div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, ref, toRaw, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { getArticleDeatil } from '@/api/article'
import { ElMessage } from 'element-plus'

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
.content {
  max-width: 1100px;
  margin: 0 auto;
  color: #888;
}
</style>
