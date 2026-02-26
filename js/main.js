/**
 * PDF Learn - 2026 交互功能
 * 包含：主题切换、图表初始化、滚动动画、导航交互等
 */

// ===================================
// 主题切换功能
// ===================================
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.themeIcon = this.themeToggle?.querySelector('.theme-icon');
    // 强制默认浅色模式
    this.currentTheme = 'light';

    this.init();
  }

  init() {
    // 清除 localStorage 中的深色模式
    localStorage.setItem('theme', 'light');
    this.applyTheme('light');
    this.themeToggle?.addEventListener('click', () => this.toggleTheme());
  }

  getPreferredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;

    // 默认使用浅色模式
    return 'light';
  }
  
  applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (this.themeIcon) this.themeIcon.textContent = '☀️';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (this.themeIcon) this.themeIcon.textContent = '🌙';
    }

    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
  }
  
  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
  }
  
  rerenderMermaid() {
    if (typeof mermaid !== 'undefined') {
      document.querySelectorAll('.mermaid').forEach((element, index) => {
        element.removeAttribute('data-processed');
        element.setAttribute('id', `mermaid-${index}`);
      });
      mermaid.init();
    }
  }
}

// ===================================
// 导航栏交互
// ===================================
class NavbarManager {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-menu a');
    
    this.init();
  }
  
  init() {
    // 滚动效果
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    
    // 移动端菜单
    this.mobileMenuBtn?.addEventListener('click', () => this.toggleMobileMenu());
    
    // 平滑滚动
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });
    
    // 点击外部关闭菜单
    document.addEventListener('click', (e) => {
      if (!this.navbar.contains(e.target) && this.navMenu?.classList.contains('active')) {
        this.closeMobileMenu();
      }
    });
  }
  
  handleScroll() {
    if (window.scrollY > 50) {
      this.navbar?.classList.add('scrolled');
    } else {
      this.navbar?.classList.remove('scrolled');
    }
  }
  
  toggleMobileMenu() {
    this.navMenu?.classList.toggle('active');
    this.mobileMenuBtn?.classList.toggle('active');
  }
  
  closeMobileMenu() {
    this.navMenu?.classList.remove('active');
    this.mobileMenuBtn?.classList.remove('active');
  }
  
  handleNavClick(e) {
    const href = e.currentTarget.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        this.closeMobileMenu();
      }
    }
  }
}

// ===================================
// 滚动动画（Intersection Observer）
// ===================================
class ScrollAnimation {
  constructor() {
    this.elements = document.querySelectorAll('.card, .tool-card, .ai-feature, .security-item');
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.init();
  }
  
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);
    
    this.elements.forEach(el => observer.observe(el));
  }
}

// ===================================
// Mermaid 图表初始化
// ===================================
class MermaidInitializer {
  constructor() {
    this.init();
  }

  init() {
    // Mermaid 已在 HTML 中通过 ESM 模块初始化
    // 此类仅用于主题切换时重新渲染
    console.log('Mermaid 已加载');
  }

  rerenderMermaid() {
    if (typeof mermaid === 'undefined') return;
    
    // 重置所有 mermaid 元素
    document.querySelectorAll('.mermaid').forEach((el, index) => {
      el.removeAttribute('data-processed');
      el.setAttribute('id', `mermaid-${Date.now()}-${index}`);
    });
    
    // 重新渲染
    mermaid.initialize({
      startOnLoad: true,
      theme: this.getMermaidTheme(),
      securityLevel: 'loose'
    });
  }

  getMermaidTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
                   window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDark ? 'dark' : 'default';
  }
}

// ===================================
// Chart.js 图表初始化
// ===================================
class ChartInitializer {
  constructor() {
    this.charts = [];
    this.init();
  }
  
  init() {
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js library not loaded');
      return;
    }
    
    this.initVersionChart();
    this.initFeaturesRadarChart();
    this.initAiCapabilityChart();
    
