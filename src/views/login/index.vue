<template>
    <div>
        <el-row class="login-page">
            <el-col :span="12" class="bg"></el-col>
            <el-col :span="6" :offset="3" class="form">
                <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="formModel" :rules="rules">
                    <el-form-item>
                        <h1>注册</h1>
                    </el-form-item>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="formModel.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input :prefix-icon="Lock" v-model="formModel.password" type="password"
                            placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="repassword">
                        <el-input :prefix-icon="Lock" v-model="formModel.repassword" type="password"
                            placeholder="请输入再次密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="button" type="primary" @click="goRegister" auto-insert-space>
                            注册
                        </el-button>
                    </el-form-item>
                    <el-form-item class="flex">
                        <el-link type="info" :underline="false" @click="isRegister = false">
                            ← 返回
                        </el-link>
                    </el-form-item>
                </el-form>
                <!-- 登录 -->
                <el-form ref="form" size="large" autocomplete="off" :model="formModel" :rules="rules" v-else>
                    <el-form-item>
                        <h1>登录</h1>
                    </el-form-item>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="formModel.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input name="password" :prefix-icon="Lock" v-model="formModel.password" type="password"
                            placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item class="flex">
                        <div class="flex">
                            <el-checkbox>记住我</el-checkbox>
                            <el-link type="primary" :underline="false">忘记密码？</el-link>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="button" type="primary" @click="goLogin" auto-insert-space>登录</el-button>
                    </el-form-item>
                    <el-form-item class="flex">
                        <el-link type="info" :underline="false" @click="isRegister = true">
                            注册 →
                        </el-link>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import type { FormRules, FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue';
import { PostgoRegisterAPI, PostApiLoginAPI } from '@/api/login'
import { useUserStore } from '@/stores';
import { useRouter } from 'vue-router';
const form = ref<FormInstance>()

const isRegister = ref(false)
type RuleForm = {
    username: string,
    password: string,
    repassword: string
}
const formModel = ref<RuleForm>({
    username: '',
    password: '',
    repassword: ''
})
//切换时刷新
watch(isRegister, () => {
    formModel.value = {
        username: '',
        password: '',
        repassword: ''
    }
})
const rules = <FormRules<RuleForm>>{
    username: [{
        required: true, message: '请输入用户名', trigger: 'blur'
    },
    { min: 5, max: 10, message: '用户名必须是5-10位的字符', trigger: 'blur' }],
    password: [{
        required: true, message: '请输入密码', trigger: 'blur'
    }, {
        pattern: /^\S{6,15}$/,
        message: '密码必须是6-15位的非空字符',
        trigger: 'blur'
    }],
    repassword: [{
        required: true, message: '请再次输入密码', trigger: 'blur'
    }, {
        pattern: /^\S{6,15}$/,
        message: '密码必须是6-15的非空字符',
        trigger: 'blur'
    }, {
        validator: (rule, value, callback) => {
            if (value !== formModel.value.password) {
                callback(new Error('两次输入的密码不一致'))
            } else {
                callback()
            }
        }
    }
    ]
}
//去注册
const goRegister = async () => {
    await form.value?.validate()
    await PostgoRegisterAPI(formModel.value)
    // // 切换到登录
    isRegister.value = false
}
const useStore = useUserStore()
const router = useRouter()
//去登录
const goLogin = async () => {
    await form.value?.validate()
    const res = await PostApiLoginAPI(formModel.value)
    console.log(res);
    useStore.setToken(res.token)
    router.push('/')

}
</script>

<style scoped lang="scss">
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        background: url('@/assets/azi.webp') no-repeat center / auto;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>