import { GetMyUserinfoAPI } from "@/api/user";
import type { userItem } from "@/types/user";
import { defineStore } from "pinia";
import { ref } from "vue";
//用户模块
export const useUserStore = defineStore(
  "big-user",
  () => {
    const token = ref<string>();
    const setToken = (t: string) => (token.value = t); // 设置 token
    const userInfo = ref<userItem>();
    const getUserInfo = async () => {
      const res = await GetMyUserinfoAPI();
      userInfo.value = res.data;
    };
    const setUserInfo = () => {
      userInfo.value = {
        id: 0,
        username: "",
        nickname: "",
        email: "",
        user_pic: "",
      };
    };
    return {
      token,
      setToken,
      userInfo,
      getUserInfo,
      setUserInfo,
    };
  },
  {
    persist: true, // 持久化
  }
);