    // 监听主题变化
    this.observeThemeChange();
  }
  
  getChartColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#e5e7eb' : '#374151';
    const gridColor = isDark ? '#374151' : '#e5e7eb';
    
    return {
      text: textColor,
      grid: gridColor,
      primary: '#2563eb',
      secondary: '#10b981',
      accent: '#f59e0b',
      purple: '#8b5cf6',
      red: '#ef4444',
      blue: '#3b82f6'
    };
  }
  
  initVersionChart() {
    const ctx = document.getElementById('versionChart');
    if (!ctx) return;
    
    const colors = this.getChartColors();
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['PDF 1.0', 'PDF 1.4', 'PDF 1.7', 'PDF 2.0', 'PDF 2.1'],
        datasets: [{
          label: '特性数量',
          data: [50, 150, 300, 500, 600],
          backgroundColor: [
            colors.primary,
            colors.secondary,
            colors.accent,
            colors.purple,
            colors.blue
          ],
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'PDF 版本特性增长趋势',
            color: colors.text,
            font: { size: 16, weight: 'bold' }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: colors.grid },
            ticks: { color: colors.text }
          },
          x: {
            grid: { display: false },
            ticks: { color: colors.text }
          }
        }
      }
    });
  }
  
  initFeaturesRadarChart() {
    const ctx = document.getElementById('featuresRadarChart');
    if (!ctx) return;
    
    const colors = this.getChartColors();
    
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: [
          '压缩性能',
          '安全性',
          '交互性',
          '可访问性',
          '多媒体支持',
          '云集成'
        ],
        datasets: [{
          label: 'PDF 2.0',
          data: [90, 95, 85, 90, 80, 85],
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
          borderColor: colors.primary,
          pointBackgroundColor: colors.primary,
          pointRadius: 4
        }, {
          label: 'PDF 1.7',
          data: [70, 80, 65, 70, 60, 40],
          backgroundColor: 'rgba(107, 114, 128, 0.2)',
          borderColor: '#6b7280',
          pointBackgroundColor: '#6b7280',
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: colors.text }
          },
          title: {
            display: true,
            text: 'PDF 2.0 vs PDF 1.7 能力对比',
            color: colors.text,
            font: { size: 16, weight: 'bold' }
          }
        },
        scales: {
          r: {
            angleLines: { color: colors.grid },
            grid: { color: colors.grid },
            pointLabels: { color: colors.text },
            ticks: { 
              color: colors.text,
              backdropColor: 'transparent'
            }
          }
        }
      }
    });
  }
  
  initAiCapabilityChart() {
    const ctx = document.getElementById('aiCapabilityChart');
    if (!ctx) return;
    
    const colors = this.getChartColors();
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          '文本提取',
          '表格识别',
          'OCR 精度',
          '布局分析',
          '语义理解',
          '自动摘要'
        ],
        datasets: [{
          label: '准确率 (%)',
          data: [98, 92, 95, 90, 85, 88],
          backgroundColor: colors.primary,
          borderRadius: 8
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'AI PDF 处理能力准确率',
            color: colors.text,
            font: { size: 16, weight: 'bold' }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            grid: { color: colors.grid },
            ticks: { 
              color: colors.text,
              callback: (value) => value + '%'
            }
          },
          y: {
            grid: { display: false },
            ticks: { color: colors.text }
          }
        }
      }
    });
  }
  
  observeThemeChange() {
    const observer = new MutationObserver(() => {
      this.charts.forEach(chart => chart.destroy());
      this.charts = [];
      setTimeout(() => this.init(), 100);
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }
}

// ===================================
// 交互式流程图
// ===================================
class InteractiveFlowchart {
  constructor() {
    this.steps = document.querySelectorAll('.flowchart-step');
    this.detailEl = document.getElementById('flowchartDetail');
    
    this.init();
  }
  
  init() {
    if (!this.steps.length || !this.detailEl) return;
    
    const stepDetails = [
      {
        title: '读取文件头',
        content: '验证 PDF 版本标识（如 %PDF-2.0），确保文件格式正确。文件头还包含二进制注释，确保文件以二进制模式处理。'
      },
      {
        title: '定位文件尾',
        content: '从文件末尾回溯查找 startxref 标记，获取交叉引用表的字节偏移量。这是 PDF 解析的关键步骤。'
      },
      {
        title: '解析 XRef',
        content: '读取交叉引用表，构建对象位置索引。XRef 表记录了所有对象的字节偏移量，实现快速随机访问。'
      },
      {
        title: '加载 Catalog',
        content: '获取文档根对象（Catalog），这是 PDF 文档的入口点。Catalog 包含指向 Pages 树的引用。'
      },
      {
        title: '遍历 Pages',
        content: '从 Pages 树根开始，递归遍历所有页面节点。每个 Page 对象包含页面尺寸、内容流和资源字典。'
      }
    ];
    
    this.steps.forEach((step, index) => {
      step.addEventListener('click', () => {
        this.steps.forEach(s => s.classList.remove('active'));
        step.classList.add('active');
        
        const detail = stepDetails[index];
        if (detail) {
          this.detailEl.innerHTML = `
            <h4>${detail.title}</h4>
            <p>${detail.content}</p>
          `;
        }
      });
    });
  }
}

// ===================================
// 语言代码切换
// ===================================
class LanguageCodeSwitcher {
  constructor() {
    this.buttons = document.querySelectorAll('.lang-btn');
    this.sections = document.querySelectorAll('.language-section');
    
    this.init();
  }
  
  init() {
    if (!this.buttons.length) return;
    
    this.buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        this.switchLanguage(lang, btn);
      });
    });
  }
  
  switchLanguage(lang, activeBtn) {
    // 更新按钮状态
    this.buttons.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
    
    // 更新代码区域显示
    this.sections.forEach(section => {
      section.classList.remove('active');
      if (section.id === `${lang}-section`) {
        section.classList.add('active');
      }
    });
  }
}

