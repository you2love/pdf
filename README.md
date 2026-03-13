# PDF Learn - PDF 格式完全指南

> 🚀 **全新重构版** - 面向资深程序员的 PDF 知识网站

## 📖 网站简介

这是一个关于 PDF 文件格式的纯静态学习网站，采用现代 Web 技术构建。网站从开发者视角出发，深入讲解 PDF 的二进制结构、对象系统、编程实践和 AI 集成。

### ✨ 重构亮点

| 特性 | 说明 |
|------|------|
| 🎨 **统一设计系统** | 基于 CSS 变量的现代化设计，支持深色模式 |
| 💻 **代码增强** | 语法高亮、一键复制、可折叠代码块 |
| 📱 **响应式设计** | 完美适配桌面、平板和手机 |
| 🔍 **快速参考** | 新增速查表和二进制查看器 |
| 📊 **交互图表** | Mermaid 流程图和 Chart.js 可视化 |
| ⌨️ **快捷键支持** | Cmd+K 搜索、Home/End 快速导航 |
| 📈 **进度追踪** | 自动记录学习进度 |

## 🗂️ 目录结构

```
pdf-tutorial/
├── index.html                    # 主页（章节导航）
├── index-backup.html             # 原始版本备份
├── pages/                        # 分章节页面
│   ├── structure.html            # 第 1 章：PDF 内部结构
│   ├── instance-analysis.html    # 第 2 章：实例分析
│   ├── workflow.html             # 第 3 章：工作流程
│   ├── ai-integration.html       # 第 4 章：AI 与 PDF
│   ├── code-examples.html        # 第 5 章：代码示例
│   ├── quick-reference.html      # 🆕 快速参考（速查表）
│   └── viewer.html               # 🆕 PDF 二进制查看器
├── css/
│   ├── styles.css                # 全局样式（重构版）
│   └── styles-backup.css         # 原始样式备份
├── js/
│   ├── main.js                   # 交互脚本（重构版）
│   └── main-backup.js            # 原始脚本备份
├── lib/                          # 第三方库
│   ├── chart.umd.min.js          # Chart.js 图表库
│   └── mermaid.min.js            # Mermaid 流程图库
└── assets/                       # 静态资源
```

## 📚 章节内容

| 章节 | 页面 | 核心内容 | 预计时间 |
|------|------|----------|----------|
| 1 | [structure.html](pages/structure.html) | 对象系统、流编码、交叉引用表 | 20 分钟 |
| 2 | [instance-analysis.html](pages/instance-analysis.html) | 完整 PDF 文件逐段解析 | 25 分钟 |
| 3 | [workflow.html](pages/workflow.html) | 创建/解析流程、性能优化 | 18 分钟 |
| 4 | [ai-integration.html](pages/ai-integration.html) | LayoutLMv3、表格提取、智能问答 | 22 分钟 |
| 5 | [code-examples.html](pages/code-examples.html) | Python/Go/JS 编程示例、表格图表生成 | 30 分钟 |

### 🆕 新增工具页面

| 页面 | 说明 |
|------|------|
| [quick-reference.html](pages/quick-reference.html) | PDF 速查表 - 对象类型、操作符、库选择指南 |
| [viewer.html](pages/viewer.html) | 二进制查看器 - 交互式查看 PDF 内部结构 |

## 🚀 快速开始

### 本地预览

```bash
# 使用 Python 内置服务器
python -m http.server 8000

# 或使用 Node.js
npx serve .

# 然后访问 http://localhost:8000
```

### 直接使用

直接在浏览器中打开 `index.html` 即可。

## 🔥 核心特性

### 1. 统一设计系统

```css
/* CSS 变量定义 */
:root {
  --primary: #0066cc;
  --text-primary: #1a1a2e;
  --bg-primary: #ffffff;
  --radius-lg: 0.75rem;
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
}
```

### 2. 代码块增强

- ✅ 语法高亮（支持多语言）
- ✅ 一键复制（带反馈提示）
- ✅ 可折叠（长代码节省空间）
- ✅ 语言标签（快速识别）

### 3. 快捷键支持

| 快捷键 | 功能 |
|--------|------|
| `Cmd/Ctrl + K` | 打开搜索 |
| `Home` | 跳转到文件头 |
| `End` | 跳转到文件尾 |
| `Esc` | 关闭模态框 |

### 4. 学习进度追踪

自动记录已访问章节，在首页显示进度条。

```javascript
// 进度数据存储在 localStorage
{
  "pages/intro.html": { visited: true, timestamp: 1234567890 },
  "pages/structure.html": { visited: true, timestamp: 1234567891 }
}
```

## 🛠️ 技术栈

- **HTML5** - 语义化结构
- **CSS3** - 现代样式和布局（CSS 变量、Grid、Flexbox）
- **JavaScript** - 原生 ES6+，无框架依赖
- **Mermaid** - 流程图和序列图
- **Chart.js** - 数据可视化

## 📝 开发指南

### 添加新章节

1. 在 `pages/` 目录创建新的 HTML 文件
2. 复制 `pages/intro.html` 的模板结构
3. 在 `index.html` 添加新的章节卡片
4. 更新导航栏链接

### 页面模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>页面标题 | PDF Learn</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <nav class="navbar">...</nav>
    
    <main class="container">
        <header class="page-header">
            <h1 class="page-title">页面标题</h1>
        </header>
        
        <div class="content">
            <!-- 内容区域 -->
        </div>
    </main>
    
    <script src="../js/main.js"></script>
</body>
</html>
```

### 样式规范

```css
/* 使用 CSS 变量 */
.card {
  background: var(--bg-elevated);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
}

/* 响应式断点 */
@media (max-width: 768px) {
  .sidebar { display: none; }
}

@media (max-width: 1200px) {
  .toc { display: none; }
}
```

## 📊 性能优化

- ✅ 无外部 CDN 依赖，所有资源本地化
- ✅ CSS 层叠层（Cascade Layers）避免样式冲突
- ✅ 防抖/节流优化滚动和搜索
- ✅ Intersection Observer 实现懒加载
- ✅ 打印样式优化

## 🔗 相关链接

- [ISO 32000-2:2024 PDF 2.1 标准](https://www.iso.org/standard/82179.html)
- [PDF Association](https://pdfa.org/)
- [LayoutLMv3 (Microsoft)](https://github.com/microsoft/unilm/tree/master/layoutlmv3)
- [ReportLab 文档](https://www.reportlab.com/docs/reportlab-userguide.pdf)
- [qpdf 工具](https://github.com/qpdf/qpdf)

## 📄 许可证

MIT License

## 🙏 致谢

- PDF 标准由 [ISO](https://www.iso.org/) 维护
- 图标来自 [Emoji](https://unicode.org/emoji/)
- 灵感来自 [MDN Web Docs](https://developer.mozilla.org/)

---

**🎯 网站目标**：帮助开发者深入理解 PDF 文件格式，从二进制结构到高级应用，提供完整的学习路径和实用工具。
