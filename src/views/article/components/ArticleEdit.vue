<template>
    <!-- 抽屉 -->
    <el-drawer v-model="visibleDrawer" :title="formModel.id ? '编辑文章' : '添加文章'" direction="rtl" size="50%">
        <!-- 发表文章表单 -->
        <el-form :model="formModel" ref="formRef" label-width="100px">
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="文章分类" prop="cate_id">
                <channel-select v-model="formModel.cate_id" width="100%"></channel-select>
            </el-form-item>
            <el-form-item label="文章封面" prop="cover_img"> <el-upload class="avatar-uploader" :auto-upload="false"
                    :show-file-list="false" :on-change="onUploadFile">
                    <img v-if="imgUrl" :src="imgUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload> </el-form-item>
            <el-form-item label="文章内容" prop="content">
                <div class="editor">
                    <quill-editor ref="editorRef" theme="snow" v-model:content="formModel.content" contentType="html">
                    </quill-editor>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onPublish('已发布')">发布</el-button>
                <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script setup lang="ts">
const emit = defineEmits(['success'])
import { Plus } from '@element-plus/icons-vue'
import ChannelSelect from './ChannelSelect.vue';
import { PostMyArticleAddAPI, artGetDetailService, artEditService } from '@/api/article'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { ref } from 'vue';
import axios from 'axios';
const imgUrl = ref('')
const onUploadFile = (uploadFile: any) => {
    imgUrl.value = URL.createObjectURL(uploadFile.raw)
    formModel.value.cover_img = uploadFile.raw
}
//默认参数
const defaultForm = {
    id: '',
    title: '',
    cate_id: '',
    cover_img: '',
    content: '',
    state: ''
}
const formModel = ref<any>({
    ...defaultForm
})
const baseURL = 'http://big-event-vue-api-t.itheima.net'
//控制抽屉的显示隐藏
const visibleDrawer = ref(false)
const editorRef = ref()
// 将网络图片地址转换为File对象
async function imageUrlToFile(url: string, fileName: string) {
    try {
        // 第一步：使用axios获取网络图片数据
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const imageData = response.data;

        // 第二步：将图片数据转换为Blob对象
        const blob = new Blob([imageData], { type: response.headers['content-type'] });

        // 第三步：创建一个新的File对象
        const file = new File([blob], fileName, { type: blob.type });

        return file;
    } catch (error) {
        console.error('将图片转换为File对象时发生错误:', error);
        throw error;
    }
}
//暴露方法
const open = async (row: any) => {
    visibleDrawer.value = true
    if (row.id) {

        const res = await artGetDetailService(row.id)
        formModel.value = res.data

        imgUrl.value = baseURL + formModel.value.cover_img
        // 提交给后台，需要的是 file 格式的，将网络图片，转成 file 格式
        // 网络图片转成 file 对象, 需要转换一下
        formModel.value.cover_img = await imageUrlToFile(imgUrl.value, formModel.value.cover_img)
    } else {

        formModel.value = { ...defaultForm }
        imgUrl.value = ''
        editorRef.value.setHTML('')
    }

}
//添加文章
const onPublish = async (state: string) => {
    formModel.value.state = state
    // 转换 formData 数据
    const fd = new FormData()
    for (let key in formModel.value) {
        fd.append(key, formModel.value[key])
    }
    if (formModel.value.id) {
        //编辑
        await artEditService(fd)
        visibleDrawer.value = false
        emit('success', 'edit')
    } else {
        //发布
        await PostMyArticleAddAPI(fd)
        visibleDrawer.value = false
        emit('success', 'add')
    }
}
defineExpose({
    open
})
</script>

<style scoped lang="scss">
.avatar-uploader {
    :deep() {
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            text-align: center;
        }
    }
}

.editor {
    width: 100%;

    :deep(.ql-editor) {
        min-height: 200px;
    }
}
</style>