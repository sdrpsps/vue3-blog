<template>
  <div class="edit">
    <el-form :inline="true" :model="articleData" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="articleData.title" placeholder="请输入标题" class="longer" />
      </el-form-item>
      <el-form-item label="栏目">
        <el-select v-model="articleData.categoryId" placeholder="请选择栏目">
          <el-option v-for="item in categoryList" :key="item.id" :label="item.title" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <div class="info"></div>
    <div class="content">
      <MdEditor v-model="articleData.content" theme="dark" style="height: 79vh" @onSave="onSave" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, reactive, ref } from 'vue'
/* MarkDown 渲染组件 */
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { addArticle, getArticleDeatil, getCategoryList, editArticle } from '@/api/index'
import { categoryListDatum } from '@/api/category/types'
import { addArticleData } from '@/api/article/types'
import { loadingScreen } from '@/utils/loading'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
/* 是否编辑状态 */
const isEdit = ref(false)
/* 栏目列表 */
const categoryList = ref([] as categoryListDatum[])
/* 获取栏目列表 */
const getCategoryListHandler = async () => {
  try {
    const res = await getCategoryList()
    categoryList.value = res.data
  } catch (error) {
    console.log(error)
  }
}
/* 文章详情 */
const articleData = ref({} as addArticleData)
const articleID = ref(0)
/* 获取路由文章 ID */
const getArticleID = () => {
  articleID.value = +route.query.id! as number
  if (!articleID.value) {
    isEdit.value = false
    return
  } else {
    isEdit.value = true
    getArticleDeatilHanlder(articleID.value)
  }
}
/* 获取文章详情 */
const getArticleDeatilHanlder = async (id: number) => {
  try {
    loadingScreen(true)
    const res = await getArticleDeatil({ id })
    articleData.value = res.data
  } catch (error) {
    console.log(error)
  }
  /* 停止 Loading 状态 */
  loadingScreen(false)
}
/* 保存文章 */
const onSave = async () => {
  try {
    loadingScreen(true)
    if (isEdit.value) {
      await editArticle(articleID.value, articleData.value)
      ElMessage.success('修改文章成功!')
    } else {
      /* 添加作者为当前登录用户 */
      articleData.value.author = localStorage.getItem('name') as string
      await addArticle(articleData.value)
      ElMessage.success('新增文章成功!')
    }
    router.push({ name: 'Home' })
  } catch (error) {
    console.log(error)
  }
  loadingScreen(false)
}
onMounted(() => {
  getArticleID()
  getCategoryListHandler()
})
</script>

<style lang="scss" scoped>
.edit {
  text-align: left;
  :deep(.el-form-item__label) {
    color: #bcbcbc;
  }
  :deep(.el-input__wrapper) {
    background-color: rgba($color: #fff, $alpha: 0.9);
  }
  .longer {
    width: 400px;
  }
}
</style>
