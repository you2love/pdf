/**
 * PDF Learn - 核心 JavaScript 模块
 * 面向资深程序员的增强功能
 * 
 * 功能列表:
 * - 代码块语法高亮和复制
 * - 目录导航和滚动监听
 * - 快捷键支持
 * - 学习进度追踪
 * - 主题切换
 */

// ===================================
// 工具函数
// ===================================
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('复制失败:', err);
    return false;
  }
};

// ===================================
// 主题管理
// ===================================
const ThemeManager = {
  init() {
    const saved = localStorage.getItem('theme') || 'light';
    this.setTheme(saved);
    this.bindEvents();
  },
  
  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.updateIcon(theme);
  },
  
  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    this.setTheme(current === 'dark' ? 'light' : 'dark');
  },
  
  updateIcon(theme) {
    const icon = $('.theme-toggle');
    if (icon) {
      icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  },
  
  bindEvents() {
    $('.theme-toggle')?.addEventListener('click', () => this.toggle());
  }
};

// ===================================
// 代码块增强
// ===================================
const CodeBlocks = {
  init() {
    this.enhanceCodeBlocks();
    this.initSyntaxHighlight();
  },

  enhanceCodeBlocks() {
    // 跳过带有 no-enhance 类的代码块
    $$('pre').forEach(pre => {
      // 如果父元素有 code-block no-enhance 类，跳过
      if (pre.closest('.code-block.no-enhance')) {
        return;
      }
      
      const wrapper = document.createElement('div');
      wrapper.className = 'code-wrapper';
      
      // 创建头部
      const header = document.createElement('div');
      header.className = 'code-header';
      
      const code = pre.querySelector('code');
      const lang = code?.className.replace('language-', '') || 'text';
      
      header.innerHTML = `
        <div class="code-title">
          <span class="code-lang">${lang}</span>
        </div>
        <div class="code-actions">
          <button class="code-btn copy-btn" title="复制代码">📋 复制</button>
          <button class="code-btn expand-btn" title="展开/收起">⬆️ 展开</button>
        </div>
      `;
      
      // 包装内容
      const content = document.createElement('div');
      content.className = 'code-content';
      
      pre.parentNode.insertBefore(wrapper, pre);
      content.appendChild(pre);
      wrapper.appendChild(header);
      wrapper.appendChild(content);
      
      // 绑定事件
      const copyBtn = header.querySelector('.copy-btn');
      const expandBtn = header.querySelector('.expand-btn');
      
      copyBtn.addEventListener('click', () => this.copyCode(pre, copyBtn));
      expandBtn.addEventListener('click', () => this.toggleExpand(content, expandBtn));
    });
  },
  
  copyCode(pre, btn) {
    const code = pre.querySelector('code');
    const text = code?.textContent || pre.textContent;
    
    copyToClipboard(text).then(success => {
      if (success) {
        const original = btn.textContent;
        btn.textContent = '✅ 已复制';
        btn.style.background = 'var(--success)';
        btn.style.color = 'white';
        
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          btn.style.color = '';
        }, 2000);
      }
    });
  },
  
  toggleExpand(content, btn) {
    const isCollapsed = content.classList.contains('collapsed');
    
    if (isCollapsed) {
      content.classList.remove('collapsed');
      btn.textContent = '⬆️ 收起';
    } else {
      content.classList.add('collapsed');
      btn.textContent = '⬇️ 展开';
    }
  },
  
  initSyntaxHighlight() {
    // 简单的语法高亮（如果没有 Prism.js）
    if (typeof Prism === 'undefined') {
      $$('code').forEach(code => {
        // 跳过 no-enhance 代码块
        if (code.closest('.code-block.no-enhance')) {
          return;
        }
        const html = code.innerHTML;
        code.innerHTML = this.simpleHighlight(html);
      });
    }
  },
  
  simpleHighlight(code) {
    // 基础高亮规则 (One Dark 主题)
    const rules = [
      // 注释 (优先匹配，避免与其他规则冲突)
      { pattern: /(\/\/.*$)/gm, replacement: '<span class="token comment">$1</span>' },
      { pattern: /(\/\*[\s\S]*?\*\/)/g, replacement: '<span class="token comment">$1</span>' },
      { pattern: /(#.*$)/gm, replacement: '<span class="token comment">$1</span>' },
      
      // 字符串 (在关键字之前匹配)
      { pattern: /(['"`])(.*?)\1/g, replacement: '<span class="token string">$1$2$1</span>' },
      
      // 关键字
      { pattern: /\b(const|let|var|function|return|if|else|for|while|class|import|from|export|async|await|try|catch|throw|new|this|typeof|instanceof)\b/g, replacement: '<span class="token keyword">$1</span>' },
      { pattern: /\b(def|import|from|as|with|lambda|yield|raise|except|finally|print|while|for|if|elif|else|class|return)\b/g, replacement: '<span class="token keyword">$1</span>' },
      
      // 函数调用
      { pattern: /\b([a-zA-Z_]\w*)(?=\s*\()/g, replacement: '<span class="token function">$1</span>' },
      
      // 数字
      { pattern: /\b(\d+\.?\d*)\b/g, replacement: '<span class="token number">$1</span>' },
      
      // 布尔值和常量
      { pattern: /\b(true|false|null|undefined|None|True|False)\b/g, replacement: '<span class="token boolean">$1</span>' },
      
      // 运算符
      { pattern: /(=&gt;|=&gt;|===|!==|&lt;=|&gt;=|=&gt;|=&gt;)/g, replacement: '<span class="token operator">$1</span>' },
    ];

    let result = code;
    rules.forEach(rule => {
      result = result.replace(rule.pattern, rule.replacement);
    });

    return result;
  }
};

// ===================================
// 目录导航 (TOC)
// ===================================
const TableOfContents = {
  init() {
    this.generateTOC();
    this.observeHeadings();
  },
  
  generateTOC() {
    const toc = $('.toc-list');
    if (!toc) return;
    
    const headings = $$('.content h2, .content h3');
    if (headings.length === 0) return;
    
    toc.innerHTML = '';
    let currentH2 = null;
    
    headings.forEach(heading => {
      const id = heading.id || this.generateId(heading.textContent);
      heading.id = id;
      
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${id}`;
      a.textContent = heading.textContent;
      a.dataset.target = id;
      
      if (heading.tagName === 'H2') {
        currentH2 = li;
        toc.appendChild(li);
      } else if (currentH2) {
        let sublist = currentH2.querySelector('.toc-sublist');
        if (!sublist) {
          sublist = document.createElement('ul');
          sublist.className = 'toc-sublist';
          currentH2.appendChild(sublist);
        }
        const subLi = document.createElement('li');
        subLi.appendChild(a);
        sublist.appendChild(subLi);
      } else {
        li.appendChild(a);
        toc.appendChild(li);
      }
    });
    
    // 绑定点击事件
    $$('a[href^="#"]', toc).forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = $(a.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  },
  
  generateId(text) {
    return text.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');
  },
  
  observeHeadings() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            $$('a[data-target]').forEach(a => {
              a.classList.toggle('active', a.dataset.target === entry.target.id);
            });
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );
    
    $$('.content h2, .content h3').forEach(h => observer.observe(h));
  }
};

// ===================================
// 学习进度追踪
// ===================================
const ProgressTracker = {
  init() {
    this.loadProgress();
    this.observeSections();
    this.updateUI();
  },
  
  loadProgress() {
    const saved = localStorage.getItem('reading-progress');
    this.progress = saved ? JSON.parse(saved) : {};
  },
  
  saveProgress() {
    localStorage.setItem('reading-progress', JSON.stringify(this.progress));
  },
  
  observeSections() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const section = entry.target.id;
            if (section) {
              this.progress[section] = {
                visited: true,
                timestamp: Date.now()
              };
              this.saveProgress();
              this.updateUI();
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    
    $$('.content section, .content article').forEach(section => {
      observer.observe(section);
    });
  },
  
  updateUI() {
    // 更新进度条
    const progressBar = $('.progress-fill');
    if (progressBar) {
      const total = $$('.content section, .content article').length;
      const visited = Object.keys(this.progress).filter(k => this.progress[k].visited).length;
      const percent = total > 0 ? (visited / total) * 100 : 0;
      progressBar.style.width = `${percent}%`;
    }
    
    // 标记已访问章节
    $$('.chapter-card').forEach(card => {
      const href = card.getAttribute('href');
      if (href && this.progress[href]) {
        card.classList.add('visited');
      }
    });
  }
};

// ===================================
// 移动端菜单
// ===================================
const MobileMenu = {
  init() {
    const btn = $('.mobile-menu-btn');
    const menu = $('.nav-menu');
    
    if (!btn || !menu) return;
    
    btn.addEventListener('click', () => {
      menu.classList.toggle('active');
      btn.classList.toggle('active');
    });
  }
};

// ===================================
// 页面滚动优化
// ===================================
const ScrollOptimizer = {
  init() {
    this.lastScroll = 0;
    this.ticking = false;
    
    window.addEventListener('scroll', () => {
      this.lastScroll = window.scrollY;
      
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          this.ticking = false;
        });
        this.ticking = true;
      }
    }, { passive: true });
  },
  
  handleScroll() {
    const navbar = $('.navbar');
    if (!navbar) return;
    
    if (this.lastScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
};

// ===================================
// 初始化
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  // 清理旧的内联样式（让新 CSS 生效）
  cleanupInlineStyles();
  
  ThemeManager.init();
  CodeBlocks.init();
  TableOfContents.init();
  ProgressTracker.init();
  MobileMenu.init();
  ScrollOptimizer.init();

  console.log('📚 PDF Learn 已加载');
});

// 清理代码块中的旧内联样式
function cleanupInlineStyles() {
  // 颜色到 class 的映射（旧的内联样式颜色）
  const colorMap = {
    '#6a9955': 'comment',
    '#569cd6': 'keyword',
    '#ce9178': 'string',
    '#b5cea8': 'number',
    '#dcdcaa': 'function',
    '#4ec9b0': 'class',
    '#9cdcfe': 'variable',
    '#c586c0': 'keyword',
    '#d16969': 'number',
  };
  
  $$('pre code span[style]').forEach(span => {
    const style = span.getAttribute('style') || '';
    const colorMatch = style.match(/color:\s*(#[0-9a-fA-F]{3,6})/);
    
    if (colorMatch) {
      const color = colorMatch[1].toLowerCase();
      // 查找匹配的颜色
      for (const [oldColor, className] of Object.entries(colorMap)) {
        if (color === oldColor.toLowerCase()) {
          span.classList.add('token', className);
          break;
        }
      }
    }
    
    // 移除内联 style 属性
    span.removeAttribute('style');
  });
  
  $$('pre code[style]').forEach(code => {
    code.removeAttribute('style');
  });
}

// 导出模块（供外部使用）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ThemeManager,
    CodeBlocks,
    TableOfContents,
    ProgressTracker
  };
}
