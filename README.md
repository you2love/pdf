# PDF Learn - PDF 格式完全指南

## 📖 网站简介

这是一个关于 PDF 文件格式的纯静态学习网站，采用现代 Web 技术构建，包含 PDF 基础概念、内部结构、实例分析、工作流程、AI 集成和编程示例等完整内容。

## 🗂️ 目录结构

```
pdf-tutorial/
├── index.html                    # 主页（章节导航）
├── index-full-backup.html        # 原始单页版本备份
├── pages/                        # 分章节页面
│   ├── intro.html                # 第 1 章：PDF 简介（PDF 2.1 新特性）
│   ├── structure.html            # 第 2 章：PDF 内部结构
│   ├── instance-analysis.html    # 第 3 章：实例分析
│   ├── workflow.html             # 第 4 章：工作流程
│   ├── ai-integration.html       # 第 5 章：AI 与 PDF（LayoutLMv3 等）
│   └── code-examples.html        # 第 6 章：代码示例
├── css/
│   └── styles.css                # 全局样式
├── js/
│   └── main.js                   # 交互脚本
├── lib/                          # 第三方库
│   ├── chart.umd.min.js          # Chart.js 图表库
│   └── mermaid.min.js            # Mermaid 流程图库
└── assets/                       # 静态资源
```

## 📚 章节内容

| 章节 | 页面 | 核心内容 | 预计时间 |
|------|------|----------|----------|
| 1 | [intro.html](pages/intro.html) | PDF 定义、PDF 2.1 新特性、ISO 标准体系 | 15 分钟 |
| 2 | [structure.html](pages/structure.html) | 对象系统、流编码、交叉引用表 | 20 分钟 |
| 3 | [instance-analysis.html](pages/instance-analysis.html) | 完整 PDF 文件逐段解析 | 25 分钟 |
| 4 | [workflow.html](pages/workflow.html) | 创建/解析流程、性能优化 | 18 分钟 |
| 5 | [ai-integration.html](pages/ai-integration.html) | LayoutLMv3、表格提取、智能问答 | 22 分钟 |
| 6 | [code-examples.html](pages/code-examples.html) | Python/Go/JS 编程示例、表格图表生成 | 30 分钟 |

## 🚀 快速开始

1. 直接在浏览器中打开 `index.html`
2. 点击章节卡片进入学习内容
3. 使用顶部导航栏在各章节间切换

## 🔥 更新内容

### 新增内容
- ✅ PDF 2.1 (ISO 32000-2:2024) 新特性说明
- ✅ LayoutLMv3、Table Transformer 等 AI 模型介绍
- ✅ Python ReportLab 表格和图表生成完整示例
- ✅ 网站重构为独立章节页面

### 技术更新
- ✅ 移除 Hero 区域和页脚，采用简洁设计
- ✅ 导航栏 sticky 定位，始终可见
- ✅ 更新 Mermaid 图表和 Chart.js 可视化
- ✅ 优化移动端响应式布局

## 🛠️ 技术栈

- **HTML5** - 语义化结构
- **CSS3** - 现代样式和布局
- **Mermaid** - 流程图和序列图（本地库）
- **Chart.js** - 数据可视化图表（本地库）

## ✨ 纯静态特性

- ✅ 无需服务器，可直接在浏览器中打开
- ✅ 无外部 CDN 依赖，所有资源本地化
- ✅ 无数据库，无后端，无 API 调用
- ✅ 无 localStorage 存储
- ✅ 无动态内容加载
- ✅ 可直接部署到 GitHub Pages、Netlify 等静态托管服务

## 📝 开发说明

### 添加新章节
1. 在 `pages/` 目录创建新的 HTML 文件
2. 复制现有页面的头部和导航结构
3. 在 `index.html` 添加新的章节卡片
4. 更新顶部导航栏链接

### 样式规范
- 使用 CSS 变量实现主题一致性
- 采用内联样式用于页面特定样式
- 响应式设计支持移动设备

## 📄 许可证

MIT License

## 🔗 相关链接

- [ISO 32000-2:2024 PDF 2.1 标准](https://www.iso.org/standard/82179.html)
- [PDF Association](https://pdfa.org/)
- [LayoutLMv3 (Microsoft)](https://github.com/microsoft/unilm/tree/master/layoutlmv3)
- [ReportLab 文档](https://www.reportlab.com/docs/reportlab-userguide.pdf)
