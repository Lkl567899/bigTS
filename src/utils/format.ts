import { dayjs } from "element-plus";
export const formatTime = (time: string) => dayjs(time).format("YYYY年MM月DD日");
