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
- **Markdown**: `react-markdown`（博客/想法内容渲染 + 实时预览编辑）
- **路径别名**: `@/` 映射到项目根目录（通过 Vite alias 和 tsconfig paths）

## 架构

```
src/
├── main.tsx                    # 入口 — 挂载 <App /> 到 #root
├── App.tsx                     # 根组件 — TabType 状态管理 + AnimatePresence + EditModeProvider
├── index.css                   # Tailwind 导入 + @theme + 粗野主义工具类 + 跑马灯动画
├── config/site.ts              # 站点元数据（名称、邮箱、GitHub、状态文字）
├── types/index.ts              # TabType 联合类型（"home" | "about" | "portfolio"）
├── hooks/
│   ├── useScrollReveal.ts      # 滚动入场动画 hook
│   ├── useEditMode.tsx         # 编辑模式 Context + Ctrl+Shift+E 快捷键
│   └── useContentStore.ts      # localStorage 内容持久化 hook
├── data/
│   ├── projects.ts             # 作品集数据（Project 接口，支持 featured 标记）
│   ├── blogs.ts                # 博客数据（Blog 接口，body 字段存 Markdown）
│   └── ideas.ts                # 有趣想法数据（Idea 接口，body 字段存 Markdown）
└── components/
    ├── ui/                     # 共享 UI 原语
    │   ├── EmptyPlaceholder.tsx # 施工中占位（支持 md/lg 尺寸）
    │   ├── SectionHeader.tsx   # 区块标题（icon + title）
    │   ├── LinkableCard.tsx    # 可选外部链接卡片（a/div 自适应）
    │   ├── ContentModal.tsx    # Markdown 内容详情弹窗
    │   └── MarkdownEditor.tsx  # 分栏 Markdown 编辑器（textarea + 实时预览）
    ├── Navbar.tsx              # 固定导航栏 + layoutId 标签页指示器动画
    ├── Footer.tsx              # 页脚（从 SITE 配置读取链接）
    ├── Hero.tsx                # 首屏 — 标题、CTA 按钮、头像浮动动画
    ├── Ticker.tsx              # 黑色跑马灯滚动条
    ├── Services.tsx            # 首页创作区 — 作品集/博客/想法 + 状态栏
    ├── AboutSection.tsx        # 关于我 — 头像 + 个人标签列表
    ├── Experience.tsx          # KEEP IT REALLY COOL 态度区
    └── Portfolio.tsx           # 作品集页 — online/wip 分类展示
```

**路由方案**: 不使用 React Router。`TabType` 类型安全的标签页状态通过 `App.tsx` 中的 `useState` 管理，`motion` 的 `AnimatePresence` 实现淡入淡出页面切换。

**站点配置**: `src/config/site.ts` 是所有硬编码字符串的唯一来源（站点名、邮箱、GitHub 链接、状态文字）。其他组件引用此配置而非内联。

**动画 hook**: `useScrollReveal({ staggerIndex, direction })` 封装了 `initial/whileInView/viewport/transition` 模式，所有卡片列表复用此 hook。

**共享 UI 组件**: `LinkableCard` 自动根据是否传入 `href` 渲染 `<a>` 或 `<div>`；`EmptyPlaceholder` 在作品集和首页复用；`SectionHeader` 统一区块标题样式；`ContentModal` 展示 Markdown 渲染内容；`MarkdownEditor` 分栏编辑器（textarea + 实时预览）。

**内容管理系统**: `Ctrl+Shift+E` 切换编辑模式。博客/想法通过 `useContentStore` hook 管理，数据持久化到 localStorage（默认值来自 `src/data/`）。编辑模式下支持新增（`+` 按钮）、修改（卡片悬停编辑按钮→MarkdownEditor）、删除。`EditModeProvider` 在 App 根层提供编辑状态上下文。

**环境变量**: `GEMINI_API_KEY` 通过 `vite.config.ts` 中的 `define` 在构建时注入。AI Studio 运行时自动注入密钥。`.env.example` 模板。

**设计系统**: 粗野主义风格 — 4px 黑色粗边框，硬阴影，圆角卡片，Inter + Outfit 字体。品牌色定义在 `index.css` 的 `@theme` 块中。

**HMR 注意事项**: `DISABLE_HMR=true` 时 WebSocket 服务器禁用 — AI Studio 要求，防止 agent 编辑时页面闪烁。
