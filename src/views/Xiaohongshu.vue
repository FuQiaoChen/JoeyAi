<template>
  <div class="xiaohongshu-container">
    <el-card class="xiaohongshu-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-title">小红书内容生成</span>
        </div>
      </template>
      
      <div class="content-section">
        <el-form :model="form" label-width="120px" class="xiaohongshu-form">
          <el-form-item label="内容主题">
            <el-input 
              v-model="form.topic" 
              placeholder="请输入内容主题，如：美妆、穿搭、旅行等" 
              size="large"
            />
          </el-form-item>
          
          <el-form-item label="内容风格">
            <el-select 
              v-model="form.style" 
              placeholder="选择内容风格" 
              size="large"
              class="style-select"
            >
              <el-option label="时尚潮流" value="fashion" />
              <el-option label="生活分享" value="lifestyle" />
              <el-option label="美食推荐" value="food" />
              <el-option label="旅行攻略" value="travel" />
              <el-option label="美妆护肤" value="beauty" />
            </el-select>
          </el-form-item>
          
          <el-form-item label="内容长度">
            <el-slider 
              v-model="form.length" 
              :min="100" 
              :max="1000" 
              :step="50"
              show-stops
              class="length-slider"
            />
            <div class="length-text">{{ form.length }} 字符</div>
          </el-form-item>
          
          <el-form-item label="关键词">
            <el-input 
              v-model="form.keywords" 
              placeholder="请输入关键词，用逗号分隔" 
              type="textarea"
              :rows="3"
            />
          </el-form-item>
          
          <el-form-item>
            <el-button 
              type="primary" 
              size="large" 
              @click="generateContent"
              :loading="loading"
              class="generate-btn"
            >
              生成小红书内容
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      
      <div v-if="generatedContent" class="result-section">
        <el-divider content-position="left">生成结果</el-divider>
        <div class="content-result">
          <p v-for="(paragraph, index) in generatedContent.split('\n')" 
             :key="index" 
             class="content-paragraph">
            {{ paragraph }}
          </p>
        </div>
        
        <div class="action-buttons">
          <el-button type="success" @click="copyContent" icon="DocumentCopy">复制内容</el-button>
          <el-button type="warning" @click="saveContent" icon="FolderOpened">保存内容</el-button>
          <el-button @click="regenerateContent" icon="Refresh">重新生成</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { DocumentCopy, FolderOpened, Refresh } from '@element-plus/icons-vue'

interface XiaohongshuForm {
  topic: string
  style: string
  length: number
  keywords: string
}

const form = reactive<XiaohongshuForm>({
  topic: '',
  style: '',
  length: 300,
  keywords: ''
})

const loading = ref(false)
const generatedContent = ref('')

const generateContent = () => {
  if (!form.topic) {
    ElMessage.warning('请输入内容主题')
    return
  }
  
  if (!form.style) {
    ElMessage.warning('请选择内容风格')
    return
  }
  
  loading.value = true
  
  // Simulate API call delay
  setTimeout(() => {
    // Generate sample content based on form inputs
    const topics = {
      fashion: '穿搭分享',
      lifestyle: '生活记录',
      food: '美食推荐',
      travel: '旅行攻略',
      beauty: '美妆护肤'
    }
    
    const sampleContent = `【${form.topic} - ${topics[form.style as keyof typeof topics] || '内容分享'}】
    
${form.topic}一直是大家关注的热门话题。今天来和大家分享一下我的经验和心得。

${form.keywords ? `关键词：${form.keywords}` : ''}

首先，我们需要了解${form.topic}的基本要点。在进行${form.topic}时，有几个关键因素需要注意：首先是准备工作，其次是执行过程，最后是后续维护。

准备工作方面，我们需要准备好相关的工具和材料。执行过程中，要特别注意细节处理，这样才能达到最佳效果。

通过我的经验分享，希望能帮助大家更好地了解${form.topic}。如果你也有相关经验，欢迎在评论区分享交流！

#${form.topic.replace(/\s+/g, '')} #${topics[form.style as keyof typeof topics] || '分享'} #经验分享`
    
    generatedContent.value = sampleContent
    loading.value = false
    
    ElMessage.success('内容生成成功！')
  }, 1500)
}

const copyContent = () => {
  if (!generatedContent.value) {
    ElMessage.warning('没有可复制的内容')
    return
  }
  
  navigator.clipboard.writeText(generatedContent.value)
    .then(() => {
      ElMessage.success('内容已复制到剪贴板')
    })
    .catch(() => {
      ElMessage.error('复制失败，请手动复制')
    })
}

const saveContent = () => {
  if (!generatedContent.value) {
    ElMessage.warning('没有可保存的内容')
    return
  }
  
  // Save to localStorage
  const savedContents = JSON.parse(localStorage.getItem('xiaohongshuContents') || '[]')
  const newContent = {
    id: Date.now(),
    content: generatedContent.value,
    topic: form.topic,
    style: form.style,
    date: new Date().toISOString()
  }
  
  savedContents.unshift(newContent)
  localStorage.setItem('xiaohongshuContents', JSON.stringify(savedContents))
  
  ElMessage.success('内容已保存到本地')
}

const regenerateContent = () => {
  if (!form.topic || !form.style) {
    ElMessage.warning('请先填写必要信息')
    return
  }
  
  generateContent()
}
</script>

<style scoped>
.xiaohongshu-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

.xiaohongshu-card {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.xiaohongshu-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1) !important;
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

.content-section {
  padding: 20px 0;
}

.xiaohongshu-form {
  padding: 0 20px;
}

.style-select {
  width: 100%;
}

.length-slider {
  width: 80%;
  margin-top: 10px;
}

.length-text {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #909399;
}

.generate-btn {
  width: 100%;
  margin-top: 10px;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  border: none;
  font-size: 1.1rem;
  padding: 15px 20px;
  transition: all 0.3s ease;
}

.generate-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 12px rgba(255, 154, 158, 0.4);
}

.result-section {
  margin-top: 30px;
}

.content-result {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  border-left: 4px solid #409eff;
  max-height: 400px;
  overflow-y: auto;
}

.content-paragraph {
  margin: 10px 0;
  line-height: 1.8;
  color: #606266;
}

.action-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.action-buttons .el-button {
  flex: 1;
  min-width: 120px;
  transition: all 0.3s ease;
}

.action-buttons .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 平板设备响应式设计 */
@media (max-width: 1024px) {
  .xiaohongshu-container {
    max-width: 95%;
  }
}

/* 移动设备响应式设计 */
@media (max-width: 768px) {
  .xiaohongshu-container {
    padding: 10px;
  }

  .xiaohongshu-form {
    padding: 0 10px;
  }

  .length-slider {
    width: 100%;
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-buttons .el-button {
    min-width: auto;
  }

  .content-result {
    max-height: 350px;
  }
}

/* 小屏移动设备响应式设计 */
@media (max-width: 480px) {
  .xiaohongshu-container {
    padding: 10px 5px;
  }

  .card-title {
    font-size: 1.3rem;
  }

  .xiaohongshu-form {
    padding: 0 5px;
  }

  .length-text {
    font-size: 0.8rem;
  }

  .content-result {
    padding: 15px;
    max-height: 300px;
  }

  .content-paragraph {
    line-height: 1.6;
    font-size: 0.9rem;
  }

  .action-buttons {
    gap: 10px;
  }

  .generate-btn {
    font-size: 1rem;
    padding: 12px 15px;
  }
}
</style>