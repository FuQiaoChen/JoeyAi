<template>
  <div class="image-to-image-container">
    <el-card class="image-to-image-card" shadow="always">
      <template #header>
        <div class="card-header">
          <span class="card-title">图生图</span>
        </div>
      </template>
      
      <div class="content-wrapper">
        <div class="input-section">
          <el-form :model="form" label-width="100px" class="image-to-image-form">
            <el-form-item label="上传图片">
              <el-upload
                class="image-uploader"
                drag
                :action="uploadUrl"
                :on-success="handleUploadSuccess"
                :before-upload="beforeUpload"
                :show-file-list="false"
                accept="image/*"
              >
                <div v-if="!uploadedImage" class="upload-content">
                  <el-icon class="upload-icon"><Upload /></el-icon>
                  <div class="upload-text">将图片拖到此处，或<em>点击上传</em></div>
                  <div class="upload-hint">只能上传jpg/png文件，且不超过5MB</div>
                </div>
                <div v-else class="uploaded-image-preview">
                  <img :src="uploadedImage" class="preview-image" />
                </div>
              </el-upload>
            </el-form-item>
            
            <el-form-item label="转换描述">
              <el-input 
                v-model="form.prompt" 
                type="textarea" 
                :rows="3"
                placeholder="描述您希望对图片进行的转换，例如：将照片转换为水彩风格，增加艺术感"
              />
            </el-form-item>
            
            <el-form-item label="转换风格">
              <el-select v-model="form.style" placeholder="选择转换风格" class="style-select">
                <el-option label="水彩风格" value="watercolor" />
                <el-option label="油画风格" value="oil" />
                <el-option label="素描风格" value="sketch" />
                <el-option label="卡通风格" value="cartoon" />
                <el-option label="动漫风格" value="anime" />
                <el-option label="像素艺术" value="pixel" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="转换强度">
              <el-slider 
                v-model="form.intensity" 
                :min="1" 
                :max="10" 
                :step="1"
                show-stops
                class="intensity-slider"
              />
              <div class="intensity-text">强度: {{ form.intensity }}/10</div>
            </el-form-item>
            
            <el-form-item>
              <el-button 
                type="primary" 
                size="large" 
                @click="convertImage"
                :loading="loading"
                :disabled="!uploadedImage"
                class="convert-btn"
              >
                转换图片
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        
        <div class="result-section">
          <div v-if="convertedImages.length > 0" class="image-grid">
            <el-card 
              v-for="(image, index) in convertedImages" 
              :key="index"
              class="image-card"
              shadow="hover"
            >
              <template #header>
                <div class="image-header">
                  <span>转换结果 {{ index + 1 }}</span>
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
                <img :src="image.url" :alt="`Converted image ${index + 1}`" class="converted-image" />
              </div>
              <div class="image-actions">
                <el-button type="success" size="small" @click="likeImage(image)" icon="Star">喜欢</el-button>
                <el-button type="info" size="small" @click="shareImage(image)" icon="Share">分享</el-button>
              </div>
            </el-card>
          </div>
          
          <div v-else class="placeholder-content">
            <el-empty description="暂无转换结果" :image-size="200">
              <p>上传图片并点击转换开始创作</p>
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
import { Upload, Download, Star, Share } from '@element-plus/icons-vue'

interface ImageToImageForm {
  prompt: string
  style: string
  intensity: number
}

interface ConvertedImage {
  id: number
  url: string
  originalUrl: string
  style: string
  date: string
}

const form = reactive<ImageToImageForm>({
  prompt: '',
  style: 'watercolor',
  intensity: 5
})

const uploadUrl = ref('') // In a real app, this would be the upload endpoint
const uploadedImage = ref('')
const loading = ref(false)
const convertedImages = ref<ConvertedImage[]>([])

const beforeUpload = (file: File) => {
  const isImage = file.type.startsWith('image/')
  const isLt5M = file.size / 1024 / 1024 < 5

  if (!isImage) {
    ElMessage.error('只能上传图片文件!')
    return false
  }
  if (!isLt5M) {
    ElMessage.error('图片大小不能超过 5MB!')
    return false
  }
  
  return true
}

