<template>
    <page-container title="文章管理">
        <template #extra>
            <el-button type="primary"> 发布文章 </el-button>
        </template>
        <el-form inline>
            <el-form-item label="文章分类:" style="width: 200px;">
                <ChannelSelect v-model="params.cate_id"></ChannelSelect>
            </el-form-item>
            <el-form-item label="发布状态:" style="width: 200px;">
                <el-select v-model="params.state">
                    <el-option label="已发布" value="已发布"></el-option>
                    <el-option label="草稿" value="草稿"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">搜索</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
        <el-table style="width: 100%" :data="data" v-loading="loading">
            <el-table-column label="文章标题">
                <template #default="{ row }">
                    <el-link type="primary" :underline="false">{{ row.title }}</el-link>
                </template>
            </el-table-column>
            <el-table-column label="分类" prop="cate_name" />
            <el-table-column label="发表时间" prop="pub_date">
                <template #default="{ row }">
                    {{ formatTime(row.pub_date) }}
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="state" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" @click="manageEdit(scope.row)">
                        编辑
                    </el-button>
                    <el-button size="small" type="danger" @click="manageDelete(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="params.pagenum" v-model:page-size="params.pagesize"
            :page-sizes="[2, 3, 4, 5, 10]" layout="jumper, total, sizes, prev, pager, next" background :total="total"
            @size-change="onSizeChange" @current-change="onCurrentChange"
            style="margin-top: 20px; justify-content: flex-end" />
    </page-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChannelSelect from './components/ChannelSelect.vue'
import type { articleItem, paramsType } from '@/types/article';
import { GetMyArticleListAPI } from '@/api/article';
import { formatTime } from '@/utils/format'
const loading = ref(false)
//获取文章列表数据时需提供的参数
const params = ref<paramsType>({
    pagenum: 1,
    pagesize: 5,
    cate_id: '',
    state: ''
})
const total = ref<number>()
const data = ref<articleItem[]>()
//获取文章列表数据
const GetMyArticleListData = async () => {
    loading.value = true
    const res = await GetMyArticleListAPI(params.value)
    data.value = res.data
    total.value = res.total
    loading.value = false
}
GetMyArticleListData()

//编辑
const manageEdit = (row: any) => {
    console.log(row);
}
//删除
const manageDelete = (row: any) => {

}
//当前是第几页
const onCurrentChange = (val: number) => {
    params.value.pagenum = val
    GetMyArticleListData()
}
// 每页几条
const onSizeChange = (val: number) => {
    params.value.pagenum = 1
    params.value.pagesize = val
    GetMyArticleListData()

}
</script>

<style lang="scss">
.el-table .el-table__cell {
    padding: 15px 0
}
</style>