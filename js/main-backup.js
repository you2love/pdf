/**
 * PDF Learn - 纯静态网站脚本
 * 仅包含必要的基础交互功能
 */

// ===================================
// 语言代码切换（代码示例页面）
// ===================================
function switchLang(lang) {
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.language-section').forEach(s => s.classList.remove('active'));
  document.getElementById(lang + '-section').classList.add('active');
}

// ===================================
// 交互式流程图（workflow 页面）
// ===================================
const flowchartDetails = [
  {title: '读取文件头', content: '验证 PDF 版本标识（如 %PDF-2.0），确认文件格式正确。文件头必须是文件的第一行，后面可跟二进制注释。'},
  {title: '定位文件尾', content: '从文件末尾回溯查找 startxref 标记，获取交叉引用表的字节偏移量。这是 PDF 解析的入口点。'},
  {title: '解析 XRef', content: '读取交叉引用表，构建对象位置索引。XRef 表记录所有对象的字节偏移量和状态（空闲/使用中）。'},
  {title: '加载 Catalog', content: '获取文档根对象（Catalog），这是 PDF 文档的入口点。Catalog 包含指向 Pages 树的引用。'},
  {title: '遍历 Pages', content: '从 Pages 树根开始，递归遍历所有页面节点。每个 Page 对象包含页面尺寸、内容流和资源字典。'}
];

function showDetail(index) {
  const detailEl = document.getElementById('flowchartDetail');
  if (!detailEl) return;
  
  const d = flowchartDetails[index];
  detailEl.innerHTML = '<h4>' + d.title + '</h4><p>' + d.content + '</p>';
  
  document.querySelectorAll('.flowchart-step').forEach((s, i) => {
    s.classList.toggle('active', i === index);
  });
}

// ===================================
// Chart.js 图表初始化
// ===================================
function initChart() {
  const charts = [
    {id: 'versionChart', init: initVersionChart},
    {id: 'aiCapabilityChart', init: initAiCapabilityChart}
  ];
  
  charts.forEach(chart => {
    const ctx = document.getElementById(chart.id);
    if (ctx && typeof Chart !== 'undefined') {
      chart.init(ctx);
    }
  });
}

function initVersionChart(ctx) {
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['PDF 1.0\n(1993)', 'PDF 1.4\n(2001)', 'PDF 1.7\n(2006)', 'PDF 2.0\n(2017)', 'PDF 2.1\n(2024)'],
      datasets: [{
        label: '特性数量',
        data: [50, 150, 350, 500, 600],
        backgroundColor: ['#94a3b8', '#64748b', '#475569', '#334155', '#0066cc'],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return '特性数：' + context.parsed.y;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: '#e1e4e8' },
          ticks: { color: '#586069' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#586069' }
        }
      }
    }
  });
}

function initAiCapabilityChart(ctx) {
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['文本提取', '表格识别', 'OCR 精度', '布局分析', '语义理解', '自动摘要'],
      datasets: [{
        label: '准确率 (%)',
        data: [98, 92, 95, 90, 88, 91],
        backgroundColor: '#0066cc',
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        title: { display: false }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          grid: { color: '#e1e4e8' },
          ticks: { color: '#586069', callback: v => v + '%' }
        },
        y: { grid: { display: false }, ticks: { color: '#586069' } }
      }
    }
  });
}

// ===================================
// 页面加载完成后初始化
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  // 初始化图表
  initChart();
  
  // 绑定流程图点击事件
  document.querySelectorAll('.flowchart-step').forEach((step, index) => {
    step.addEventListener('click', () => showDetail(index));
  });
});