const handleUploadSuccess = (response: any, file: any) => {
  // In a real app, this would be the uploaded image URL
  uploadedImage.value = URL.createObjectURL(file.raw)
  ElMessage.success('图片上传成功！')
}

const convertImage = () => {
  if (!uploadedImage.value) {
    ElMessage.warning('请先上传图片')
    return
  }
  
  if (!form.prompt.trim()) {
    ElMessage.warning('请输入转换描述')
    return
  }
  
  loading.value = true
  
  // Simulate API call delay
  setTimeout(() => {
    const newImages: ConvertedImage[] = []
    
    // Generate a few variations
    for (let i = 0; i < 2; i++) {
      newImages.push({
        id: Date.now() + i,
        url: `https://picsum.photos/seed/${Date.now() + i}/512/512`,
        originalUrl: uploadedImage.value,
        style: form.style,
        date: new Date().toLocaleString()
      })
    }
    
    convertedImages.value = newImages
    loading.value = false
    
    ElMessage.success('图片转换成功！')
    
    // Save to localStorage
    const savedImages = JSON.parse(localStorage.getItem('imageToImages') || '[]')
    savedImages.push(...newImages)
    localStorage.setItem('imageToImages', JSON.stringify(savedImages))
  }, 2000)
}

const downloadImage = (image: ConvertedImage) => {
  // In a real app, this would download the actual image
  ElMessage.success('图片下载功能将在后续版本中实现')
}

const likeImage = (image: ConvertedImage) => {
  ElMessage.success('图片已收藏！')
}

const shareImage = (image: ConvertedImage) => {
  // Copy image URL to clipboard
  navigator.clipboard.writeText(image.url)
    .then(() => {
      ElMessage.success('图片链接已复制到剪贴板')
    })
    .catch(() => {
      ElMessage.error('复制失败')
    })
}
</script>

<style scoped>
.image-to-image-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.image-to-image-card {
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
  height: calc(100% - 80px); /* 减去标题和边距的空间 */
  box-sizing: border-box;
}

.input-section {
  padding-right: 20px;
}

.image-to-image-form {
  padding: 10px 0;
}

.image-uploader {
  width: 100%;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.upload-content:hover {
  border-color: #409eff;
}

.upload-icon {
  font-size: 48px;
  color: #8c939d;
  margin-bottom: 16px;
}

.upload-text {
  font-size: 14px;
  color: #606266;
  margin-bottom: 8px;
}

.upload-text em {
  color: #409eff;
  font-style: normal;
}

.upload-hint {
  font-size: 12px;
  color: #909399;
}

.uploaded-image-preview {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
}

.style-select {
  width: 100%;
}

.intensity-slider {
  width: 80%;
  margin-top: 10px;
}

.intensity-text {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #909399;
}

.convert-btn {
  width: 100%;
  background: linear-gradient(135deg, #e6a23c 0%, #ebb563 100%);
  border: none;
  font-size: 1.1rem;
  padding: 15px 20px;
  transition: all 0.3s ease;
}

.convert-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 12px rgba(230, 162, 60, 0.4);
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

.converted-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
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
  .image-to-image-container {
    padding: 10px;
  }

  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }

  .intensity-slider {
    width: 100%;
  }

  .image-container {
    height: 180px;
  }

  .upload-content {
    padding: 30px 15px;
  }
}

/* 小屏移动设备响应式设计 */
@media (max-width: 480px) {
  .image-to-image-container {
    padding: 10px 5px;
  }

  .card-title {
    font-size: 1.3rem;
  }

  .image-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .image-container {
    height: 160px;
  }

  .image-actions {
    justify-content: center;
  }

  .convert-btn {
    font-size: 1rem;
    padding: 12px 15px;
  }

  .upload-content {
    padding: 20px 10px;
  }

  .upload-icon {
    font-size: 40px;
  }
}
</style>