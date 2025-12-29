# JoeyAI

JoeyAI 是一个综合性的 AI 驱动网络应用程序，提供多种 AI 驱动的工具和服务，具有单一、用户友好的界面。该应用程序具有现代化的 Vue 3 前端，使用 TypeScript、Element Plus UI 组件和灵活的主题系统。

## 🚀 功能

- **智能聊天**: 与 AI 助手进行自然对话
- **文本转图像**: 将文本描述转换为惊艳的视觉内容
- **图像转图像**: 使用 AI 编辑和转换现有图像
- **视频生成**: 从文本或图像创建动态视频内容
- **小红书内容**: 生成针对小红书平台优化的内容
- **创意工具**: 其他 AI 驱动的创意工具
- **自定义主题**: 多种主题选项，提供个性化体验

## 🛠️ 技术栈

- **前端**: Vue 3 与 TypeScript
- **UI 框架**: Element Plus
- **状态管理**: Pinia
- **路由**: Vue Router
- **构建工具**: Vite
- **样式**: CSS 与 CSS 变量用于主题
- **响应式设计**：完美适配桌面和移动设备

## 📋 要求

### 系统要求

- Node.js (版本 16 或更高)
- npm 或 yarn 包管理器

### 开发依赖

- Vue 3
- TypeScript
- Vite
- Element Plus
- Pinia
- Vue Router

## 🏗️ 架构

应用程序遵循基于组件的架构：

- **组件**: 可重用的 UI 元素
- **视图**: 不同功能的页面级组件
- **存储**: Pinia 存储用于状态管理（主题管理）
- **路由器**: Vue Router 用于功能间的导航
- **样式**: 具有主题支持的全局样式

## 🎨 主题系统

JoeyAI 具有灵活的主题系统，包含 6 种不同的主题：

- 主题：经典（经典深色色调）
- 主题：粉色（柔和女性化调色板）
- 主题：清新（明亮干净的颜色）
- 主题：自然（受大地启发的色调）
- 主题：温暖（舒适温暖的调色板）
- 主题：优雅（精致的颜色）

主题通过 CSS 变量和 Pinia 状态管理进行管理，允许动态主题切换并使用 localStorage 持久化。

## 🚀 快速开始

### 先决条件

确保您的系统上已安装 Node.js。

### 安装

1. 克隆仓库：

```bash
git clone https://github.com/FuQiaoChen/JoeyAi
cd JoeyAi
```

2. 安装依赖：

```bash
npm install
```

### 开发

启动开发服务器：

```bash
npm run dev
```

应用程序将在 `http://localhost:5173` 上可用。

### 构建

构建生产版本的应用程序：

```bash
npm run build
```

构建的文件将在 `dist` 目录中。

### 预览

在本地预览生产构建：

```bash
npm run preview
```

## 📁 项目结构

```
JoeyAI/
├── public/                 # 静态资源
├── src/
│   ├── components/         # 可重用UI组件
│   │   └── Layout.vue      # 主布局组件
│   ├── views/              # 页面组件
│   │   ├── Welcome.vue     # 欢迎页面
│   │   ├── Chat.vue        # 聊天页面
│   │   ├── TextToImage.vue # 文生图页面
│   │   ├── ImageToImage.vue # 图生图页面
│   │   ├── GenerateVideo.vue # 视频生成页面
│   │   └── Xiaohongshu.vue # 小红书内容页面
│   ├── router/             # Vue Router 配置
│   │   └── index.ts        # 路由配置
│   ├── stores/             # Pinia 存储
│   │   └── theme.ts        # 主题状态管理
│   ├── styles/             # 全局样式
│   │   └── index.css       # 全局样式文件
│   ├── App.vue             # 主应用程序组件
│   └── main.ts             # 应用程序入口点
├── package.json            # 项目依赖和脚本
├── vite.config.ts          # Vite 配置
├── README.md               # 项目文档
└── QWEN.md                 # 项目详细文档
```

## 🌐 功能概述

### 智能聊天

具有消息历史记录和响应式设计的交互式 AI 对话界面。

### 文本转图像

通过直观界面将文本描述转换为视觉内容。

### 图像转图像

使用 AI 驱动的编辑工具上传和转换图像。

### 视频生成

从文本提示或现有图像创建视频内容。

### 小红书内容

专门用于生成针对小红书社交平台优化内容的工具。

## 🎯 使用方法

1. 使用 `npm run dev` 启动应用程序
2. 使用顶部导航栏导航到所需功能
3. 使用主题选择器自定义您的体验
4. 根据各种 AI 工具的特定说明进行交互

## 🤝 贡献

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

## 📄 许可证

该项目根据 ISC 许可证授权。

## 🆘 支持

如果您遇到任何问题或有疑问，请在仓库中提交问题。
