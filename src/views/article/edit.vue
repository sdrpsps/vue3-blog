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
import { addArticle, getCategoryList } from '@/api/index'
import { categoryListDatum } from '@/api/category/types'
import { addArticleData } from '@/api/article/types'
import { loadingScreen } from '@/utils/loading'

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
const articleData = reactive({} as addArticleData)
/* 保存文章 */
const onSave = async () => {
  try {
    loadingScreen(true)
    await addArticle(articleData)
  } catch (error) {
    console.log(error)
  }
  loadingScreen(false)
}
onMounted(() => {
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
