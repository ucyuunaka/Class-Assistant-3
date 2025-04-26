// 导入认证检查函数
import { checkFirstLoginExperience } from '/js/auth.js';
// 使用模块导入滚动动画组件
import { initScrollAnimation } from "/components/scrollAnimation/scrollAnimation.js";

document.addEventListener("DOMContentLoaded", function () {
// 检查首次登录体验
//   checkFirstLoginExperience(); // 调试时临时注释掉
  // 初始化滚动动画
  initScrollAnimation(".animate-on-scroll", {
    threshold: 0.1,
    once: true,
  });

  // 初始化表单日期为当天
  const examDateInput = document.getElementById("examDate");
  if (examDateInput) {
    examDateInput.valueAsDate = new Date();
  }

  // 成绩表单提交
  const gradeForm = document.getElementById("gradeForm");
  if (gradeForm) {
      gradeForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // 在这里可以添加成绩数据处理和保存逻辑
        // 这里只是示例，实际应用中可能需要与后端交互

        // 模拟添加成绩到表格
        const subjectSelect = document.getElementById("subject");
        const examTypeSelect = document.getElementById("examType");
        const semesterSelect = document.getElementById("semester");
        const scoreInput = document.getElementById("score");
        const creditInput = document.getElementById("credit");
        const examDateInput = document.getElementById("examDate");
        const gradesTableBody = document.getElementById("gradesTableBody");


        if (!subjectSelect || !examTypeSelect || !semesterSelect || !scoreInput || !creditInput || !examDateInput || !gradesTableBody) {
            console.error("One or more form elements not found!");
            return;
        }

        const subject = subjectSelect.options[subjectSelect.selectedIndex].text;
        const examType = examTypeSelect.options[examTypeSelect.selectedIndex].text;
        const semester = semesterSelect.options[semesterSelect.selectedIndex].text;
        const score = scoreInput.value;
        const credit = creditInput.value;
        const examDate = examDateInput.value;

        // 创建新行
        const newRow = document.createElement("tr");

        // 设置评分样式
        let scoreClass = "score-poor";
        if (score >= 90) {
          scoreClass = "score-excellent";
        } else if (score >= 80) {
          scoreClass = "score-good";
        } else if (score >= 60) {
          scoreClass = "score-average";
        }

        // 添加行内容
        newRow.innerHTML = `
        <td>${subject}</td>
        <td>${examType}</td>
        <td>${semester}</td>
        <td><span class="score-badge ${scoreClass}">${score}</span></td>
        <td>${credit}</td>
        <td>${examDate}</td>
        <td>
          <button class="btn-icon text-primary appeal-btn" data-course="${subject}" data-score="${score}" data-type="${examType}" data-semester="${semester}">
            <i class="fas fa-gavel" title="申诉"></i>
          </button>
        </td>
      `;

        // 插入表格
        gradesTableBody.prepend(newRow);

        // 重置表单和UI状态
        this.reset();
        if (examDateInput) {
            examDateInput.valueAsDate = new Date();
        }
        if (addGradeForm && addGradeBtn) {
            addGradeForm.style.display = "none";
            addGradeBtn.style.display = "inline-block";
        }

        // 重新计算统计信息和更新图表
        updateStatistics();
        renderCharts();
      });
  }


  // "导出成绩单"按钮功能提示
  const exportGradesBtn = document.querySelector('.btn i.fa-file-export')
  if (exportGradesBtn) {
    exportGradesBtn.closest('button').addEventListener('click', function() {
      window.showNotification('导出成绩单功能正在开发中...', 'info');
    });
  }

  // "筛选"按钮功能提示
  const filterBtn = document.querySelector('.btn i.fa-filter')
  if (filterBtn) {
    filterBtn.closest('button').addEventListener('click', function() {
      window.showNotification('筛选功能正在开发中...', 'info');
    });
  }

  // "分享成绩"按钮功能提示
  const shareGradesBtn = document.getElementById('shareGradesBtn');
  if (shareGradesBtn) {
    shareGradesBtn.addEventListener('click', function() {
      window.showNotification('成绩分享功能正在开发中，即将支持分享给家长或导师...', 'info');
    });
  }

  // 初始化申诉功能
  initAppealSystem();

  // 保存图表引用
  let chartInstances = {};

  // 等待页面完全加载，确保Chart.js已加载完成
  window.addEventListener('load', function() {
    if (typeof Chart !== 'undefined') {
      // Chart.js已加载，直接渲染图表
      setTimeout(renderCharts, 100);
    } else {
      // Chart.js尚未加载，设置定时器定期检查
      let attempts = 0;
      const maxAttempts = 20; // 最多尝试20次
      const checkInterval = setInterval(function() {
        attempts++;
        
        if (typeof Chart !== 'undefined') {
          clearInterval(checkInterval);
          renderCharts();
        } else if (attempts >= maxAttempts) {
          clearInterval(checkInterval);
          console.error('Chart.js加载失败，请刷新页面重试');
          window.showNotification && window.showNotification('图表加载失败，请刷新页面重试', 'error');
        }
      }, 500);
    }
  });

  // 获取CSS变量的辅助函数
  function getCSSVariableValue(variableName) {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
  }

  // 获取当前主题的文本和边框颜色
  function getThemeColors() {
    return {
      textColor: getCSSVariableValue('--text-color'),
      secondaryTextColor: getCSSVariableValue('--text-secondary'),
      borderColor: getCSSVariableValue('--border-color'),
      backgroundColor: getCSSVariableValue('--background-color')
    };
  }

  // 更新统计信息
  function updateStatistics() {
    // 在实际应用中，这里应该重新计算GPA和平均分
    // 这里只是简单示例，实际应用中可能需要更复杂的计算逻辑
    const totalCoursesElement = document.getElementById("total-courses");
    const gradesTableBody = document.getElementById("gradesTableBody");
    if (totalCoursesElement && gradesTableBody) {
        totalCoursesElement.textContent = gradesTableBody.getElementsByTagName("tr").length;
    }

    // 计算其他统计数据
    // ...
  }

  // 绘制所有图表
  function renderCharts() {
    // 检查Chart对象是否已定义
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js尚未加载，将在2秒后重试渲染图表');
      // 延迟重试
      setTimeout(renderCharts, 2000);
      return;
    }

    try {
      // 首先销毁所有存储的图表实例
      Object.values(chartInstances).forEach(instance => {
          if (instance && typeof instance.destroy === 'function') {
              instance.destroy();
          }
      });
      chartInstances = {}; // 清空引用

      // 渲染所有图表并存储实例
      chartInstances.trend = renderTrendChart();
      chartInstances.subject = renderSubjectChart();
      chartInstances.compare = renderCompareChart();
      chartInstances.gpaGauge = renderGpaGaugeChart();
      renderGpaHistoryList(); // 新增：调用历史列表渲染函数
      
    } catch (error) {
      console.error('渲染图表时出错:', error);
    }
  }

  // 趋势图表
  function renderTrendChart() {
    const trendChartCtx = document.getElementById("trendChart");
    if (!trendChartCtx) return;
    const ctx = trendChartCtx.getContext("2d");
    const colors = getThemeColors();

    // 更详细的历史数据
    const data = {
      labels: ["2022-2", "2023-1", "2023-2", "2024-1", "2024-2"],
      datasets: [
        {
          label: "平均分",
          data: [78, 83, 87, 88, 92],
          borderColor: "#0F9D58",
          backgroundColor: "rgba(15, 157, 88, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
        {
          label: "课程数量",
          data: [4, 5, 7, 8, 12],
          borderColor: "#DB4437",
          backgroundColor: "rgba(219, 68, 55, 0.1)",
          borderWidth: 2,
          fill: false,
          tension: 0.2,
          borderDash: [5, 5],
          yAxisID: 'y1',
        },
      ],
    };

    new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              color: colors.textColor
            },
            grid: {
              color: colors.borderColor
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false,
              color: colors.borderColor
            },
            beginAtZero: true,
            ticks: {
              color: colors.textColor
            }
          },
          x: {
            ticks: {
              color: colors.textColor
            },
            grid: {
              color: colors.borderColor
            }
          }
        },
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: colors.textColor
            }
          },
        },
      },
    });
  }

  // 科目分布图
  function renderSubjectChart() {
    const subjectChartCtx = document.getElementById("subjectChart");
    if (!subjectChartCtx) return;
    const ctx = subjectChartCtx.getContext("2d");
    const colors = getThemeColors();

    const data = {
      labels: [
        "高等数学",
        "程序设计",
        "大学物理",
        "大学英语",
        "数据库原理",
        "操作系统",
        "计算机网络",
        "线性代数",
        "软件工程",
        "人工智能导论"
      ],
      datasets: [
        {
          data: [92, 98, 78, 88, 95, 73, 76, 85, 96, 93],
          backgroundColor: "rgba(66, 133, 244, 0.6)",
          borderColor: "rgba(66, 133, 244, 0.8)",
          borderWidth: 2,
          pointBackgroundColor: colors.backgroundColor,
          pointBorderColor: colors.textColor,
          pointHoverBackgroundColor: "#4285F4",
          pointHoverBorderColor: colors.textColor,
          pointRadius: 4,
          pointHoverRadius: 6
        },
      ],
    };

    new Chart(ctx, {
      type: "radar",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              color: colors.textColor
            },
            grid: {
              color: colors.borderColor
            },
            pointLabels: {
              color: colors.textColor,
              font: {
                size: 10 // 减小标签字体大小，更好地适应容器
              }
            },
            angleLines: {
              color: colors.borderColor
            }
          },
        },
        plugins: {
          legend: {
            display: false,
            labels: {
              color: colors.textColor
            }
          }
        },
        layout: {
          padding: {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10 // 添加内边距，使内容居中
          }
        }
      },
    });
  }

  // 比较图表
  function renderCompareChart() {
    const compareChartCtx = document.getElementById("compareChart");
    if (!compareChartCtx) return null;
    const ctx = compareChartCtx.getContext("2d");
    const colors = getThemeColors();

    const data = {
      labels: [
        "高等数学", "程序设计", "大学物理", "大学英语", "数据库", "操作系统",
        "计网", "线代", "软件工程", "人工智能", "概率统计", "图形学"
      ],
      datasets: [
        {
          label: "你的分数",
          data: [92, 98, 78, 88, 95, 73, 76, 85, 96, 93, 58, 89],
          backgroundColor: "rgba(66, 133, 244, 0.7)",
          borderColor: "rgba(66, 133, 244, 1)",
          borderWidth: 1,
          borderRadius: 4,
          hoverBackgroundColor: "rgba(66, 133, 244, 0.9)",
        },
        {
          label: "班级平均",
          data: [86, 85, 83, 90, 87, 79, 82, 80, 88, 84, 76, 85],
          backgroundColor: "rgba(244, 160, 0, 0.7)",
          borderColor: "rgba(244, 160, 0, 1)",
          borderWidth: 1,
          borderRadius: 4,
          hoverBackgroundColor: "rgba(244, 160, 0, 0.9)",
        },
        {
          label: "院系最高分",
          data: [98, 100, 95, 97, 99, 96, 94, 97, 100, 98, 93, 96],
          backgroundColor: "rgba(15, 157, 88, 0.2)",
          borderColor: "rgba(15, 157, 88, 1)",
          borderWidth: 2,
          type: 'line',
          fill: false,
          tension: 0.1,
          pointBackgroundColor: colors.backgroundColor,
          pointBorderColor: colors.textColor,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBorderWidth: 2
        }
      ],
    };

    return new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100, // 设置最大值为100
            ticks: {
              stepSize: 20, // 设置刻度间隔为20
              color: colors.textColor,
              padding: 5, // 为刻度标签添加一些内边距
            },
            grid: {
              color: colors.borderColor
            }
          },
          x: { 
            ticks: { 
              color: colors.textColor,
              font: {
                size: 9 // 减小x轴标签字体，防止显示不全
              },
              maxRotation: 45, // 标签旋转角度
              minRotation: 45  // 确保所有标签都会旋转，避免重叠
            }, 
            grid: { color: colors.borderColor } 
          }
        },
        plugins: {
          legend: { 
            position: "top", 
            labels: { 
              color: colors.textColor,
              boxWidth: 15, // 减小图例方框宽度
              padding: 10 // 增加图例项之间的间距
            } 
          },
        },
        layout: { // 调整布局内边距
          padding: {
            top: 40, // 将顶部内边距增加到 40px
            right: 20, // 增加右侧内边距，提供更多空间
            left: 10,  // 增加左侧内边距
            bottom: 20 // 增加底部内边距，确保所有内容都可见
          }
        }
      },
    });
  }

  // 新增：GPA 仪表盘图表
  function renderGpaGaugeChart() {
    const gpaGaugeCtx = document.getElementById("gpaGaugeChart");
    if (!gpaGaugeCtx) return null; // Return null if canvas not found
    const ctx = gpaGaugeCtx.getContext("2d");
    const colors = getThemeColors();

    // --- GPA 数据 (与 trendChart 保持一致, 考虑后续优化为共享数据源) ---
    const gpaLabels = ["2022-2", "2023-1", "2023-2", "2024-1", "2024-2"];
    const gpaData = [3.2, 3.4, 3.6, 3.7, 3.85];
    // --- End GPA 数据 ---

    const latestGpa = gpaData.length > 0 ? gpaData[gpaData.length - 1] : 0;
    const previousGpa = gpaData.length > 1 ? gpaData[gpaData.length - 2] : null;
    const maxGpa = 4.0; // GPA 满分值

    // 计算趋势指示
    let trendIcon = '';
    let trendColor = colors.textColor;
    if (previousGpa !== null) {
      if (latestGpa > previousGpa) { trendIcon = '▲'; trendColor = '#0F9D58'; } // Green Up
      else if (latestGpa < previousGpa) { trendIcon = '▼'; trendColor = '#DB4437'; } // Red Down
      else { trendIcon = '━'; } // Neutral
    }

    // 仪表盘数据集
    const gaugeData = {
      datasets: [{
        data: [latestGpa, Math.max(0, maxGpa - latestGpa)], // Ensure remaining value is not negative
        backgroundColor: [ '#4285F4', getCSSVariableValue('--border-color') || '#e0e0e0' ],
        borderColor: colors.backgroundColor,
        borderWidth: 2,
        circumference: 180, rotation: 270, cutout: '70%'
      }]
    };

    // 自定义插件：在中心绘制文本
    const centerTextPlugin = {
      id: 'centerText',
      afterDraw: (chart) => {
        const { ctx, chartArea: { top, bottom, left, right, width, height } } = chart;
        ctx.save();
        const centerX = left + width / 2;
        // const centerY = top + height * 0.85; // 原计算方式，依赖 chartArea
        const centerY = chart.height - 45; // 新计算方式：基于 Canvas 总高度，预留底部 45px 空间

        // GPA Value
        ctx.font = 'bold 2.5em sans-serif';
        ctx.fillStyle = colors.textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom'; // 将基线改为 bottom，方便基于底部定位
        ctx.fillText(latestGpa.toFixed(2), centerX, centerY); // 绘制 GPA 值，底部对齐 centerY

        // Trend Icon & Label
        if (trendIcon) {
          // 绘制趋势图标和文字，相对于 GPA 值的位置
          const trendY = centerY + 5; // 在 GPA 值下方一点
          ctx.font = 'bold 1.5em sans-serif';
          ctx.fillStyle = trendColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top'; // 基线改为 top
          ctx.fillText(trendIcon, centerX, trendY);

          ctx.font = '0.9em sans-serif';
          ctx.fillStyle = colors.secondaryTextColor;
          const prevLabel = gpaLabels.length > 1 ? gpaLabels[gpaLabels.length - 2] : '';
          ctx.fillText(`较上学期 (${prevLabel})`, centerX, trendY + 25); // 在趋势图标下方
        } else if (gpaLabels.length > 0) {
           // 绘制最新学期标签，相对于 GPA 值的位置
           ctx.font = '0.9em sans-serif';
           ctx.fillStyle = colors.secondaryTextColor;
           ctx.textAlign = 'center';
           ctx.textBaseline = 'top'; // 基线改为 top
           ctx.fillText(`最新学期 (${gpaLabels[gpaLabels.length - 1]})`, centerX, centerY + 10); // 在 GPA 值下方
        }
        ctx.restore();
      }
    };

    // 创建图表实例
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: gaugeData,
      options: {
        responsive: true, maintainAspectRatio: true, aspectRatio: 2,
        plugins: { legend: { display: false }, tooltip: { enabled: false }, centerText: {} }
      },
      plugins: [centerTextPlugin]
    });
    return chart; // 返回实例
  }

  // 监听主题变化，重新渲染图表
  document.addEventListener('themeChanged', function() {
    // 销毁所有存储的图表实例
    Object.values(chartInstances).forEach(instance => {
        if (instance && typeof instance.destroy === 'function') {
            instance.destroy();
        }
    });
    chartInstances = {}; // 清空引用
    renderCharts(); // 重新渲染所有图表和列表
  });

  // 渲染 GPA 历史列表
  function renderGpaHistoryList() {
    const container = document.getElementById('gpaHistoryListContainer');
    if (!container) return;

    // --- GPA 数据 (与 trendChart/gpaGauge 保持一致) ---
    // 考虑后续优化：将这些数据提取到公共变量或函数中
    const gpaLabels = ["2022-2", "2023-1", "2023-2", "2024-1", "2024-2"];
    const gpaData = [3.2, 3.4, 3.6, 3.7, 3.85];
    // --- End GPA 数据 ---

    // 清空容器并添加标题
    container.innerHTML = '<h4>历史 GPA</h4>';

    if (gpaData.length === 0) {
      container.innerHTML += '<p>暂无历史 GPA 数据</p>';
      return;
    }

    const list = document.createElement('ul');
    // 反转数组以显示最新学期在顶部
    for (let i = gpaData.length - 1; i >= 0; i--) {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span class="semester">${gpaLabels[i]}</span>
        <span class="gpa-value">${gpaData[i].toFixed(2)}</span>
      `;
      list.appendChild(listItem);
    }
    container.appendChild(list);
  }

  // 申诉系统初始化
  function initAppealSystem() {
    // Logic removed as per plan to disable appeal functionality while keeping UI elements.
  }

});

import { Sidebar } from "/components/sidebar/sidebar.js";
import { Header } from "/components/header/header.js";

document.addEventListener("DOMContentLoaded", function () {
  // 初始化侧边栏组件
  const sidebar = new Sidebar("sidebar-container");

  // 初始化顶栏组件
  const header = new Header("header-container", {
    title: "成绩管理",
    subtitle: "记录并分析你的学术表现，查看成绩趋势和GPA计算",
    buttons: [
      {
        text: "添加成绩",
        id: "add-grade-header-btn"
      },
    ],

  });
});
