// 应用布局组件
<template>
  <div class="layout">
    <!-- 页面头部，包含导航 -->
    <header class="header">
      <div class="header-content">
        <!-- 应用Logo -->
        <div class="logo">
          <h1>JoeyAI</h1>
        </div>
        <div class="header-right">
          <!-- 主题选择器 -->
          <el-select
            v-model="currentThemeId"
            placeholder="选择主题"
            size="default"
            class="theme-selector"
            @change="handleThemeChange"
          >
            <el-option
              v-for="theme in allThemes"
              :key="theme.id"
              :label="theme.name"
              :value="theme.id"
            >
              <div class="theme-option">
                <span>{{ theme.name }}</span>
                <small class="theme-description">{{ theme.description }}</small>
              </div>
            </el-option>
          </el-select>
          <!-- 导航菜单 -->
          <nav class="nav">
            <ul class="nav-list">
              <li class="nav-item">
                <router-link to="/" class="nav-link">首页</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/chat" class="nav-link">聊天</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/text-to-image" class="nav-link">文生图</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/image-to-image" class="nav-link">图生图</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/generate-video" class="nav-link">视频生成</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/xiaohongshu" class="nav-link">小红书</router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <router-view></router-view>
    </main>

    <!-- 页面底部 -->
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2025 JoeyAI. All rights reserved.</p>
        <div class="footer-links">
          <a href="#" class="footer-link">关于我们</a>
          <a href="#" class="footer-link">联系我们</a>
          <a href="#" class="footer-link">隐私政策</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useThemeStore } from "@/stores/theme";
import { storeToRefs } from "pinia";

// 获取主题状态管理实例
const themeStore = useThemeStore();
// 从store中提取响应式数据
const { currentTheme, getAllThemes: allThemes } = storeToRefs(themeStore);

// 当前选中的主题ID
const currentThemeId = ref(themeStore.currentTheme);

// 组件挂载时初始化主题
onMounted(() => {
  themeStore.loadThemeFromStorage();
  currentThemeId.value = themeStore.currentTheme;
});

// 处理主题切换
const handleThemeChange = (themeId: string) => {
  themeStore.setTheme(themeId);
  currentThemeId.value = themeId;
};
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(
    135deg,
    var(--primary-color, #667eea) 0%,
    var(--secondary-color, #764ba2) 100%
  );
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: bold;
}

.theme-selector {
  width: 150px;
}

.theme-option {
  display: flex;
  flex-direction: column;
}

.theme-description {
  font-size: 0.7rem;
  color: #999;
  margin-top: 2px;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.main-content {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  background-color: var(--background-color, #f5f7fa);
  color: var(--text-color, #303133);
  min-height: calc(100vh - 140px);
}

.footer {
  background: var(--card-color, #f8f9fa);
  border-top: 1px solid #dee2e6;
  padding: 20px 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-link {
  color: var(--text-color, #6c757d);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--primary-color, #495057);
}

/* Responsive design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    height: auto;
    padding: 10px 20px;
  }

  .header-right {
    width: 100%;
    justify-content: space-between;
    margin-top: 10px;
  }

  .theme-selector {
    width: 120px;
    margin-right: 10px;
  }

  .logo {
    margin-bottom: 10px;
  }

  .nav-list {
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-link {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .footer-content {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }

  .footer-links {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
