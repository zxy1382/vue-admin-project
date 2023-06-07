<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>欢迎来到东方甄选</h2>
          <el-form-item>
            <el-input
              :prefix-icon="User"
              clearable
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              :prefix-icon="Lock"
              clearable
              show-password
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
              :loading="loading"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';
import useUserStore from '@/store/modules/user';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
import { getTime } from '@/utils/time';

const loading = ref(false);

const userStore = useUserStore();
const $router = useRouter();

const loginForm = reactive({ username: 'admin', password: '111111' });

const login = async () => {
  loading.value = true;
  //通知仓库发送登录请求
  //成功->进入首页展示数据
  //失败->提示信息
  try {
    await userStore.userLogin(loginForm);
    loading.value = false;
    $router.push('/');
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `Hi,${getTime()}好`,
    });
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    });
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}
.login_form {
  width: 80%;
  top: 30vh;
  position: relative;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 40px;
  h1 {
    color: #fff;
    font-size: 40px;
  }
  h2 {
    color: #fff;
    font-size: 20px;
    margin: 20px 0;
  }
  .login_btn {
    width: 100%;
  }
}
@media (width<=768px) {
  .login_form {
    width: 90%;
    margin: 0 20px;
  }
}
</style>
