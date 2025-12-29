// 主题状态管理
import { defineStore } from 'pinia'

// 主题接口定义
export interface Theme {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  cardColor: string;
}

// 定义主题状态管理
export const useThemeStore = defineStore('theme', {
  state: () => ({
    // 当前主题ID
    currentTheme: 'classic',
    // 所有可用主题
    themes: {
      classic: {
        id: 'classic',
        name: '经典',
        description: '经典深色主题，使用深色色调',
        primaryColor: '#3a3a3a',
        secondaryColor: '#5a5a5a',
        backgroundColor: '#1e1e1e',
        textColor: '#dcdcdc',
        cardColor: '#2d2d2d',
      },
      dark: {
        id: 'dark',
        name: '深色',
        description: '经典深色主题，保护眼睛，适合夜间使用',
        primaryColor: '#3a3a3a',
        secondaryColor: '#5a5a5a',
        backgroundColor: '#1e1e1e',
        textColor: '#dcdcdc',
        cardColor: '#2d2d2d',
      },
      pink: {
        id: 'pink',
        name: '粉嫩',
        description: '柔和粉色调，营造温柔、女性化的氛围',
        primaryColor: '#f783ac',
        secondaryColor: '#f8a8c3',
        backgroundColor: '#fdf2f7',
        textColor: '#333333',
        cardColor: '#ffffff',
      },
      fresh: {
        id: 'fresh',
        name: '清新',
        description: '明亮清新的色彩，带来清爽、干净的感觉',
        primaryColor: '#42b883',
        secondaryColor: '#6cc5a7',
        backgroundColor: '#f0fff4',
        textColor: '#2d3748',
        cardColor: '#ffffff',
      },
      natural: {
        id: 'natural',
        name: '自然',
        description: '大地色系，灵感来自大自然',
        primaryColor: '#68d391',
        secondaryColor: '#a0e7b8',
        backgroundColor: '#f0fdf4',
        textColor: '#2d3748',
        cardColor: '#ffffff',
      },
      warm: {
        id: 'warm',
        name: '温暖',
        description: '暖色调，营造温馨、舒适的氛围',
        primaryColor: '#f6ad55',
        secondaryColor: '#f9c989',
        backgroundColor: '#fffaf0',
        textColor: '#2d3748',
        cardColor: '#ffffff',
      },
      elegant: {
        id: 'elegant',
        name: '优雅',
        description: '精致高雅的配色，体现 sophistication',
        primaryColor: '#8b5cf6',
        secondaryColor: '#a78bfa',
        backgroundColor: '#f8fafc',
        textColor: '#334155',
        cardColor: '#ffffff',
      },
    } as Record<string, Theme>,
  }),

  getters: {
    // 获取当前主题对象
    getCurrentTheme(): Theme {
      return this.themes[this.currentTheme] || this.themes.classic
    },
    // 获取所有主题列表
    getAllThemes(): Theme[] {
      return Object.values(this.themes)
    },
  },

  actions: {
    // 设置主题
    setTheme(themeId: string) {
      if (this.themes[themeId]) {
        this.currentTheme = themeId
        this.applyTheme()
        // 保存到本地存储
        localStorage.setItem('joeyai-theme', themeId)
      }
    },

    // 应用主题样式到DOM
    applyTheme() {
      const theme = this.getCurrentTheme
      // 将CSS变量应用到根元素
      const root = document.documentElement
      root.style.setProperty('--primary-color', theme.primaryColor)
      root.style.setProperty('--secondary-color', theme.secondaryColor)
      root.style.setProperty('--background-color', theme.backgroundColor)
      root.style.setProperty('--text-color', theme.textColor)
      root.style.setProperty('--card-color', theme.cardColor)
    },

    // 从本地存储加载主题
    loadThemeFromStorage() {
      const savedTheme = localStorage.getItem('joeyai-theme')
      if (savedTheme && this.themes[savedTheme]) {
        this.currentTheme = savedTheme
      } else {
        // 如果没有保存的主题或保存的主题不存在，则使用经典主题作为默认
        this.currentTheme = 'classic'
      }
      this.applyTheme()
    },
  },

  // 初始化时加载主题
  hydrate() {
    this.loadThemeFromStorage()
  },
})
