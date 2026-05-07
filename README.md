# 汪汪队记大过 — 个人主页

基于 React + Vite + TypeScript 构建的个人主页，采用粗野主义（Brutalism）设计风格。

## 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | React 19 |
| 类型系统 | TypeScript 5.8 |
| 构建工具 | Vite 6 |
| 样式方案 | Tailwind CSS 4.1（自定义主题） |
| 动画库 | Motion（原 Framer Motion） |
| 图标库 | Lucide React |
| AI 集成 | Google Gemini API（@google/genai） |

## 功能特性

- **粗野主义视觉风格**：4px 黑色粗边框、硬阴影、高饱和品牌色、圆角卡片
- **标签页导航**：首页 / 作品集 / 关于我，配合 `AnimatePresence` 实现页面切换动画
- **跑马灯滚动条**：展示个人兴趣标签的无限循环滚动动画
- **响应式布局**：适配移动端、平板和桌面端
- **AI Studio 部署**：支持一键部署到 Google AI Studio

## 项目结构

```
src/
├── main.tsx                    # 应用入口
├── App.tsx                     # 根组件 — 标签页状态管理 + 页面路由
├── index.css                   # Tailwind 配置、品牌主题色、粗野主义工具类
├── config/
│   └── site.ts                 # 站点元数据（名称、联系方式、链接）
├── types/
│   └── index.ts                # 共享类型定义（TabType 等）
├── hooks/
│   └── useScrollReveal.ts      # 滚动入场动画 hook
├── data/
│   ├── projects.ts             # 作品集数据
│   ├── blogs.ts                # 博客数据
│   └── ideas.ts                # 有趣想法数据
└── components/
    ├── ui/                     # 共享 UI 原语
    │   ├── EmptyPlaceholder.tsx # 空状态占位组件
    │   ├── SectionHeader.tsx   # 区块标题组件
    │   └── LinkableCard.tsx    # 可选链接卡片组件
    ├── Navbar.tsx              # 固定导航栏
    ├── Footer.tsx              # 页脚
    ├── Hero.tsx                # 首屏区域
    ├── Ticker.tsx              # 跑马灯滚动条
    ├── Services.tsx            # 首页创作区块（作品/博客/想法）
    ├── AboutSection.tsx        # 关于我
    ├── Experience.tsx          # 个人态度区
    └── Portfolio.tsx           # 作品集页
public/
├── fig1.png
└── fig2.png
```

## 添加内容

首页「一些有趣的创作」区域包含三个子区块：作品集、博客、有趣想法。每个区块的数据独立管理。

### 作品集 — `src/data/projects.ts`

```ts
export interface Project {
  title: string;              // 作品名称
  description: string;        // 一句话描述
  link: string;               // 作品链接（GitHub / 线上地址）
  status: "online" | "wip";   // online=显示为可点击卡片，wip=显示为施工中占位
  featured?: boolean;         // 设为 true 会同时展示在首页「有趣的创作」区块
}
```

**示例：**

```ts
export const projects: Project[] = [
  {
    title: "What2EatToday",
    description: "今天吃什么？一个帮你解决日常选择困难的小工具。",
    link: "https://github.com/chengtaos/What2EatToday",
    status: "online",
    featured: true,
  },
  {
    title: "新项目",
    description: "这是我正在做的一个新东西。",
    link: "https://github.com/chengtaos/new-project",
    status: "wip",
  },
];
```

页面会自动根据 `status` 展示对应的卡片样式，`featured: true` 的作品会同时出现在首页和作品集页。

### 博客 — `src/data/blogs.ts`

```ts
export interface Blog {
  title: string;
  date: string;          // "2026-05-07"
  summary: string;
  link?: string;         // 可选外部链接
}
```

设置 `link` 后卡片可点击跳转，不设置则只展示文字内容。

### 有趣想法 — `src/data/ideas.ts`

```ts
export interface Idea {
  content: string;
  date: string;
}
```

短想法以简洁卡片样式展示。三个区块中数据为空的会自动隐藏。

## 路由设计

不使用 React Router，通过根组件 `App.tsx` 中的 `useState` 管理 `activeTab` 状态（`"home"` / `"portfolio"` / `"about"`），配合 Motion 的 `AnimatePresence` 实现淡入淡出页面切换。

## 设计系统

### 品牌色

| 颜色 | 用途 |
|------|------|
| `#FF6B6B` (Pink) | 强调色、按钮阴影、高亮文字 |
| `#4D8DFF` (Blue) | 次要强调、图标背景 |
| `#FFD93D` (Yellow) | 卡片背景、高亮文字 |
| `#6C63FF` (Purple) | 装饰元素、高亮文字 |

### 组件工具类

- `.brutalist-card` — 白色卡片，黑色粗边框 + 硬阴影，hover 时微移
- `.brutalist-button-black` — 黑底按钮，粉色硬阴影
- `.brutalist-button-white` — 白底按钮，黑色硬阴影

## 本地开发

**前置要求：** Node.js

```bash
npm install          # 安装依赖
npm run dev          # 启动开发服务器（端口 3000）
npm run build        # 生产构建
npm run preview      # 预览生产构建
npm run lint         # TypeScript 类型检查
```

## 环境变量

在 `.env.local` 中配置 `GEMINI_API_KEY`（参考 `.env.example`）。AI Studio 部署时自动注入密钥，无需手动配置。

## 许可证

MIT
