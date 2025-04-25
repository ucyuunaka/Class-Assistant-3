// 导入认证检查函数
import { checkFirstLoginExperience } from '/js/auth.js';
// 导入滚动动画组件
import { initScrollAnimation } from "/components/scrollAnimation/scrollAnimation.js";

document.addEventListener("DOMContentLoaded", function () {
// 检查首次登录体验
  checkFirstLoginExperience();
  // 初始化滚动动画（使用更低的阈值，让动画更早触发）
  const scrollAnimationController = initScrollAnimation(".animate-on-scroll", {
    threshold: 0.05, // 元素5%可见时触发动画
    once: true, // 动画只触发一次
  });

  // 滚动动画效果
  const animateStatistics = () => {
    const stats = document.querySelectorAll(".stat-number");

    stats.forEach((stat) => {
      const target = parseInt(stat.textContent);
      let current = 0;
      const increment = target / 30; // 将动画分成30步

      const updateCount = () => {
        if (current < target) {
          current += increment;
          stat.textContent =
            Math.ceil(current) +
            (stat.textContent.includes("%") ? "%" : "+");
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent =
            target + (stat.textContent.includes("%") ? "%" : "+");
        }
      };

      // 当元素滚动到可见范围时启动动画
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              updateCount();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(stat);
    });
  };

  // 初始化统计数字动画
  animateStatistics();
  
  // 如果有需要，可以在这里添加自定义逻辑
});
