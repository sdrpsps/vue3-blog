<template>
  <div class="container">
    <div class="skeleton">
      <el-skeleton :rows="10" animated :loading="loading" />
    </div>
    <div class="title">
      <p class="titleText">{{ articleDetail.title }}</p>
      <!-- 编辑和删除按钮 -->
      <div class="titleBtn" v-if="name === articleDetail.author || name === 'admin'">
        <el-icon :size="20" style="margin-right: 6px">
          <Edit @click="gotoEdit" />
        </el-icon>
        <el-popconfirm title="确定删除这遍文章吗?" confirm-button-text="是" cancel-button-text="否" @confirm="deleteArticleHandler" width="180px">
          <template #reference>
            <el-icon :size="20">
              <Delete />
            </el-icon>
          </template>
        </el-popconfirm>
      </div>
    </div>
    <div class="content">
      <MdEditor v-model="articleDetail.content" preview-only theme="dark" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { deleteArticle, getArticleDeatil } from '@/api/index'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
/* MarkDown 渲染组件 */
import { articleDetailData } from '@/api/article/types'
import { ElMessage } from 'element-plus'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

/* 加载状态 */
const loading = ref(true)

const route = useRoute()
const router = useRouter()
/* 文章 ID */
const articleID = ref(0)
const articleDetail = ref({} as articleDetailData)
/* 当前登录用户名 */
const name = localStorage.getItem('name')

/* 获取路由参数 */
const getArticleID = () => {
  const id = route.query.id as string
  articleID.value = +id
}
/* 获取文章详情 */
const getArticleDeatilHanlder = async () => {
  try {
    const res = await getArticleDeatil({ id: articleID.value })
    articleDetail.value = res.data
  } catch (error) {
    console.log(error)
  }
  /* 停止 Loading 状态 */
  loading.value = false
}
/* 跳转到编辑 */
const gotoEdit = () => {
  router.push({ name: 'Edit', query: { id: articleID.value } })
}
/* 删除文章 */
const deleteArticleHandler = async () => {
  try {
    const res = await deleteArticle(articleID.value)
    if (!res.meta.success) {
      ElMessage.error('删除失败，请稍后再试')
      return
    }
    ElMessage.success('删除文章成功!')
    router.push({ name: 'Home' })
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getArticleID()
  getArticleDeatilHanlder()
})
</script>

<style lang="scss" scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  text-align: left;
  .title {
    display: flex;
    align-items: center;
    color: #c4c4c5;
    .titleText {
      font-size: 32px;
      font-weight: 600;
    }
    .titleBtn {
      margin-left: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
  }
  .content {
    .md-editor-dark {
      --md-bk-color: #1d1e20;
    }
  }
}
</style>
