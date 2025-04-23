// 课表页面入口文件
// 导入主控制器和课程数据变更函数
import { initSchedule } from "@js/controllers/schedule_controller.js";
import { afterCourseDataChanged } from "@js/data/schedule_data.js";
import { initScrollAnimation } from "@components/scrollAnimation/scrollAnimation.js";

document.addEventListener("DOMContentLoaded", function () {
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
    console.log("颜色选择器元素未找到");
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
  
  console.log("颜色选择器初始化完成");
}
