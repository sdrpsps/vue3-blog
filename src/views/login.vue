<template>
  <div class="login">
    <div class="loginForm" v-if="activeName === 'login'">
      <el-form label-position="top" label-width="100px" :model="loginForm" ref="loginFormRef" :rules="loginFormRules">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="loginForm.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLoginForm(loginFormRef)">登录</el-button>
          <el-button @click="resetLoginForm(loginFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="registerForm" v-else>
      <el-form label-position="top" label-width="100px" :model="registerForm" ref="registerFormRef" :rules="registerFormRules">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerForm.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="password_confirm">
          <el-input v-model="registerForm.password_confirm" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitRegisterForm(registerFormRef)">注册</el-button>
          <el-button @click="resetRegisterForm(registerFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage, FormInstance, FormRules, TabsPaneContext } from 'element-plus'
import { defineComponent, onMounted, reactive, ref, toRaw } from 'vue'
import { login, register } from '@/api'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'
import { loadingScreen } from '@/utils/loading'

export default defineComponent({
  setup() {
    const router = useRouter()
    /* 获取路由参数 */
    const getFormType = () => {
      const type = toRaw(router).currentRoute.value.query.type as string
      activeName.value = type
    }
    /* 路由参数改变时 */
    onBeforeRouteUpdate((to, from) => {
      activeName.value = to.query.type as string
    })
    /* tabs */
    const activeName = ref('login')
    /* 登录表单 */
    const loginForm = reactive({
      name: '',
      password: ''
    })
    const loginFormRef = ref<FormInstance>()
    const loginFormRules = reactive<FormRules>({
      name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      ]
    })
    const userStore = useUserStore()
    // 提交登录表单
    const submitLoginForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate(async (valid) => {
        if (valid) {
          loadingScreen(true)
          try {
            const res = await login(loginForm)
            ElMessage.success('登录成功!')
            localStorage.setItem('token', res.data.token)
            userStore.changeLoginStatus(true)
            router.push({ name: 'Home' })
          } catch (error) {
            console.log(error)
          }
        }
        loadingScreen(false)
      })
    }
    // 重置登录表单
    const resetLoginForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }
    /* 注册表单 */
    const registerForm = reactive({
      name: '',
      password: '',
      password_confirm: ''
    })
    const registerFormRef = ref<FormInstance>()
    const registerFormRules = reactive<FormRules>({
      name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      ],
      password_confirm: [
        {
          required: true,
          message: '请输入确认密码',
          trigger: 'blur'
        }
      ]
    })
    // 提交注册表单
    const submitRegisterForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate(async (valid) => {
        if (valid) {
          loadingScreen(true)
          try {
            await register(registerForm)
            ElMessage.success('注册成功,请登录!')
            activeName.value = 'login'
          } catch (error) {
            console.log(error)
          }
          loadingScreen(false)
        }
      })
    }
    // 重置注册表单
    const resetRegisterForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }

    onMounted(() => {
      getFormType()
    })
    return {
      activeName,
      loginForm,
      loginFormRef,
      loginFormRules,
      submitLoginForm,
      resetLoginForm,
      registerForm,
      registerFormRef,
      registerFormRules,
      submitRegisterForm,
      resetRegisterForm
    }
  },
  watch: {}
})
</script>

<style lang="scss" scoped>
.login {
  padding: 40px;
  width: 400px;
  border-radius: 6px;
  background-color: #23272d;
  margin: 0 auto;
  :deep(.el-form-item__label) {
    color: #bcbcbc;
  }
  :deep(.el-input__wrapper) {
    background-color: rgba($color: #fff, $alpha: 0.9);
  }
}
</style>
