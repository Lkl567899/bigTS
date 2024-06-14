<template>
    <page-container title="重置密码">
        <el-row>
            <el-col :span="12">
                <el-form label-width="100px" size="large" ref="formRef" :model="pwdFrom" :rules="rules">
                    <el-form-item label="原密码" prop="old_pwd">
                        <el-input v-model="pwdFrom.old_pwd"> </el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="new_pwd">
                        <el-input v-model="pwdFrom.new_pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="re_pwd">
                        <el-input v-model="pwdFrom.re_pwd"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">修改密码</el-button>
                        <el-button @click="resetAPI">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </page-container>
</template>

<script setup lang="ts">
import { PatchMyUupdatepwdAPI } from '@/api/user';
import { useUserStore } from '@/stores';
import type { FormRules, FormInstance } from 'element-plus'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const formRef = ref<FormInstance>()
type pwdfrom = {
    old_pwd: string;
    new_pwd: string;
    re_pwd: string;
}
const pwdFrom = ref<pwdfrom>({
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
})
//原密码和新密码不能一样
const checkOldSame = (rule: any, value: any, cb: any) => {
    if (value === pwdFrom.value.old_pwd) {
        cb(new Error('原密码和新密码不能一样'))
    } else {
        cb()
    }
}
//新密码和确认再次输入的新密码不一样
const checkNewSame = (rule: any, value: any, cb: any) => {
    if (value !== pwdFrom.value.new_pwd) {
        cb(new Error('新密码和确认再次输入的新密码不一样'))
    } else if (value === pwdFrom.value.old_pwd) {
        cb(new Error('原密码和新密码一样,请从新输入'))
    } else {
        cb()
    }
}
const rules = <FormRules<pwdfrom>>{
    old_pwd: [
        { required: true, message: "请输入原密码", trigger: 'blur' },
        {
            pattern: /^\S{6,15}$/,
            message: '密码长度必须是6-15位的非空字符串',
            trigger: 'blur'
        }
    ],
    new_pwd: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        {
            pattern: /^\S{6,15}$/,
            message: '密码长度必须是6-15位的非空字符串',
            trigger: 'blur'
        },
        { validator: checkOldSame, trigger: 'blur' }
    ],
    re_pwd: [
        { required: true, message: '请再次确认新密码', trigger: 'blur' },
        {
            pattern: /^\S{6,15}$/,
            message: '密码长度必须是6-15位的非空字符串',
            trigger: 'blur'
        },
        { validator: checkNewSame, trigger: 'blur' }
    ]
}
const userStore = useUserStore()
const router = useRouter()
//修改密码
const onSubmit = async () => {
    await formRef.value?.validate()
    await PatchMyUupdatepwdAPI(pwdFrom.value)
    userStore.setToken('')
    userStore.setUserInfo()
    router.push('/login')
}
//重置
const resetAPI = () => {
    formRef.value?.resetFields()
}
</script>

<style scoped></style>