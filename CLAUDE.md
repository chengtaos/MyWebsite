# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

汪汪队记大过的个人主页 — 基于 React + Vite + TypeScript 的单页应用，采用粗野主义设计风格，部署于 AI Studio。

## 常用命令

```bash
npm install          # 安装依赖
npm run dev          # 开发服务器（端口 3000，监听所有网络接口）
npm run build        # 生产构建
npm run preview      # 预览生产构建
npm run lint         # TypeScript 类型检查（tsc --noEmit）
npm run clean        # 删除 dist 目录
```

## 技术栈

- **前端**: React 19 + TypeScript 5.8
- **构建**: Vite 6（`@vitejs/plugin-react` + `@tailwindcss/vite`）
- **样式**: Tailwind CSS 4.1（自定义主题色和粗野主义组件类）
- **动画**: `motion`（原 framer-motion）
- **图标**: `lucide-react`
- **AI**: `@google/genai`（Gemini API）
- **路径别名**: `@/` 映射到项目根目录（通过 Vite alias 和 tsconfig paths）

## 架构

```
src/
├── main.tsx            # 入口 — 挂载 <App /> 到 #root
├── App.tsx             # 根组件 — 标签页状态管理 + AnimatePresence 页面切换
├── index.css           # Tailwind 导入 + @theme（品牌色、字体）+ 粗野主义工具类
└── components/
    ├── Navbar.tsx      # 固定定位导航栏，标签页切换时带 layoutId 动画
    ├── Hero.tsx        # 首屏区域 — 标题、CTA 按钮、头像图片
    ├── Services.tsx    # Ticker（滚动跑马灯）+ Services（施工中占位卡片）
    ├── AboutSection.tsx # AboutSection + Experience 区块
    └── Portfolio.tsx   # 作品集页（施工中占位状态）
```

**路由方案**: 不使用 React Router。标签页状态（`home` / `about` / `portfolio`）通过 `App.tsx` 中的 `useState` 管理，向下传递给 `Navbar`。页面切换使用 `motion` 的 `AnimatePresence` 实现淡入淡出。

**环境变量**: `GEMINI_API_KEY` 通过 `vite.config.ts` 中的 `define` 在构建时注入到 `process.env.GEMINI_API_KEY`。`.env.example` 中列出了所需变量。AI Studio 在运行时会自动注入运行时密钥。

**设计系统**: 粗野主义风格 — 4px 黑色粗边框，`shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]` 硬阴影，圆角卡片，Google Fonts 上的 Inter + Outfit 字体。品牌色（`--color-brand-pink`、`--color-brand-blue`、`--color-brand-yellow`、`--color-brand-purple`）定义在 `index.css` 的 `@theme` 块中。

**HMR 注意事项**: `vite.config.ts` 中的 HMR WebSocket 服务器在 `DISABLE_HMR=true` 时会被禁用 — 这是 AI Studio 的要求，用于防止 agent 编辑期间页面闪烁。不要在本地开发环境中设置该变量。
