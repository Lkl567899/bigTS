
export {}


declare module 'vue' {
  export interface GlobalComponents {
    ElButton: typeof import('element-plus/es')['ElButton']
    ElCheckbox: typeof import('element-plus/es')['ElCheckbox']
    ElCol: typeof import('element-plus/es')['ElCol']
    ElForm: typeof import('element-plus/es')['ElForm']
    ElFormItem: typeof import('element-plus/es')['ElFormItem']
    ElInput: typeof import('element-plus/es')['ElInput']
    ElLink: typeof import('element-plus/es')['ElLink']
    ElRow: typeof import('element-plus/es')['ElRow']
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
  }
}
