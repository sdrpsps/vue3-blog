<template>
  <div class="login">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="登录" name="login">
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
      </el-tab-pane>
      <el-tab-pane label="注册" name="register">
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { ElMessage, FormInstance, FormRules, TabsPaneContext } from 'element-plus'
import { defineComponent, onMounted, reactive, ref, toRaw } from 'vue'
import { login, register } from '@/api'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'

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
    const handleClick = (tab: TabsPaneContext) => {
      activeName.value = tab.paneName as string
    }
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
          try {
            await register(registerForm)
            ElMessage.success('注册成功,请登录!')
            activeName.value = 'login'
          } catch (error) {
            console.log(error)
          }
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
      handleClick,
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
  background-color: #fff;
  box-shadow: 12px 12px 0 0 #262626;
  margin: 0 auto;
}
</style>
