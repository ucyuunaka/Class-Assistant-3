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


  // 添加成绩表单显示/隐藏
  const addGradeBtn = document.getElementById("addGradeBtn");
  const addGradeForm = document.getElementById("addGradeForm");
  const cancelAddBtn = document.getElementById("cancelAddBtn");

  if (addGradeBtn && addGradeForm && cancelAddBtn) {
    addGradeBtn.addEventListener("click", function () {
      addGradeForm.style.display = "block";
      this.style.display = "none";
    });

    cancelAddBtn.addEventListener("click", function () {
      addGradeForm.style.display = "none";
      addGradeBtn.style.display = "inline-block";
    });
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
        
        // 重新绑定申诉按钮事件
        initAppealButtons();
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
          label: "GPA趋势",
          data: [3.2, 3.4, 3.6, 3.7, 3.85],
          borderColor: "#4285F4",
          backgroundColor: "rgba(66, 133, 244, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
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
          label: "历史最高分",
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

  // 新增：渲染 GPA 历史列表
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
    // 获取DOM元素
    const appealModal = document.getElementById('appeal-modal');
    const closeModal = document.querySelector('.close-modal');
    const cancelAppealBtn = document.getElementById('cancel-appeal');
    const appealForm = document.getElementById('appeal-form');
    const appealsList = document.getElementById('appeals-list');
    const emptyAppealsMsg = document.querySelector('.empty-appeals-msg');
    
    // 本地存储的申诉记录
    let appeals = JSON.parse(localStorage.getItem('gradeAppeals')) || [];
    
    // 更新申诉统计
    updateAppealStats();
    
    // 显示已有申诉记录
    renderAppeals();
    
    // 确保所有课程行都有申诉按钮
    ensureAppealButtons();
    
    // 初始化绑定申诉按钮
    initAppealButtons();
    
    // 确保每一行都有申诉按钮
    function ensureAppealButtons() {
      // 获取所有课程行
      const gradesTableBody = document.getElementById("gradesTableBody");
      if (!gradesTableBody) return;
      
      const rows = gradesTableBody.querySelectorAll("tr");
      
      rows.forEach(row => {
        // 获取操作列（最后一列）
        const actionCell = row.querySelector("td:last-child");
        if (!actionCell) return;
        
        // 检查是否已有申诉按钮
        if (!actionCell.querySelector(".appeal-btn")) {
          // 获取课程数据
          const courseCell = row.querySelector("td:nth-child(1)");
          const typeCell = row.querySelector("td:nth-child(2)");
          const semesterCell = row.querySelector("td:nth-child(3)");
          const scoreCell = row.querySelector("td:nth-child(4)");
          
          if (!courseCell || !typeCell || !semesterCell || !scoreCell) return;
          
          // 提取课程信息
          const course = courseCell.textContent.trim();
          const type = typeCell.textContent.trim();
          const semester = semesterCell.textContent.trim();
          const scoreText = scoreCell.textContent.trim();
          // 确保只获取分数值（不包含其他格式字符）
          const score = scoreText.replace(/[^0-9]/g, '');
          
          // 创建申诉按钮
          const appealBtn = document.createElement("button");
          appealBtn.className = "btn-icon appeal-btn";
          appealBtn.setAttribute("data-course", course);
          appealBtn.setAttribute("data-type", type);
          appealBtn.setAttribute("data-semester", semester);
          appealBtn.setAttribute("data-score", score);
          appealBtn.innerHTML = '<i class="fas fa-gavel" title="申诉"></i>';
          
          // 添加到操作列
          actionCell.appendChild(appealBtn);
        }
      });
    }
    
    // 绑定申诉按钮事件
    function initAppealButtons() {
      const appealBtns = document.querySelectorAll('.appeal-btn');
      
      appealBtns.forEach(btn => {
        // 移除旧的事件监听器以避免重复
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', function() {
          const course = this.dataset.course;
          const score = this.dataset.score;
          const type = this.dataset.type;
          const semester = this.dataset.semester;
          
          // 填充表单隐藏字段
          document.getElementById('appeal-course').value = course;
          document.getElementById('appeal-score').value = score;
          document.getElementById('appeal-type').value = type;
          document.getElementById('appeal-semester').value = semester;
          document.getElementById('appeal-expected').value = score; // 默认期望分数为当前分数
          
          // 显示模态框
          appealModal.style.display = 'block';
        });
      });
    }
    
    // 关闭模态框
    if (closeModal) {
      closeModal.addEventListener('click', function() {
        appealModal.style.display = 'none';
      });
    }
    
    // 取消按钮关闭模态框
    if (cancelAppealBtn) {
      cancelAppealBtn.addEventListener('click', function() {
        appealModal.style.display = 'none';
      });
    }
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(event) {
      if (event.target === appealModal) {
        appealModal.style.display = 'none';
      }
    });
    
    // 提交申诉表单
    if (appealForm) {
      appealForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const course = document.getElementById('appeal-course').value;
        const score = document.getElementById('appeal-score').value;
        const type = document.getElementById('appeal-type').value;
        const semester = document.getElementById('appeal-semester').value;
        const reason = document.getElementById('appeal-reason').value;
        const description = document.getElementById('appeal-description').value;
        const expected = document.getElementById('appeal-expected').value;
        const contact = document.getElementById('appeal-contact').value;
        
        // 获取选择的原因文本
        const reasonText = document.getElementById('appeal-reason').options[document.getElementById('appeal-reason').selectedIndex].text;
        
        // 创建新申诉记录
        const newAppeal = {
          id: Date.now(), // 使用时间戳作为唯一ID
          course,
          score,
          type,
          semester,
          reason,
          reasonText,
          description,
          expected,
          contact,
          status: 'pending', // 初始状态为待处理
          date: new Date().toISOString(),
          feedback: '' // 教师反馈，初始为空
        };
        
        // 添加到本地存储
        appeals.push(newAppeal);
        localStorage.setItem('gradeAppeals', JSON.stringify(appeals));
        
        // 更新UI
        renderAppeals();
        updateAppealStats();
        
        // 关闭模态框
        appealModal.style.display = 'none';
        
        // 重置表单
        appealForm.reset();
        
        // 显示成功通知
        window.showNotification('申诉已成功提交，请等待老师审核', 'success');
      });
    }
    
    // 渲染申诉记录
    function renderAppeals() {
      if (!appealsList) return;
      
      // 检查是否有申诉记录
      if (appeals.length === 0) {
        if (emptyAppealsMsg) emptyAppealsMsg.style.display = 'block';
        appealsList.innerHTML = '';
        return;
      }
      
      // 有记录时隐藏空提示
      if (emptyAppealsMsg) emptyAppealsMsg.style.display = 'none';
      
      // 按时间倒序排列申诉
      const sortedAppeals = [...appeals].sort((a, b) => new Date(b.date) - new Date(a.date));
      
      // 清空现有列表
      appealsList.innerHTML = '';
      
      // 添加申诉卡片
      sortedAppeals.forEach(appeal => {
        const formattedDate = new Date(appeal.date).toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
        
        // 状态文本和样式
        let statusText = '待处理';
        let statusClass = 'status-pending';
        
        if (appeal.status === 'approved') {
          statusText = '已通过';
          statusClass = 'status-approved';
        } else if (appeal.status === 'rejected') {
          statusText = '已驳回';
          statusClass = 'status-rejected';
        }
        
        // 创建申诉卡片
        const appealCard = document.createElement('div');
        appealCard.className = 'appeal-item';
        appealCard.dataset.id = appeal.id;
        
        appealCard.innerHTML = `
          <div class="appeal-header">
            <div class="appeal-course">
              ${appeal.course} (${appeal.type})
              <span class="appeal-status ${statusClass}">${statusText}</span>
            </div>
            <div class="appeal-score">
              当前分数: <strong>${appeal.score}</strong> → 
              期望分数: <strong>${appeal.expected}</strong>
            </div>
          </div>
          <div class="appeal-body">
            <div class="appeal-reason">${appeal.reasonText}</div>
            <div class="appeal-description">${appeal.description}</div>
            ${appeal.feedback ? `<div class="appeal-feedback"><strong>教师反馈:</strong> ${appeal.feedback}</div>` : ''}
          </div>
          <div class="appeal-footer">
            <div class="appeal-date">提交于: ${formattedDate}</div>
            <div class="appeal-actions">
              <button class="btn-icon withdraw-appeal" data-id="${appeal.id}" ${appeal.status !== 'pending' ? 'disabled' : ''}>
                <i class="fas fa-times" title="撤回申诉"></i>
              </button>
            </div>
          </div>
        `;
        
        appealsList.appendChild(appealCard);
      });
      
      // 绑定撤回按钮事件
      const withdrawBtns = document.querySelectorAll('.withdraw-appeal');
      withdrawBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const id = parseInt(this.dataset.id);
          
          // 从列表中移除申诉
          appeals = appeals.filter(appeal => appeal.id !== id);
          localStorage.setItem('gradeAppeals', JSON.stringify(appeals));
          
          // 更新UI
          renderAppeals();
          updateAppealStats();
          
          window.showNotification('申诉已成功撤回', 'info');
        });
      });
    }
    
    // 更新申诉统计
    function updateAppealStats() {
      const totalAppeals = document.getElementById('total-appeals');
      const pendingAppeals = document.getElementById('pending-appeals');
      const approvedAppeals = document.getElementById('approved-appeals');
      const rejectedAppeals = document.getElementById('rejected-appeals');
      
      if (!totalAppeals || !pendingAppeals || !approvedAppeals || !rejectedAppeals) return;
      
      // 计算各种状态的申诉数量
      const total = appeals.length;
      const pending = appeals.filter(a => a.status === 'pending').length;
      const approved = appeals.filter(a => a.status === 'approved').length;
      const rejected = appeals.filter(a => a.status === 'rejected').length;
      
      // 更新DOM
      totalAppeals.textContent = total;
      pendingAppeals.textContent = pending;
      approvedAppeals.textContent = approved;
      rejectedAppeals.textContent = rejected;
    }
  }

});
