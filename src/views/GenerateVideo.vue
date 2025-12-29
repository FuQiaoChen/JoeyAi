<template>
  <div class="generate-video-container">
    <el-card class="generate-video-card" shadow="always">
      <template #header>
        <div class="card-header">
          <span class="card-title">视频生成</span>
        </div>
      </template>
      
      <div class="content-wrapper">
        <div class="input-section">
          <el-form :model="form" label-width="120px" class="video-form">
            <el-form-item label="视频主题">
              <el-input 
                v-model="form.topic" 
                placeholder="请输入视频主题，例如：夏日海滩度假、城市夜景、美食制作等" 
                size="large"
              />
            </el-form-item>
            
            <el-form-item label="视频描述">
              <el-input 
                v-model="form.description" 
                type="textarea" 
                :rows="4"
                placeholder="详细描述您想要生成的视频内容，包括场景、人物、动作等"
              />
            </el-form-item>
            
            <el-form-item label="视频风格">
              <el-select v-model="form.style" placeholder="选择视频风格" class="style-select">
                <el-option label="纪录片风格" value="documentary" />
                <el-option label="电影风格" value="cinematic" />
                <el-option label="动画风格" value="animation" />
                <el-option label="短视频风格" value="short" />
                <el-option label="广告风格" value="commercial" />
                <el-option label="艺术风格" value="artistic" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="视频时长">
              <el-slider 
                v-model="form.duration" 
                :min="5" 
                :max="60" 
                :step="5"
                show-stops
                class="duration-slider"
              />
              <div class="duration-text">{{ form.duration }} 秒</div>
            </el-form-item>
            
            <el-form-item label="分辨率">
              <el-radio-group v-model="form.resolution">
                <el-radio-button label="720p" value="720p" />
                <el-radio-button label="1080p" value="1080p" />
                <el-radio-button label="4k" value="4k" />
              </el-radio-group>
            </el-form-item>
            
            <el-form-item>
              <el-button 
                type="primary" 
                size="large" 
                @click="generateVideo"
                :loading="loading"
                class="generate-btn"
              >
                生成视频
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        
        <div class="result-section">
          <div v-if="generatedVideos.length > 0" class="video-grid">
            <el-card 
              v-for="(video, index) in generatedVideos" 
              :key="index"
              class="video-card"
              shadow="hover"
            >
              <template #header>
                <div class="video-header">
                  <span>{{ video.title }}</span>
                  <div class="video-actions">
                    <el-button 
                      type="primary" 
                      size="small" 
                      @click="downloadVideo(video)"
                      icon="Download"
                    >
                      下载
                    </el-button>
                    <el-button 
                      type="success" 
                      size="small" 
                      @click="likeVideo(video)"
                      icon="Star"
                    >
                      喜欢
                    </el-button>
                  </div>
                </div>
              </template>
              
              <div class="video-container">
                <div class="video-placeholder">
                  <div class="video-icon">
                    <el-icon><VideoCamera /></el-icon>
                  </div>
                  <p>视频预览</p>
                </div>
                
                <div class="video-info">
                  <div class="video-stats">
                    <div class="stat-item">
                      <el-icon><Timer /></el-icon>
                      <span>{{ video.duration }}s</span>
                    </div>
                    <div class="stat-item">
                      <el-icon><Picture /></el-icon>
                      <span>{{ video.resolution }}</span>
                    </div>
                    <div class="stat-item">
                      <el-icon><Clock /></el-icon>
                      <span>{{ video.date }}</span>
                    </div>
                  </div>
                  
                  <div class="video-description">
                    <p>{{ video.description }}</p>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
          
          <div v-else class="placeholder-content">
            <el-empty description="暂无生成的视频" :image-size="200">
              <p>输入视频描述并点击生成开始创作</p>
            </el-empty>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { 
  VideoCamera, 
  Download, 
  Star, 
  Timer, 
  Picture, 
  Clock 
} from '@element-plus/icons-vue'

interface VideoForm {
  topic: string
  description: string
  style: string
  duration: number
  resolution: string
}

