// 导入认证检查函数
import { checkFirstLoginExperience } from '/js/auth.js';
// 考试倒计时页面入口
import { initCountdown } from '/js/pages/countdown/countdown_controller.js';
// 检查首次登录体验
//   checkFirstLoginExperience(); // 调试时临时注释掉

document.addEventListener("DOMContentLoaded", function() {
  // 初始化考试倒计时模块
  initCountdown();
});
// --- Component Initialization (Moved from countdown.html) ---
import { Sidebar } from "/components/sidebar/sidebar.js";
import { Header } from "/components/header/header.js";

document.addEventListener("DOMContentLoaded", function () {
  // 初始化侧边栏
  const sidebar = new Sidebar("sidebar-container");

  // 初始化顶栏组件
  const header = new Header("header-container", {
    // isHomePage: false, // 移除 isHomePage
    title: "考试倒计时", // 保留标题
    // subtitle: "管理你的考试安排，不错过任何重要的考试", // 移除副标题
    buttons: [
      {
        text: "添加考试",
        url: "#", // URL 设为 #，具体行为由页面JS处理
        // isPrimary: true, // 移除 isPrimary
        id: "add-exam-header-btn" // 使用 id 替代 className
      },
    ],
    // buttonPosition: "right", // 移除 buttonPosition
  });

  // 发出模态框就绪事件通知
  const modalReadyEvent = new CustomEvent("modals:ready");
  document.dispatchEvent(modalReadyEvent);
  console.log("DOMContentLoaded: 发送模态框就绪事件通知 (from moved script)");
});