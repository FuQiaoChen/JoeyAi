// 路由配置文件
import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '@/views/Welcome.vue'
import Chat from '@/views/Chat.vue'
import TextToImage from '@/views/TextToImage.vue'
import ImageToImage from '@/views/ImageToImage.vue'
import GenerateVideo from '@/views/GenerateVideo.vue'
import Xiaohongshu from '@/views/Xiaohongshu.vue'

// 定义路由配置
const routes = [
  { path: '/', name: 'Welcome', component: Welcome }, // 欢迎页面
  { path: '/chat', name: 'Chat', component: Chat }, // 聊天页面
  { path: '/text-to-image', name: 'TextToImage', component: TextToImage }, // 文生图页面
  { path: '/image-to-image', name: 'ImageToImage', component: ImageToImage }, // 图生图页面
  { path: '/generate-video', name: 'GenerateVideo', component: GenerateVideo }, // 视频生成页面
  { path: '/xiaohongshu', name: 'Xiaohongshu', component: Xiaohongshu }, // 小红书内容页面
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 使用HTML5历史模式
  routes // 注册路由
})

export default router
