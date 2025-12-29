<template>
  <div class="chat-container">
    <el-card class="chat-card" shadow="always">
      <template #header>
        <div class="card-header">
          <span class="card-title">智能对话</span>
        </div>
      </template>
      
      <div class="chat-content">
        <div class="messages-container">
          <div 
            v-for="(message, index) in messages" 
            :key="index" 
            class="message"
            :class="{ 'user-message': message.sender === 'user', 'ai-message': message.sender === 'ai' }"
          >
            <div class="message-avatar">
              <el-avatar :size="36" :style="{ backgroundColor: message.sender === 'user' ? '#409eff' : '#67c23a' }">
                {{ message.sender === 'user' ? 'U' : 'AI' }}
              </el-avatar>
            </div>
            <div class="message-content">
              <div class="message-bubble" :class="{ 'user-bubble': message.sender === 'user', 'ai-bubble': message.sender === 'ai' }">
                {{ message.text }}
              </div>
              <div class="message-time">{{ message.time }}</div>
            </div>
          </div>
        </div>
        
        <div class="input-section">
          <el-input
            v-model="inputMessage"
            placeholder="输入您的问题..."
            size="large"
            @keyup.enter="sendMessage"
            class="message-input"
          >
            <template #append>
              <el-button 
                type="primary" 
                size="large" 
                @click="sendMessage"
                :loading="sending"
                class="send-button"
              >
                发送
              </el-button>
            </template>
          </el-input>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

interface Message {
  id: number
  text: string
  sender: 'user' | 'ai'
  time: string
}

const messages = ref<Message[]>([
  { id: 1, text: '您好！我是JoeyAI助手，有什么可以帮助您的吗？', sender: 'ai', time: '10:00' },
  { id: 2, text: '你好！我想了解一下AI技术的最新发展。', sender: 'user', time: '10:01' },
  { id: 3, text: 'AI技术发展迅速，主要体现在自然语言处理、计算机视觉和机器学习等领域。您对哪个方向比较感兴趣？', sender: 'ai', time: '10:01' }
])

const inputMessage = ref('')
const sending = ref(false)

const sendMessage = () => {
  if (!inputMessage.value.trim()) {
    ElMessage.warning('请输入消息内容')
    return
  }

  // Add user message
  const userMessage: Message = {
    id: messages.value.length + 1,
    text: inputMessage.value,
    sender: 'user',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  
  messages.value.push(userMessage)
  inputMessage.value = ''
  
  // Simulate AI response
  sending.value = true
  setTimeout(() => {
    const aiMessage: Message = {
      id: messages.value.length + 1,
      text: `关于"${userMessage.text}"，这是一个很好的问题。AI技术在这一领域有很多应用，比如...`,
      sender: 'ai',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    messages.value.push(aiMessage)
    sending.value = false
  }, 1500)
}

onMounted(() => {
  // Scroll to bottom of messages
  setTimeout(() => {
    const container = document.querySelector('.messages-container')
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, 100)
})
</script>

<style scoped>
.chat-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.chat-card {
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

.chat-content {
  display: flex;
  flex-direction: column;
  height: calc(100% - 80px); /* 减去标题和边距的空间 */
  box-sizing: border-box;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 20px;
  box-sizing: border-box;
}

.message {
  display: flex;
  gap: 12px;
  max-width: 80%;
  animation: fadeIn 0.3s ease;
  box-sizing: border-box;
}

.message.user-message {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.message-bubble {
  padding: 12px 16px;
  border-radius: 18px;
  line-height: 1.5;
  max-width: 100%;
  word-wrap: break-word;
}

.user-bubble {
  background-color: #409eff;
  color: white;
  border-bottom-right-radius: 4px;
}

.ai-bubble {
  background-color: white;
  color: #303133;
  border: 1px solid #e4e7ed;
  border-bottom-left-radius: 4px;
}

.message-time {
  font-size: 0.75rem;
  color: #909399;
  margin-top: 4px;
  text-align: right;
}

.input-section {
  padding: 0 20px 20px;
  box-sizing: border-box;
}

.message-input {
  width: 100%;
}

.send-button {
  background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
  border: none;
  transition: all 0.3s ease;
}

.send-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 平板设备响应式设计 */
@media (max-width: 1024px) {
  .chat-content {
    height: 550px;
  }
}

/* 移动设备响应式设计 */
@media (max-width: 768px) {
  .chat-container {
    padding: 10px;
    max-width: 100%;
  }

  .chat-content {
    height: calc(100vh - 200px);
    min-height: 400px;
  }

  .messages-container {
    padding: 15px;
    margin-bottom: 15px;
  }

  .message {
    max-width: 90%;
    gap: 8px;
  }

  .message-bubble {
    padding: 10px 14px;
    font-size: 0.9rem;
  }

  .input-section {
    padding: 0 10px 10px;
  }
}

/* 小屏移动设备响应式设计 */
@media (max-width: 480px) {
  .chat-container {
    padding: 5px;
  }

  .chat-content {
    height: calc(100vh - 180px);
    min-height: 350px;
  }

  .card-title {
    font-size: 1.3rem;
  }

  .messages-container {
    padding: 10px;
    gap: 15px;
  }

  .message {
    max-width: 95%;
    gap: 6px;
  }

  .message-bubble {
    padding: 8px 12px;
    font-size: 0.85rem;
  }

  .message-time {
    font-size: 0.7rem;
  }
}
</style>