<template>
  <div class="text-to-image-container">
    <el-card class="text-to-image-card" shadow="always">
      <template #header>
        <div class="card-header">
          <span class="card-title">文生图</span>
        </div>
      </template>
      
      <div class="content-wrapper">
        <div class="input-section">
          <el-form :model="form" label-width="100px" class="text-to-image-form">
            <el-form-item label="描述文本">
              <el-input 
                v-model="form.prompt" 
                type="textarea" 
                :rows="4"
                placeholder="请输入您想要生成的图像描述，例如：一只在花园里玩耍的金毛犬，阳光明媚，高清画质"
                maxlength="500"
                show-word-limit
              />
            </el-form-item>
            
            <el-form-item label="图像风格">
              <el-select v-model="form.style" placeholder="选择图像风格" class="style-select">
                <el-option label="现实主义" value="realistic" />
                <el-option label="动漫风格" value="anime" />
                <el-option label="水彩画" value="watercolor" />
                <el-option label="油画" value="oil" />
                <el-option label="素描" value="sketch" />
                <el-option label="卡通" value="cartoon" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="图像尺寸">
              <el-radio-group v-model="form.size">
                <el-radio-button label="512x512" value="512x512" />
                <el-radio-button label="768x768" value="768x768" />
                <el-radio-button label="1024x1024" value="1024x1024" />
              </el-radio-group>
            </el-form-item>
            
            <el-form-item label="生成数量">
              <el-slider 
                v-model="form.count" 
                :min="1" 
                :max="4" 
                :step="1"
                show-stops
                class="count-slider"
              />
              <div class="count-text">{{ form.count }} 张</div>
            </el-form-item>
            
            <el-form-item>
              <el-button 
                type="primary" 
                size="large" 
                @click="generateImage"
                :loading="loading"
                class="generate-btn"
              >
                生成图像
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        
        <div class="result-section">
          <div v-if="generatedImages.length > 0" class="image-grid">
            <el-card 
              v-for="(image, index) in generatedImages" 
              :key="index"
              class="image-card"
              shadow="hover"
            >
              <template #header>
                <div class="image-header">
                  <span>图像 {{ index + 1 }}</span>
                  <el-button 
                    type="primary" 
                    size="small" 
                    @click="downloadImage(image)"
                    icon="Download"
                  >
                    下载
                  </el-button>
                </div>
              </template>
              <div class="image-container">
                <img :src="image.url" :alt="`Generated image ${index + 1}`" class="generated-image" />
              </div>
              <div class="image-actions">
                <el-button type="success" size="small" @click="likeImage(image)" icon="Star">喜欢</el-button>
                <el-button type="info" size="small" @click="shareImage(image)" icon="Share">分享</el-button>
              </div>
            </el-card>
          </div>
          
          <div v-else class="placeholder-content">
            <el-empty description="暂无生成的图像" :image-size="200">
              <p>输入描述并点击生成图像开始创作</p>
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
import { Download, Star, Share } from '@element-plus/icons-vue'

interface TextToImageForm {
  prompt: string
  style: string
  size: string
  count: number
}

interface GeneratedImage {
  id: number
  url: string
  prompt: string
  style: string
  date: string
}

const form = reactive<TextToImageForm>({
  prompt: '',
  style: 'realistic',
  size: '512x512',
  count: 1
})

const loading = ref(false)
const generatedImages = ref<GeneratedImage[]>([])

const generateImage = () => {
  if (!form.prompt.trim()) {
    ElMessage.warning('请输入图像描述')
    return
  }
  
  loading.value = true
  
  // Simulate API call delay
  setTimeout(() => {
    const newImages: GeneratedImage[] = []
    
    for (let i = 0; i < form.count; i++) {
      newImages.push({
        id: Date.now() + i,
        url: `https://picsum.photos/seed/${Date.now() + i}/${form.size.split('x')[0]}/${form.size.split('x')[1]}`,
        prompt: form.prompt,
        style: form.style,
        date: new Date().toLocaleString()
      })
    }
    
    generatedImages.value = newImages
    loading.value = false
    
    ElMessage.success('图像生成成功！')
    
    // Save to localStorage
    const savedImages = JSON.parse(localStorage.getItem('textToImages') || '[]')
    savedImages.push(...newImages)
    localStorage.setItem('textToImages', JSON.stringify(savedImages))
  }, 2000)
}

const downloadImage = (image: GeneratedImage) => {
  // In a real app, this would download the actual image
  ElMessage.success('图像下载功能将在后续版本中实现')
}

const likeImage = (image: GeneratedImage) => {
  ElMessage.success('图像已收藏！')
}

const shareImage = (image: GeneratedImage) => {
  // Copy image URL to clipboard
  navigator.clipboard.writeText(image.url)
    .then(() => {
      ElMessage.success('图像链接已复制到剪贴板')
    })
    .catch(() => {
      ElMessage.error('复制失败')
    })
}
</script>

<style scoped>
.text-to-image-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.text-to-image-card {
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
}

.input-section {
  padding-right: 20px;
}

.text-to-image-form {
  padding: 10px 0;
}

.style-select {
  width: 100%;
}

.count-slider {
  width: 80%;
  margin-top: 10px;
}

.count-text {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #909399;
}

.generate-btn {
  width: 100%;
  background: linear-gradient(135deg, #67c23a 0%, #85ce61 100%);
  border: none;
  font-size: 1.1rem;
  padding: 15px 20px;
  transition: all 0.3s ease;
}

.generate-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 12px rgba(103, 194, 58, 0.4);
}

.result-section {
  padding-left: 20px;
  border-left: 1px solid #e4e7ed;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.image-card {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.image-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1) !important;
}

.image-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  overflow: hidden;
  background-color: #f8f9fa;
}

.generated-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.image-actions {
  display: flex;
  gap: 10px;
  padding-top: 15px;
}

.placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  text-align: center;
}

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

@media (max-width: 768px) {
  .text-to-image-container {
    padding: 10px;
  }
  
  .image-grid {
    grid-template-columns: 1fr;
  }
  
  .count-slider {
    width: 100%;
  }
}
</style>