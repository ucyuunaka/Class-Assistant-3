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