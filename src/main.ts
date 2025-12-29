// Vue应用入口文件
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import './styles/index.css'

// 创建Vue应用实例
const app = createApp(App)

// 使用状态管理插件
app.use(createPinia())
// 使用UI组件库
app.use(ElementPlus)
// 使用路由
app.use(router)
// 挂载应用到DOM
app.mount('#app')
