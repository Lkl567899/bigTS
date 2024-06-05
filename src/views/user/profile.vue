<template>
    <page-container title="个人详情">
        <el-row>
            <el-col :span="12">
                <el-form :model="form" :rules="rules" ref="formRef">
                    <el-form-item label="登录名称">
                        <el-input disabled v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名称" prop="nickname">
                        <el-input v-model="form.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="用户邮箱" prop="email">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="goBack">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </page-container>
</template>

<script setup lang="ts">

import { useUserStore } from '@/stores';
const userStore = useUserStore()
import { ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { PutMyUserinfoAPI } from '@/api/user';
const formRef = ref<FormInstance>()
const form = ref({
    username: userStore.userInfo?.username,
    nickname: userStore.userInfo?.nickname,
    email: userStore.userInfo?.email,
    id: userStore.userInfo?.id
})
const rules = <FormRules>{
    nickname: [
        { required: true, message: '请输入用户昵称', trigger: 'blur' },
        {
            pattern: /^\S{2,10}$/,
            message: '昵称必须是2-10位的非空字符串',
            trigger: 'blur'
        }
    ],
    email: [
        { required: true, message: '请输入用户邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ]
}
//提交修改
const goBack = async () => {
    await formRef.value?.validate()
    await PutMyUserinfoAPI({
        id: form.value.id,
        nickname: form.value.nickname,
        email: form.value.email
    })
    await userStore.getUserInfo()
}
</script>

<style scoped></style>