<template>
    <el-dialog v-model="dialogVisible" :title="ruleForm.id ? '编辑分类' : '新建分类'" width="30%">
        <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef">
                <el-form-item label="分类名称" prop="cate_name">
                    <el-input autocomplete="off" v-model="ruleForm.cate_name" />
                </el-form-item>
                <el-form-item label="分类别名" prop="cate_alias">
                    <el-input autocomplete="off" v-model="ruleForm.cate_alias" />
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="onSubmit"> 确认 </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import type { cateItem, ruleTpye } from '@/types/cate';
import { PutMyCateListAPI, PostMyCateAddAPI } from '@/api/cate'
const ruleFormRef = ref<FormInstance>()
const rules = <FormRules<ruleTpye>>{
    cate_name: [{
        required: true, message: '请输入分类名称', trigger: 'blur'
    },
    { min: 1, max: 15, message: '分类名称必须是1-15位的字符', trigger: 'blur' }],
    cate_alias: [{
        required: true, message: '请输入分类别名', trigger: 'blur'
    },
    { min: 1, max: 15, message: '分类别名必须是1-15位的字符', trigger: 'blur' }]
}
const ruleForm = ref<cateItem>({
    cate_name: '',
    cate_alias: '',
    id: 0
})

const dialogVisible = ref(false)
const open = (row: cateItem) => {
    dialogVisible.value = true
    ruleForm.value = { ...row }
}
//修改or新增
const emit = defineEmits(['success'])
const onSubmit = async () => {
    await ruleFormRef.value?.validate()
    if (ruleForm.value.id) {
        await PutMyCateListAPI(ruleForm.value)
        dialogVisible.value = false
        emit('success')
    } else {
        const res = await PostMyCateAddAPI(ruleForm.value)
        dialogVisible.value = false
        emit('success')
    }
}
defineExpose({
    open
})
</script>

<style scoped></style>