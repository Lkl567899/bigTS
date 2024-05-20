<template>
    <page-container title="文章分类">
        <template #extra>
            <el-button type="primary" @click="onAddChannel"> 添加分类 </el-button>
        </template>
        <el-table style="width: 100%" :data="cateList" v-loading="loading">
            <el-table-column type="index" label="序号" width="180" />
            <el-table-column prop="cate_name" label="分类名称" />
            <el-table-column prop="cate_alias" label="分类别名" />
            <el-table-column label="操作" width="180">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">
                        编辑
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 弹窗 -->
        <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
    </page-container>
</template>

<script setup lang="ts">
import { GetMyCateListAPI } from '@/api/cate'
import ChannelEdit from './components/ChannelEdit.vue'
import type { cateItem } from '@/types/cate';
import { DeleteMyCateDelAPI } from '@/api/cate'
import { ref } from 'vue';
const loading = ref(false)
const dialog = ref()
const cateList = ref<cateItem[]>()
const GetMyCateListData = async () => {
    loading.value = true
    const res = await GetMyCateListAPI()
    cateList.value = res.data
    loading.value = false
}
GetMyCateListData()
type rowType = {
    id: number,
    cate_name: string,
    cate_alias: string
}
//编辑
const handleEdit = (row: rowType) => {
    dialog.value.open(row)
}
//删除
const handleDelete = async (row: rowType) => {
    await DeleteMyCateDelAPI(row.id)
    GetMyCateListData()
}
//添加
const onAddChannel = () => {
    dialog.value.open({})
}
//回显
const onSuccess = () => {
    GetMyCateListData()
}
</script>

<style scoped></style>