// ===================================
// 代码块复制功能
// ===================================
class CodeBlockCopy {
  constructor() {
    this.codeBlocks = document.querySelectorAll('.code-block pre');
    
    this.init();
  }
  
  init() {
    this.codeBlocks.forEach(pre => {
      const button = document.createElement('button');
      button.className = 'copy-btn';
      button.textContent = '复制';
      button.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 5px 10px;
        background: rgba(255,255,255,0.2);
        border: 1px solid rgba(255,255,255,0.3);
        border-radius: 4px;
        color: inherit;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.2s;
      `;
      
      button.addEventListener('click', () => this.copyCode(pre, button));
      
      pre.style.position = 'relative';
      pre.appendChild(button);
      
      button.addEventListener('mouseenter', () => {
        button.style.background = 'rgba(255,255,255,0.3)';
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.background = 'rgba(255,255,255,0.2)';
      });
    });
  }
  
  async copyCode(pre, button) {
    const code = pre.querySelector('code')?.textContent || pre.textContent;
    
    try {
      await navigator.clipboard.writeText(code);
      button.textContent = '已复制!';
      button.style.background = 'rgba(16, 185, 129, 0.3)';
      
      setTimeout(() => {
        button.textContent = '复制';
        button.style.background = 'rgba(255,255,255,0.2)';
      }, 2000);
    } catch (err) {
      button.textContent = '复制失败';
      console.error('复制失败:', err);
    }
  }
}

// ===================================
// 平滑滚动到目标元素
// ===================================
class SmoothScroll {
  constructor() {
    this.init();
  }
  
  init() {
    // 处理 URL hash
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }
}

// ===================================
// 性能优化：防抖和节流
// ===================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ===================================
// 初始化所有功能
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  // 等待所有资源加载
  if (document.readyState === 'complete') {
    initializeAll();
  } else {
    window.addEventListener('load', initializeAll);
  }
});

function initializeAll() {
  console.log('🚀 PDF Learn 初始化中...');
  
  // 初始化各个模块
  new ThemeManager();
  new NavbarManager();
  new ScrollAnimation();
  new MermaidInitializer();
  new ChartInitializer();
  new InteractiveFlowchart();
  new LanguageCodeSwitcher();
  new CodeBlockCopy();
  new SmoothScroll();
  
  console.log('✅ PDF Learn 初始化完成');
}

// ===================================
// 键盘导航支持（无障碍）
// ===================================
document.addEventListener('keydown', (e) => {
  // ESC 关闭移动菜单
  if (e.key === 'Escape') {
    const navMenu = document.querySelector('.nav-menu');
    const mobileBtn = document.getElementById('mobileMenuBtn');
    navMenu?.classList.remove('active');
    mobileBtn?.classList.remove('active');
  }
  
  // 快捷键导航
  if (e.altKey) {
    switch(e.key) {
      case '1':
        document.querySelector('#intro')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case '2':
        document.querySelector('#structure')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case '3':
        document.querySelector('#code-examples')?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  }
});

// ===================================
// 页面可见性变化处理
// ===================================
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.title = '💤 PDF Learn - 等待返回...';
  } else {
    document.title = 'PDF 格式完全指南 | 2026 版';
  }
});