interface GeneratedVideo {
  id: number
  title: string
  description: string
  style: string
  duration: number
  resolution: string
  date: string
  url?: string
}

const form = reactive<VideoForm>({
  topic: '',
  description: '',
  style: 'cinematic',
  duration: 30,
  resolution: '1080p'
})

const loading = ref(false)
const generatedVideos = ref<GeneratedVideo[]>([])

const generateVideo = () => {
  if (!form.topic.trim()) {
    ElMessage.warning('请输入视频主题')
    return
  }
  
  if (!form.description.trim()) {
    ElMessage.warning('请输入视频描述')
    return
  }
  
  loading.value = true
  
  // Simulate API call delay
  setTimeout(() => {
    const newVideo: GeneratedVideo = {
      id: Date.now(),
      title: form.topic,
      description: form.description,
      style: form.style,
      duration: form.duration,
      resolution: form.resolution,
      date: new Date().toLocaleString()
    }
    
    generatedVideos.value = [newVideo]
    loading.value = false
    
    ElMessage.success('视频生成成功！')
    
    // Save to localStorage
    const savedVideos = JSON.parse(localStorage.getItem('generatedVideos') || '[]')
    savedVideos.push(newVideo)
    localStorage.setItem('generatedVideos', JSON.stringify(savedVideos))
  }, 3000)
}

const downloadVideo = (video: GeneratedVideo) => {
  ElMessage.success('视频下载功能将在后续版本中实现')
}

const likeVideo = (video: GeneratedVideo) => {
  ElMessage.success('视频已收藏！')
}
</script>

<style scoped>
.generate-video-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

.generate-video-card {
  border-radius: 16px;
  overflow: hidden;
  border: none;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #303133;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  box-sizing: border-box;
}

.input-section {
  padding-right: 20px;
}

.video-form {
  padding: 10px 0;
}

.style-select {
  width: 100%;
}

.duration-slider {
  width: 80%;
  margin-top: 10px;
}

.duration-text {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #909399;
}

.generate-btn {
  width: 100%;
  background: linear-gradient(135deg, #f56c6c 0%, #f78989 100%);
  border: none;
  font-size: 1.1rem;
  padding: 15px 20px;
  transition: all 0.3s ease;
}

.generate-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 12px rgba(245, 108, 108, 0.4);
}

.result-section {
  padding-left: 20px;
  border-left: 1px solid #e4e7ed;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.video-card {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.video-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1) !important;
}

.video-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.video-actions {
  display: flex;
  gap: 10px;
}

.video-container {
  display: flex;
  flex-direction: column;
}

.video-placeholder {
  width: 100%;
  height: 180px;
  background: linear-gradient(135deg, #f0f9ff, #e6f7ff);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.video-icon {
  font-size: 48px;
  color: #409eff;
  margin-bottom: 10px;
}

.video-info {
  padding-top: 10px;
}

.video-stats {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  color: #606266;
}

.video-description {
  font-size: 0.9rem;
  color: #909399;
  line-height: 1.5;
}

.placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  text-align: center;
}

/* 平板设备响应式设计 */
@media (max-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .input-section {
    padding-right: 0;
  }

  .result-section {
    padding-left: 0;
    border-left: none;
    border-top: 1px solid #e4e7ed;
    padding-top: 20px;
  }
}

/* 移动设备响应式设计 */
@media (max-width: 768px) {
  .generate-video-container {
    padding: 10px;
  }

  .video-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
  }

  .duration-slider {
    width: 100%;
  }

  .video-stats {
    justify-content: center;
    gap: 10px;
  }

  .stat-item {
    font-size: 0.8rem;
  }
}

/* 小屏移动设备响应式设计 */
@media (max-width: 480px) {
  .generate-video-container {
    padding: 10px 5px;
  }

  .card-title {
    font-size: 1.3rem;
  }

  .video-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .video-placeholder {
    height: 160px;
  }

  .video-icon {
    font-size: 40px;
  }

  .video-description {
    font-size: 0.85rem;
  }

  .generate-btn {
    font-size: 1rem;
    padding: 12px 15px;
  }
}
</style>