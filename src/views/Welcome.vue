<template>
  <div class="welcome-container">
    <el-card class="welcome-card" shadow="always">
      <div class="welcome-content">
        <div class="welcome-header">
          <h1 class="welcome-title">欢迎来到 JoeyAI</h1>
          <p class="welcome-subtitle">探索AI无限可能</p>
        </div>

        <div class="features-grid">
          <el-card
            v-for="feature in features"
            :key="feature.title"
            class="feature-card"
            shadow="hover"
            @click="navigateToFeature(feature.route)"
          >
            <div class="feature-icon">
              <el-icon :size="40" :color="feature.color">
                <component :is="feature.icon" />
              </el-icon>
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-desc">{{ feature.description }}</p>
          </el-card>
        </div>

        <div class="cta-section">
          <el-button
            type="primary"
            size="large"
            @click="startExploring"
            class="explore-btn"
          >
            开始探索
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { 
  ChatLineRound, 
  Picture, 
  VideoCamera, 
  Sunny, 
  Coffee, 
  Notebook 
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

interface Feature {
  title: string;
  description: string;
  icon: any;
  color: string;
  route: string;
}

const router = useRouter()

const features: Feature[] = [
  {
    title: '智能对话',
    description: '与AI进行自然流畅的对话，解答各种问题',
    icon: ChatLineRound,
    color: '#409eff',
    route: '/chat'
  },
  {
    title: '文生图',
    description: '将文字描述转化为精美的图像作品',
    icon: Picture,
    color: '#67c23a',
    route: '/text-to-image'
  },
  {
    title: '图生图',
    description: '基于现有图像进行创意编辑和转换',
    icon: Sunny,
    color: '#e6a23c',
    route: '/image-to-image'
  },
  {
    title: '视频生成',
    description: '从文本或图像生成动态视频内容',
    icon: VideoCamera,
    color: '#f56c6c',
    route: '/generate-video'
  },
  {
    title: '小红书内容',
    description: '生成适合小红书平台的优质内容',
    icon: Coffee,
    color: '#9068ff',
    route: '/xiaohongshu'
  },
  {
    title: '创意工具',
    description: '更多AI驱动的创意工具等你发现',
    icon: Notebook,
    color: '#409eff',
    route: '/chat' // 默认跳转到聊天页面
  }
]

const startExploring = () => {
  router.push('/chat')
}

const navigateToFeature = (route: string) => {
  router.push(route)
}
</script>

<style scoped>
.welcome-container {
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e0f7fa, #f3e5f5, #e8f5e9);
  box-sizing: border-box;
}

.welcome-card {
  width: 100%;
  max-width: 1200px;
  border-radius: 16px;
  overflow: hidden;
  border: none;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  box-sizing: border-box;
}

.welcome-content {
  padding: 40px;
  text-align: center;
  box-sizing: border-box;
}

.welcome-header {
  margin-bottom: 40px;
}

.welcome-title {
  font-size: 2.8rem;
  margin: 0 0 15px 0;
  background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.welcome-subtitle {
  font-size: 1.4rem;
  color: #606266;
  margin: 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin: 40px 0;
  box-sizing: border-box;
}

.feature-card {
  text-align: center;
  padding: 30px 20px;
  border-radius: 12px;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-sizing: border-box;
  min-height: 220px;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 14px 24px rgba(0, 0, 0, 0.12) !important;
}

.feature-icon {
  margin-bottom: 20px;
}

.feature-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: #303133;
}

.feature-desc {
  font-size: 1rem;
  color: #909399;
  margin: 0;
  line-height: 1.6;
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.cta-section {
  margin-top: 30px;
}

.explore-btn {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border: none;
  font-size: 1.2rem;
  padding: 16px 40px;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.explore-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(79, 172, 254, 0.4);
}

/* 响应式设计 - 平板设备 */
@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .welcome-content {
    padding: 30px 20px;
  }

  .welcome-title {
    font-size: 2.4rem;
  }

  .welcome-subtitle {
    font-size: 1.2rem;
  }
}

/* 响应式设计 - 移动设备 */
@media (max-width: 768px) {
  .welcome-container {
    padding: 10px;
  }

  .welcome-content {
    padding: 20px 15px;
  }

  .welcome-title {
    font-size: 2rem;
  }

  .welcome-subtitle {
    font-size: 1.1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .feature-card {
    padding: 20px 15px;
    min-height: 200px;
  }

  .feature-title {
    font-size: 1.2rem;
  }

  .feature-desc {
    font-size: 0.9rem;
  }

  .explore-btn {
    width: 100%;
    font-size: 1.1rem;
    padding: 14px 20px;
  }
}

/* 小屏移动设备 */
@media (max-width: 480px) {
  .welcome-content {
    padding: 15px 10px;
  }

  .welcome-title {
    font-size: 1.8rem;
  }

  .welcome-subtitle {
    font-size: 1rem;
  }

  .feature-card {
    padding: 15px 10px;
    min-height: 180px;
  }

  .feature-icon {
    margin-bottom: 15px;
  }

  .feature-title {
    font-size: 1.1rem;
  }

  .feature-desc {
    font-size: 0.85rem;
  }

  .explore-btn {
    font-size: 1rem;
    padding: 12px 15px;
  }
}
</style>