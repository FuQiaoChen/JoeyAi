<template>
  <!-- 应用根容器 -->
  <div id="app">
    <!-- 布局组件 -->
    <Layout />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useThemeStore } from "@/stores/theme";
import Layout from "@/components/Layout.vue";

// 获取主题状态管理实例
const themeStore = useThemeStore();

// 组件挂载时初始化主题
onMounted(() => {
  // 从本地存储加载主题设置
  themeStore.loadThemeFromStorage();
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color, #2c3e50);
  min-height: 100vh;
  background-color: var(--background-color, #f5f7fa);
  transition: background-color 0.3s ease, color 0.3s ease;
  overflow-x: hidden; /* 防止水平滚动条 */
  margin: 0;
  padding: 0;
}

/* Global animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
