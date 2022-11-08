<template>
  <el-scrollbar height="100vh">
    <el-container>
      <el-header height="77.5px">
        <navHeader />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer height="30px">
        <a href="https://hchow.icu" target="_blank" class="footerText">© 2022 hchow.icu</a>
      </el-footer>
    </el-container>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import navHeader from './components/APP/navHeader.vue'

export default defineComponent({
  name: 'APP',
  components: {
    navHeader
  }
})
</script>

<style>
#nprogress .bar {
  background: yellow !important;
}
.el-header {
  padding: 0 !important;
}
.footerText {
  text-decoration: none;
  line-height: 30px;
  font-size: 12px;
  font-weight: lighter;
  color: #888;
}
.el-scrollbar__bar.is-vertical {
  width: 4px !important;
}
</style>
