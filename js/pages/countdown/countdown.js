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
    isHomePage: false,
    title: "考试倒计时",
    subtitle: "管理你的考试安排，不错过任何重要的考试",
    buttons: [
      {
        text: "添加考试",
        url: "#",
        isPrimary: true,
        className: "add-exam-btn", // 保持与原来相同的类名，以便原有的事件处理能够正常工作
      },
    ],
    buttonPosition: "right",
  });

  // 发出模态框就绪事件通知
  // Note: Ensure this event dispatch is still necessary and correctly handled
  // after moving the code. It might be better placed after modal-specific logic.
  const modalReadyEvent = new CustomEvent("modals:ready");
  document.dispatchEvent(modalReadyEvent);
  console.log("DOMContentLoaded: 发送模态框就绪事件通知 (from moved script)");
});
// --- End Component Initialization ---