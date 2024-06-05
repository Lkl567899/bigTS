<template>
    <page-container title="更换头像">
        <el-row>
            <el-col :span="12">
                <el-upload ref="uploadRef" class="avatar-uploader" :auto-upload="false" :show-file-list="false"
                    :on-change="onUploadFile">
                    <img v-if="imgUrl" :src="imgUrl" class="avatar" />
                    <img v-else src="@/assets/maomao.webp" width="278" />
                </el-upload>
                <br>
                <el-button type="primary" size="large"
                    @click="uploadRef.$el.querySelector('input').click()">选择图片</el-button>
                <el-button type="success" size="large" @click="goAvatar">上传头像</el-button>
            </el-col>
        </el-row>
    </page-container>
</template>

<script setup lang="ts">
import { PatchMyUpdateAvatarAPI } from '@/api/user';
import { useUserStore } from '@/stores';
import { ref } from 'vue';
const userStore = useUserStore()
const uploadRef = ref()
const imgUrl = ref<any>(userStore.userInfo?.user_pic)
//换头像
const onUploadFile = (file: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(file.raw)
    reader.onload = () => {
        imgUrl.value = reader.result
    }
}
//上传头像
const goAvatar = async () => {
    await PatchMyUpdateAvatarAPI(imgUrl.value)
    await userStore.getUserInfo()
}
</script>

<style scoped lang="scss">
.avatar-uploader {
    :deep() {
        .avatar {
            width: 278px;
            height: 278px;
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
            width: 278px;
            height: 278px;
            text-align: center;
        }
    }
}
</style>