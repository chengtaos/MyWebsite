export const NAV_LABELS = {
  home: "首页",
  portfolio: "作品集",
  about: "关于我",
} as const;

export const BUTTON = {
  explore: "随便看看",
  sayHi: "打个招呼",
  writeBlog: "写博客",
  recordIdea: "记想法",
  save: "保存",
  cancel: "取消",
  retry: "重试",
} as const;

export const CONFIRM = {
  deleteBlog: "删除这篇博客？",
  deleteIdea: "删除这条想法？",
} as const;

export const EDIT_MODE = {
  enabled: "编辑模式已开启 (Ctrl+Shift+E 退出)",
  toggleOn: "开启编辑模式 (Ctrl+Shift+E)",
  toggleOff: "关闭编辑模式",
  clickToEdit: "点击编辑",
} as const;

export const MARKDOWN = {
  editorTitle: "Markdown 编辑器",
  ctrlEnterSave: "Ctrl+Enter 保存",
  placeholder: "在此输入 Markdown 内容...",
  noContent: "暂无详细内容",
  editHint: "点击右上 M 按钮编辑 Markdown 正文",
  preview: "预览",
  edit: "编辑",
  saveHint: "保存 (Ctrl+Enter)",
} as const;

export const PLACEHOLDER = {
  title: "施工中...",
  message: "这里还在施工中，新的小玩意儿正在路上...",
} as const;

export const STATUS = {
  online: "已上线",
  wip: "施工中",
} as const;
