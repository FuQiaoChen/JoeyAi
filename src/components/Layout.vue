// 应用布局组件
<template>
  <div class="layout">
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <!-- 应用Logo -->
        <div class="logo">
          <h1>JoeyAI</h1>
        </div>
      </div>

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
    </aside>

    <!-- 主容器，包含顶部工具条、主要内容和底部 -->
    <div class="main-container">
      <!-- 顶部工具条 -->
      <header class="top-header">
        <div class="header-content">
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
          <div class="header-right">
            <!-- 可以在这里添加其他顶部功能 -->
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
  flex-direction: row;
  background-color: var(--background-color, #f5f7fa);
  color: var(--text-color, #303133);
  overflow-x: hidden; /* 防止水平滚动条 */
}

.sidebar {
  width: 250px;
  background: linear-gradient(
    135deg,
    var(--primary-color, #667eea) 0%,
    var(--secondary-color, #764ba2) 100%
  );
  color: white;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  transition: all 0.3s ease;
  flex-shrink: 0; /* 防止侧边栏被压缩 */
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
}

.nav-list {
  list-style: none;
  margin: 20px 0;
  padding: 0;
  flex-grow: 1;
}

.nav-item {
  margin: 5px 15px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 12px 15px;
  border-radius: 8px;
  display: block;
  transition: background-color 0.3s ease;
  font-size: 1rem;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: calc(100% - 250px); /* 减去侧边栏宽度 */
  overflow-x: hidden; /* 防止水平滚动条 */
}

.top-header {
  background: var(--card-color, #f8f9fa);
  border-bottom: 1px solid #dee2e6;
  padding: 10px 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 90;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.main-content {
  flex: 1;
  padding: 20px;
  background-color: var(--background-color, #f5f7fa);
  color: var(--text-color, #303133);
  min-height: calc(100vh - 140px);
  overflow-x: hidden; /* 防止水平滚动条 */
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.footer {
  background: var(--card-color, #f8f9fa);
  border-top: 1px solid #dee2e6;
  padding: 20px 0;
  margin-top: auto;
  width: 100%;
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
  .sidebar {
    width: 70px;
  }

  .logo h1 {
    font-size: 1.2rem;
  }

  .nav-item {
    text-align: center;
  }

  .nav-link {
    padding: 12px 5px;
    font-size: 0.8rem;
  }

  .main-container {
    width: calc(100% - 70px);
  }

  .theme-selector {
    width: 120px;
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

@media (max-width: 480px) {
  .layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    min-height: auto;
  }

  .main-container {
    width: 100%;
  }

  .nav-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-item {
    margin: 5px;
  }

  .theme-selector {
    width: 130px;
  }
}
</style>
