// 导入认证检查函数
import { checkFirstLoginExperience } from '/js/auth.js';
// 课表页面入口文件
// 导入主控制器和课程数据变更函数
import { initSchedule } from "/js/pages/schedule/schedule_controller.js"; // Updated path
import { afterCourseDataChanged } from "/js/pages/schedule/schedule_data.js"; // Updated path
import { initScrollAnimation } from "/components/scrollAnimation/scrollAnimation.js"; // Updated path format

document.addEventListener("DOMContentLoaded", function () {
// 检查首次登录体验
  checkFirstLoginExperience();
  // 初始化滚动动画
  initScrollAnimation(".animate-on-scroll", {
    threshold: 0.1,
    once: true,
  });
  
  // 初始化课表
  initSchedule();
  
  // 确保所有课程数据变化都触发afterCourseDataChanged
  document.addEventListener("course-form-submitted", () => {
    afterCourseDataChanged();
  });

  // 颜色选择器初始化
  initColorPicker();
});

// 初始化颜色选择器
function initColorPicker() {
  const colorOptions = document.querySelectorAll(".color-option");
  const colorInput = document.getElementById("course-color");
  
  if (!colorOptions.length || !colorInput) {
    return;
  }
  
  // 为每个颜色选项添加点击事件
  colorOptions.forEach((option) => {
    option.addEventListener("click", () => {
      // 移除其他选项的选中状态
      colorOptions.forEach((opt) => {
        opt.classList.remove("selected");
      });
      
      // 添加当前选项的选中状态
      option.classList.add("selected");
      
      // 更新隐藏输入框的值
      colorInput.value = option.dataset.class;
      
      // 更新颜色标签显示
      const colorLabel = document.getElementById("selected-color-label");
      if (colorLabel) {
        colorLabel.textContent = option.dataset.label || "自定义";
      }
    });
  });
  
}
// --- Component Initialization (Moved from schedule.html) ---
import { Sidebar } from "/components/sidebar/sidebar.js";
import { Header } from "/components/header/header.js";

document.addEventListener("DOMContentLoaded", function () {
  const sidebar = new Sidebar("sidebar-container");

  // 初始化顶栏组件
  const header = new Header("header-container", {
    isHomePage: false,
    title: "我的课程表",
    subtitle: "管理和安排你的课程，清晰掌握每周学习时间",
    buttons: [], // No buttons needed in header for this page as actions are below
    buttonPosition: "right",
  });
});
// --- End Component Initialization ---