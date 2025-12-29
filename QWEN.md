# JoeyAI 项目上下文

## 项目概述

JoeyAI 是一个综合性的AI驱动网络应用程序，提供多种AI驱动的工具和服务，具有单一、用户友好的界面。该应用程序具有现代化的Vue 3前端，使用TypeScript、Element Plus UI组件和灵活的主题系统。

### 主要功能
- **智能聊天**: 与AI助手进行自然对话
- **文本转图像**: 将文本描述转换为惊艳的视觉内容
- **图像转图像**: 使用AI编辑和转换现有图像
- **视频生成**: 从文本或图像创建动态视频内容
- **小红书内容**: 生成针对小红书平台优化的内容
- **创意工具**: 其他AI驱动的创意工具
- **自定义主题**: 多种主题选项，提供个性化体验

### 技术栈
- **前端**: Vue 3 与 TypeScript
- **UI框架**: Element Plus
- **状态管理**: Pinia
- **路由**: Vue Router
- **构建工具**: Vite
- **样式**: CSS 与 CSS 变量用于主题

## 架构

应用程序遵循基于组件的架构：

- **组件**: 可重用的UI元素
- **视图**: 不同功能的页面级组件
- **存储**: Pinia 存储用于状态管理（主题管理）
- **路由器**: Vue Router 用于功能间的导航
- **样式**: 具有主题支持的全局样式

### 项目结构
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

## 主题系统

JoeyAI 具有灵活的主题系统，包含 6 种不同的主题：
- 默认（经典中性色调）
- 粉色（柔和女性化调色板）
- 清新（明亮干净的颜色）
- 自然（受大地启发的色调）
- 温暖（舒适温暖的调色板）
- 优雅（精致的颜色）

主题通过CSS变量和Pinia状态管理进行管理，允许动态主题切换并使用localStorage持久化。

## 依赖

### 生产依赖
- element-plus: ^2.13.0
- pinia: ^3.0.4
- vue: ^3.5.26
- vue-router: ^4.6.4

### 开发依赖
- @types/node: ^25.0.3
- @vitejs/plugin-vue: ^6.0.3
- @vitejs/plugin-vue-jsx: ^5.1.3
- typescript: ^5.9.3
- vite: ^6.4.1

## 构建和开发命令

### 安装
```bash
npm install
```

### 开发
```bash
npm run dev
```
应用程序将在 `http://localhost:5173` 上可用。

### 构建
```bash
npm run build
```
构建的文件将在 `dist` 目录中。

### 预览
```bash
npm run preview
```

## 关键文件和组件

### 主应用程序
- `src/App.vue`: 初始化布局和主题存储的主应用程序组件
- `src/main.ts`: 设置包含Pinia、Element Plus和路由器的Vue应用程序的入口点
- `src/components/Layout.vue`: 包含头部导航、主题选择器和页脚的主布局组件

### 状态管理
- `src/stores/theme.ts`: 管理具有6种不同主题的主题状态的Pinia存储，CSS变量应用和localStorage持久化

### 路由
- `src/router/index.ts`: Vue Router配置，包含所有主要功能的路由（欢迎页面、聊天、文本转图像、图像转图像、视频生成、小红书）

### 样式
- `src/styles/index.css`: 具有响应式设计和动画的全局样式（主题样式通过JavaScript动态应用CSS变量管理）

### 视图
- `src/views/Welcome.vue`: 具有功能展示的登录页面
- `src/views/Chat.vue`: 智能聊天界面
- `src/views/TextToImage.vue`: 文本转图像生成界面
- `src/views/ImageToImage.vue`: 图像转图像转换界面
- `src/views/GenerateVideo.vue`: 视频生成界面
- `src/views/Xiaohongshu.vue`: 小红书内容生成界面

## 开发约定

- 使用TypeScript确保类型安全
- 使用Vue 3组合式API的组件化架构
- 使用Pinia进行状态管理
- 使用Element Plus作为UI组件
- 使用CSS变量进行主题化
- 采用移动优先方法的响应式设计
- 遵循Vue标准的一致命名约定
- 使用LocalStorage持久化用户偏好设置（主题选择）

## 特殊注意事项

- 应用程序使用CSS变量进行动态主题化，这些变量通过JavaScript在运行时应用
- 主题选择在localStorage中持久化
- 响应式设计使用媒体查询实现
- 项目使用Vite作为构建工具，并采用自定义配置
- 所有视图都作为具有作用域样式的单文件组件(SFC)实现
