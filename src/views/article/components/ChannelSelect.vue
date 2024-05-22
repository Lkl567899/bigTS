<template>
    <el-select :modelValue="modelValue" @update:modelValue="emit('update:modelValue', $event)" v-for="item in cateList"
        :key="item.id">
        <el-option :label="item.cate_name" :value="item.id"></el-option>
    </el-select>

</template>

<script setup lang="ts">
import { GetMyCateListAPI } from '@/api/cate';
import type { cateItem } from '@/types/cate';
import { ref } from 'vue';
defineProps({
    modelValue: {
        type: [Number, String]
    }
})
const emit = defineEmits(['update:modelValue'])
const cateList = ref<cateItem[]>()
const getMyCateListData = async () => {
    const res = await GetMyCateListAPI()
    cateList.value = res.data
}
getMyCateListData()
</script>

<style scoped></style>